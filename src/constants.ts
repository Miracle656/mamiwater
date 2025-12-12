export const NETWORK = import.meta.env.VITE_NETWORK || 'testnet';

// Network URL for SuiClient
export const SUI_NETWORK = NETWORK === 'mainnet'
    ? 'https://fullnode.mainnet.sui.io:443'
    : 'https://fullnode.testnet.sui.io:443';

// Deployed Contract IDs
export const PACKAGE_ID = "0xf891668cf36b511419c78b8ae07ee85b6826e6fe7ecbf910558deffbeed75caa";
export const REGISTRY_ID = "0xfc8cd1e1a5f94c5663a9e84e4b4863635ee91466d50eaafebf1d96cc9e5fe2f0";
export const MODULE_NAME = 'dapp_registry';
export const CLOCK_ID = "0x6";

// Enoki Configuration
export const ENOKI_API_KEY = import.meta.env.VITE_ENOKI_API_KEY || '';
export const SPONSOR_ADDRESS = import.meta.env.VITE_SPONSOR_ADDRESS || '';

// Blockberry API
export const BLOCKBERRY_API_KEY = import.meta.env.VITE_BLOCKBERRY_API_KEY || 'uEX3gyeTtmpcKDOZPgxctqNpHmsf7Y';

// Admin Configuration
// The address allowed to perform administrative actions like registering dApps
export const ADMIN_ADDRESS = import.meta.env.VITE_ADMIN_ADDRESS || '';

// Walrus Configuration - Multiple endpoints for fallback
export const WALRUS_PUBLISHERS = [
    'https://walrus-testnet-publisher.nodes.guru/v1/blobs',
    'https://walrus-testnet-publisher.stakely.io/v1/blobs',
    'https://publisher.walrus-testnet.walrus.space/v1/blobs',
    'https://walrus-testnet-publisher.everstake.one/v1/blobs',
    'https://walrus-testnet-publisher.chainbase.online/v1/blobs',
    'https://publisher.testnet.walrus.atalma.io/v1/blobs',
    'https://walrus-testnet-publisher.natsai.xyz/v1/blobs',
    'https://walrus-testnet-publisher.nodeinfra.com/v1/blobs',
];

export const WALRUS_AGGREGATORS = [
    'https://walrus-testnet-aggregator.nodes.guru/v1/blobs',
    'https://walrus-testnet-aggregator.stakely.io/v1/blobs',
    'https://aggregator.walrus-testnet.walrus.space/v1/blobs',
    'https://walrus-testnet-aggregator.everstake.one/v1/blobs',
    'https://walrus-testnet-aggregator.chainbase.online/v1/blobs',
    'https://aggregator.testnet.walrus.atalma.io/v1/blobs',
    'https://walrus-testnet-aggregator.natsai.xyz/v1/blobs',
    'https://walrus-testnet-aggregator.nodeinfra.com/v1/blobs',
];
