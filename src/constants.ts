export const NETWORK = import.meta.env.VITE_NETWORK || 'testnet';

// Deployed Contract IDs
export const PACKAGE_ID = import.meta.env.VITE_PACKAGE_ID || '0xdf2c43333ce33e410cad9464ab98522fb699612b040f26e9696cb672e93260fa';
export const REGISTRY_ID = import.meta.env.VITE_REGISTRY_ID || '0x08e331a236a3191ff3d26c2ec8288296a40f1d6b5c91ec7b6269619fb27c5050';
export const MODULE_NAME = 'dapp_registry';

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
