import { useState } from 'react';
import { Transaction } from "@mysten/sui/transactions";
import { useSuiClient, useCurrentAccount } from "@mysten/dapp-kit";

interface SponsoredTransactionOptions {
    onSuccess?: (digest: string) => void;
    onError?: (error: any) => void;
}

interface SponsorResponse {
    success: boolean;
    digest?: string;
    error?: string;
}

export const useSponsoredTransaction = () => {
    const client = useSuiClient();
    const account = useCurrentAccount();
    const [isExecuting, setIsExecuting] = useState(false);

    const executeSponsored = async (
        transaction: Transaction,
        options?: SponsoredTransactionOptions
    ) => {
        if (!account?.address) {
            const error = new Error('No account connected');
            console.error(error);
            if (options?.onError) options.onError(error);
            return;
        }

        try {
            setIsExecuting(true);

            // Serialize transaction WITHOUT building (building requires gas coins)
            // The sponsor API will build and add gas payment
            const transactionBytes = transaction.serialize();
            const transactionBase64 = btoa(String.fromCharCode.apply(null, Array.from(transactionBytes) as any));

            console.log('Sending transaction to sponsor API...');

            // Send to sponsor API
            const response = await fetch('/api/sponsor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    transactionBytes: transactionBase64,
                    userAddress: account.address,
                }),
            });

            const result: SponsorResponse = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || 'Sponsorship failed');
            }

            console.log('✓ Sponsored transaction successful:', result.digest);
            setIsExecuting(false);

            if (options?.onSuccess && result.digest) {
                options.onSuccess(result.digest);
            }

            return result;
        } catch (error: any) {
            console.error('Sponsored transaction failed:', error);
            setIsExecuting(false);
            if (options?.onError) options.onError(error);
            throw error;
        }
    };

    // Check if user needs sponsorship (zkLogin wallet with no gas)
    const needsSponsorship = async (): Promise<boolean> => {
        if (!account?.address) return false;

        try {
            // Check if user has any SUI coins
            const coins = await client.getCoins({
                owner: account.address,
                coinType: '0x2::sui::SUI',
            });

            return coins.data.length === 0; // No coins = needs sponsorship
        } catch (error) {
            console.error('Error checking gas coins:', error);
            return false;
        }
    };

    return {
        executeSponsored,
        needsSponsorship,
        isExecuting,
        isAuthenticated: !!account,
        address: account?.address,
    };
};
