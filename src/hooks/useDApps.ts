import { useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";
import { REGISTRY_ID } from "../constants";
import type { DApp } from "../types";
import { fetchFromWalrus } from "../walrus";

export const useDApps = () => {
    const client = useSuiClient();

    return useQuery({
        queryKey: ["dapps"],
        queryFn: async (): Promise<DApp[]> => {
            // 1. Fetch Registry to get the 'dapps' Table ID
            const registryObj = await client.getObject({
                id: REGISTRY_ID,
                options: { showContent: true },
            });

            console.log("Registry Object:", registryObj);

            if (!registryObj.data || !registryObj.data.content) {
                throw new Error("Registry not found");
            }

            const content = registryObj.data.content as any;
            const dappsTableId = content.fields.dapps.fields.id.id;

            console.log("DApps Table ID:", dappsTableId);

            // 2. Get all dApp IDs from the Table (Dynamic Fields)
            const fields = await client.getDynamicFields({
                parentId: dappsTableId,
            });

            console.log("Dynamic Fields:", fields);

            // The objectId is the dynamic field wrapper
            const dappIds = fields.data.map((field) => field.objectId);

            console.log("DApp IDs:", dappIds);

            if (dappIds.length === 0) return [];

            // 3. Fetch all dApp objects
            const dappsData = await client.multiGetObjects({
                ids: dappIds,
                options: { showContent: true },
            });

            console.log("DApps Raw Data:", dappsData);

            // 4. Map to DApp interface
            const dapps = await Promise.all(
                dappsData.map(async (item, index) => {
                    console.log(`Processing dApp ${index}:`, item);

                    if (!item.data || !item.data.content) {
                        console.warn(`DApp ${index} has no data or content`);
                        return null;
                    }

                    const itemContent = item.data.content as any;
                    console.log(`DApp ${index} content:`, itemContent);

                    // Check if it's a MoveObject with fields
                    if (itemContent.dataType !== 'moveObject' || !itemContent.fields) {
                        console.warn(`DApp ${index} is not a moveObject or has no fields`);
                        return null;
                    }

                    // The fields contain {id, name, value} where value is the actual DApp
                    const dynamicFieldWrapper = itemContent.fields;
                    console.log(`DApp ${index} dynamic field wrapper:`, dynamicFieldWrapper);

                    // Access the actual DApp from the value field
                    if (!dynamicFieldWrapper.value || !dynamicFieldWrapper.value.fields) {
                        console.warn(`DApp ${index} has no value or value.fields`);
                        return null;
                    }

                    const dappFields = dynamicFieldWrapper.value.fields;
                    console.log(`DApp ${index} actual dApp fields:`, dappFields);

                    // Fetch description from Walrus if it's a blob ID
                    let description = dappFields.description_blob_id;
                    try {
                        if (description && description.length > 0) {
                            try {
                                const text = await fetchFromWalrus(description);
                                description = text;
                            } catch (e) {
                                console.warn("Failed to fetch description from Walrus", e);
                            }
                        }
                    } catch (e) {
                        console.warn("Error processing description", e);
                    }

                    const mappedDApp = {
                        id: dappFields.id.id,
                        name: dappFields.name,
                        tagline: dappFields.tagline,
                        description: description,
                        iconUrl: dappFields.icon_url,
                        bannerUrl: dappFields.banner_url,
                        category: dappFields.category,
                        website: dappFields.website,
                        twitter: dappFields.twitter?.fields?.contents || undefined,
                        discord: dappFields.discord?.fields?.contents || undefined,
                        github: dappFields.github?.fields?.contents || undefined,
                        packageId: dappFields.package_id?.fields?.contents || undefined,

                        metrics: {
                            users24h: Number(dappFields.metrics.fields.users_24h),
                            users7d: Number(dappFields.metrics.fields.users_7d),
                            users30d: Number(dappFields.metrics.fields.users_30d),
                            volume24h: Number(dappFields.metrics.fields.volume_24h),
                            volume7d: Number(dappFields.metrics.fields.volume_7d),
                            volume30d: Number(dappFields.metrics.fields.volume_30d),
                            tvl: dappFields.metrics.fields.tvl ? Number(dappFields.metrics.fields.tvl.fields.contents) : undefined,
                            transactions24h: Number(dappFields.metrics.fields.transactions_24h),
                        },

                        rank: Number(dappFields.rank),
                        rankChange: Number(dappFields.rank_change) * (dappFields.rank_change_positive ? 1 : -1),

                        // Rating is stored * 100
                        rating: Number(dappFields.rating) / 100,
                        reviewCount: Number(dappFields.review_count),
                        upvotes: Number(dappFields.upvotes),

                        launchDate: new Date(Number(dappFields.launch_date)).toISOString(),
                        isNew: false,
                        isFeatured: dappFields.is_featured,

                        features: dappFields.features || [],
                        screenshots: [],

                        developer: {
                            id: dappFields.developer,
                            name: "Loading...",
                            avatar: "👤",
                            bio: "Loading developer info...",
                            verified: false,
                            dapps: []
                        },
                        reviewsTableId: dappFields.reviews.fields.id.id,
                        reviews: []
                    } as DApp;

                    // Fetch developer info asynchronously
                    const developerId = dappFields.developer;
                    const developersTableId = content.fields.developers.fields.id.id;

                    try {
                        const developerObj = await client.getDynamicFieldObject({
                            parentId: developersTableId,
                            name: {
                                type: "address",
                                value: developerId
                            }
                        });

                        if (developerObj.data && developerObj.data.content) {
                            const devFields = (developerObj.data.content as any).fields.value.fields;

                            // Fetch bio from Walrus
                            let bio = "No bio available";
                            try {
                                if (devFields.bio_blob_id) {
                                    bio = await fetchFromWalrus(devFields.bio_blob_id);
                                }
                            } catch (e) {
                                console.warn("Failed to fetch developer bio from Walrus", e);
                            }

                            mappedDApp.developer = {
                                id: developerId,
                                name: devFields.name,
                                avatar: devFields.avatar_url || "👤",
                                bio,
                                verified: devFields.verified,
                                website: devFields.website?.fields?.contents,
                                twitter: devFields.twitter?.fields?.contents,
                                dapps: []
                            };
                        }
                    } catch (e) {
                        console.warn(`Failed to fetch developer info for ${developerId}`, e);
                    }

                    return mappedDApp;
                })
            );

            const filteredDApps = dapps.filter((d): d is DApp => d !== null);
            console.log("Final filtered dApps:", filteredDApps);

            return filteredDApps;
        },
    });
};
