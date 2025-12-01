import { useQuery } from "@tanstack/react-query";
import { useSuiClient } from "@mysten/dapp-kit";
import type { DApp, Category } from "../types";
import { fetchDAppsFromBlockberry, fetchDEXsFromBlockberry, type BlockberryDApp, type BlockberryDEX } from "../utils/blockberry";
import { fetchOnChainDApps, type OnChainDAppData } from "../utils/fetchOnChainDApps";

const mapCategory = (apiCategory: string): Category => {
    const mapping: Record<string, Category> = {
        'BRIDGE': 'Bridge',
        'DEX': 'DEX',
        'LENDING': 'Lending',
        'YIELD': 'Yield',
        'CDP': 'CDP',
        'LAUNCHPAD': 'Launchpad',
        'LIQUID_STAKING': 'Liquid Staking',
        'RWA': 'RWA',
        'ALGO_STABLES': 'Algo Stables',
        'SYNTHETICS': 'Synthetics',
        'PAYMENTS': 'Payments',
        'DERIVATIVES': 'Derivatives',
        // Fallbacks for potential mixed case or existing
        'DeFi': 'DeFi',
        'NFT': 'NFT',
        'Gaming': 'Gaming',
        'Social': 'Social',
        'Marketplace': 'Marketplace',
        'Infrastructure': 'Infrastructure',
        'DAO': 'DAO',
        'Wallet': 'Wallet',
        'Analytics': 'Analytics',
    };
    return mapping[apiCategory] || 'Other';
};

