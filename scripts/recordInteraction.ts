import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { fromHEX } from '@mysten/sui/utils';

// Configuration
const NETWORK = 'testnet';
const PACKAGE_ID = '0xdf2c43333ce33e410cad9464ab98522fb699612b040f26e9696cb672e93260fa';
const REGISTRY_ID = '0x08e331a236a3191ff3d26c2ec8288296a40f1d6b5c91ec7b6269619fb27c5050';
const MODULE_NAME = 'dapp_registry';

// You need to provide these values:
const INDEXER_CAP_ID = 'YOUR_INDEXER_CAP_ID'; // The IndexerCap object ID (check Sui Explorer)
const DAPP_ID = 'YOUR_DAPP_ID'; // Your dApp ID (the one you submitted)
const USER_ADDRESS = 'YOUR_WALLET_ADDRESS'; // The address you want to record interaction for
const PRIVATE_KEY = 'YOUR_PRIVATE_KEY'; // Your wallet's private key (keep this secret!)

async function recordInteraction() {
    try {
        // Initialize client
        const client = new SuiClient({ url: getFullnodeUrl(NETWORK) });

        // Create keypair from private key
        const keypair = Ed25519Keypair.fromSecretKey(fromHEX(PRIVATE_KEY));
        const sender = keypair.getPublicKey().toSuiAddress();

        console.log('Sender address:', sender);
        console.log('Recording interaction for user:', USER_ADDRESS);
        console.log('DApp ID:', DAPP_ID);

        // Create transaction
        const tx = new Transaction();

        // Get the Clock object (0x6 is the shared Clock object on Sui)
        const clock = tx.object('0x6');

        // Call record_interaction
        tx.moveCall({
            target: `${PACKAGE_ID}::${MODULE_NAME}::record_interaction`,
            arguments: [
                tx.object(INDEXER_CAP_ID), // IndexerCap
                tx.object(REGISTRY_ID),     // Registry
                tx.pure.id(DAPP_ID),        // dapp_id
                tx.pure.address(USER_ADDRESS), // user address
                clock,                       // Clock
            ],
        });

        // Execute transaction
        console.log('Executing transaction...');
        const result = await client.signAndExecuteTransaction({
            signer: keypair,
            transaction: tx,
            options: {
                showEffects: true,
                showObjectChanges: true,
            },
        });

        console.log('Transaction successful!');
        console.log('Digest:', result.digest);
        console.log('Effects:', result.effects);

        // Check if successful
        if (result.effects?.status?.status === 'success') {
            console.log('✅ Interaction recorded successfully!');
            console.log('You can now submit a review for this dApp.');
        } else {
            console.log('❌ Transaction failed:', result.effects?.status);
        }

    } catch (error) {
        console.error('Error recording interaction:', error);
    }
}

// Run the script
recordInteraction();
