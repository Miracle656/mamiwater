import { useSignAndExecuteTransaction, useCurrentAccount } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { PACKAGE_ID, REGISTRY_ID, MODULE_NAME } from "../constants";
import { uploadToWalrus } from "../walrus";

export const useSubmitComment = () => {
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
    const account = useCurrentAccount();

    const submitComment = async (
        dappId: string,
        content: string,
        parentId?: string,
        onSuccess?: () => void,
        onError?: (error: any) => void
    ) => {
        try {
            if (!account) {
                throw new Error("Wallet not connected");
            }

            // 1. Upload content to Walrus
            console.log("Uploading comment to Walrus...");
            const contentBlobId = await uploadToWalrus(content);
            console.log("Comment Blob ID:", contentBlobId);

            // 2. Submit transaction
            const tx = new Transaction();

            tx.moveCall({
                target: `${PACKAGE_ID}::${MODULE_NAME}::add_comment`,
                arguments: [
                    tx.object(REGISTRY_ID),
                    tx.pure.id(dappId),
                    tx.pure.string(account.address), // user_name (using address for now)
                    tx.pure.string(contentBlobId), // content_blob_id
                    tx.pure.option('id', parentId || null),
                    tx.object('0x6'), // Clock
                ],
            });

            signAndExecuteTransaction(
                { transaction: tx },
                {
                    onSuccess: (result) => {
                        console.log("Comment submitted!", result);
                        if (onSuccess) onSuccess();
                    },
                    onError: (err) => {
                        console.error("Comment submission failed", err);
                        if (onError) onError(err);
                    },
                }
            );
        } catch (error) {
            console.error("Failed to submit comment:", error);
            if (onError) onError(error);
        }
    };

    return { submitComment };
};