export const useDApps = () => {
    const client = useSuiClient();

    return useQuery({
        queryKey: ["dapps"],
        queryFn: async (): Promise<DApp[]> => {
            console.log("Fetching dApps from all sources...");

            // Fetch from all sources in parallel
            const [defiData, dexData, onChainData] = await Promise.all([
                fetchDAppsFromBlockberry(),
                fetchDEXsFromBlockberry(),
                fetchOnChainDApps(client)
            ]);

            console.log("Blockberry DeFi Data:", defiData?.length);
            console.log("Blockberry DEX Data:", dexData?.length);
            console.log("On-Chain Data:", onChainData?.length);

            const allDApps: DApp[] = [];
            const processedIds = new Set<string>();

            // Helper to process on-chain dApps
            const processOnChainDApp = (item: OnChainDAppData) => {
                const id = item.packageId || item.id;

                if (processedIds.has(id)) return;
                processedIds.add(id);

                allDApps.push({
                    id: id,
                    name: item.name,
                    tagline: item.tagline,
                    description: item.descriptionBlobId ? `Blob ID: ${item.descriptionBlobId}` : "No description available.",
                    iconUrl: item.iconUrl,
                    bannerUrl: item.bannerUrl,
                    category: mapCategory(item.category),
                    website: item.website,
                    twitter: item.twitter,
                    discord: item.discord,
                    github: item.github,
                    packageId: item.packageId,

                    metrics: {
                        users24h: 0,
                        users7d: 0,
                        users30d: 0,
                        volume24h: 0,
                        volume7d: 0,
                        volume30d: 0,
                        tvl: 0,
                        transactions24h: 0,
                    },

                    rank: allDApps.length + 1,
                    rankChange: 0,

                    rating: item.rating,
                    reviewCount: item.reviewCount,
                    upvotes: 0,

                    launchDate: new Date(item.launchDate).toISOString(),
                    isNew: false,
                    isFeatured: false,

                    features: item.features,
                    screenshots: [],

                    developer: {
                        id: item.developer,
                        name: "On-Chain Developer",
                        avatar: "👤",
                        bio: "Registered on-chain",
                        verified: true,
                        dapps: []
                    },
                    reviewsTableId: item.reviewsTableId,
                    reviews: []
                } as DApp);
            };

            // Helper to process and add Blockberry dApps
            const processAndAdd = (item: BlockberryDApp | BlockberryDEX, type: 'defi' | 'dex') => {
                // Use the first package address as ID if available, otherwise fallback
                const packageId = item.packages && item.packages.length > 0 ? item.packages[0].packageAddress : "";
                // If no package ID, use project name as fallback ID to avoid duplicates
                const id = packageId || item.projectName.toLowerCase().replace(/\s+/g, '-');

                if (processedIds.has(id)) return;
                processedIds.add(id);

                // Map category
                let category: Category = 'Other';
                if (type === 'defi') {
                    const defiItem = item as BlockberryDApp;
                    const apiCategory = defiItem.categories && defiItem.categories.length > 0 ? defiItem.categories[0] : "Other";
                    category = mapCategory(apiCategory);
                } else {
                    category = 'DEX';
                }

                // Extract common fields
                const name = item.projectName;
                const iconUrl = item.imgUrl;
                const tvl = item.currTvl || 0;
                const txsCount = item.txsCount || 0;

                // Extract type-specific fields
                let volume24h = 0;
                let volume7d = 0;
                let volume30d = 0;
                let website = "";
                let twitter = "";
                let discord = "";

                if (type === 'defi') {
                    const defiItem = item as BlockberryDApp;
                    volume24h = defiItem.volume24H || 0;
                    volume7d = defiItem.volume7d || 0;
                    volume30d = defiItem.volume30d || 0;
                    // DeFi endpoint doesn't provide social links
                } else {
                    const dexItem = item as BlockberryDEX;
                    volume24h = dexItem.volume || 0; // DEX endpoint returns 'volume' which is likely 24h
                    website = dexItem.socialWebsite || "";
                    twitter = dexItem.socialTwitter || "";
                    discord = dexItem.socialDiscord || "";
                }

                allDApps.push({
                    id: id,
                    name: name,
                    tagline: type === 'defi' ? (item as BlockberryDApp).categories.join(", ") : "Decentralized Exchange",
                    description: "Description not provided by Blockberry.",
                    iconUrl: iconUrl,
                    bannerUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2832&ixlib=rb-4.0.3", // Placeholder
                    category: category,
                    website: website,
                    twitter: twitter,
                    discord: discord,
                    github: "",
                    packageId: packageId,

                    metrics: {
                        users24h: 0,
                        users7d: 0,
                        users30d: 0,
                        volume24h: volume24h,
                        volume7d: volume7d,
                        volume30d: volume30d,
                        tvl: tvl,
                        transactions24h: txsCount,
                    },

                    rank: allDApps.length + 1,
                    rankChange: 0,

                    rating: 4.5, // Placeholder
                    reviewCount: 0,
                    upvotes: 0,

                    launchDate: new Date().toISOString(),
                    isNew: false,
                    isFeatured: false,

                    features: type === 'defi' ? (item as BlockberryDApp).categories : ['DEX', 'Swap', 'Liquidity'],
                    screenshots: [],

                    developer: {
                        id: "blockberry-dev",
                        name: "Unknown Developer",
                        avatar: "👤",
                        bio: "Developer info not available via Blockberry",
                        verified: false,
                        dapps: []
                    },
                    reviewsTableId: "",
                    reviews: []
                } as DApp);
            };

            // Process on-chain dApps first (these are manually registered)
            if (onChainData) {
                onChainData.forEach(item => processOnChainDApp(item));
            }

            // Process DEX data second as it has more social info
            if (dexData) {
                dexData.forEach(item => processAndAdd(item, 'dex'));
            }

            // Process DeFi data third, skipping duplicates
            if (defiData) {
                defiData.forEach(item => processAndAdd(item, 'defi'));
            }

            // Re-rank based on TVL
            return allDApps.sort((a, b) => (b.metrics.tvl || 0) - (a.metrics.tvl || 0)).map((dapp, index) => ({
                ...dapp,
                rank: index + 1,
                isFeatured: index < 3
            }));
        },
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
        gcTime: 1000 * 60 * 30, // Keep in garbage collection for 30 minutes
    });
};
