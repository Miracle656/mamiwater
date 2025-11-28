import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useState } from "react";
import { PACKAGE_ID, REGISTRY_ID, MODULE_NAME } from "../constants";
import { uploadToWalrus } from "../walrus";

export const useSubmitReview = () => {
    // const client = useSuiClient();
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
    const [isUploading, setIsUploading] = useState(false);

    const submitReview = async (
        dappId: string,
        rating: number, // 1 to 5
        title: string,
        commentText: string,
        userName: string,
        onSuccess?: () => void,
        onError?: (error: any) => void
    ) => {
        try {
            setIsUploading(true);

            // --- STEP 1: Upload Content to Walrus ---
            console.log("Uploading to Walrus...");
            const blobId = await uploadToWalrus(commentText);
            console.log("Walrus Blob ID:", blobId);

            // --- STEP 2: Submit to Sui ---
            const tx = new Transaction();

            tx.moveCall({
                target: `${PACKAGE_ID}::${MODULE_NAME}::add_review`,
                arguments: [
                    tx.object(REGISTRY_ID),      // Registry Object
                    tx.pure.id(dappId),          // The DApp being reviewed
                    tx.pure.string(userName),    // User's display name
                    tx.pure.u8(rating),          // Rating (1-5)
                    tx.pure.string(title),       // Review Title
                    tx.pure.string(blobId),      // <--- The Walrus Blob ID!
                    tx.object('0x6'),            // Clock Object
                ],
            });

            signAndExecuteTransaction(
                { transaction: tx },
                {
                    onSuccess: (result) => {
                        console.log("Review submitted on-chain!", result);
                        setIsUploading(false);
                        if (onSuccess) onSuccess();
                    },
                    onError: (err) => {
                        console.error("Sui Transaction failed", err);
                        setIsUploading(false);
                        if (onError) onError(err);
                    },
                }
            );
        } catch (error) {
            console.error("Process failed:", error);
            setIsUploading(false);
            if (onError) onError(error);
        }
    };

    return { submitReview, isUploading };
};
