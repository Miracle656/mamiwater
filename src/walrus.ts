import { WALRUS_PUBLISHER, WALRUS_AGGREGATOR } from './constants';

export async function uploadToWalrus(content: string | File | Blob): Promise<string> {
    let body: string | File | Blob = content;

    // If content is just a string, we can send it directly
    // If it's an object/JSON, stringify it first
    if (typeof content === 'object' && !(content instanceof File) && !(content instanceof Blob)) {
        body = JSON.stringify(content);
    }

    const response = await fetch(WALRUS_PUBLISHER, {
        method: "PUT",
        body: body,
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Upload failed: ${text}`);
    }

    const data = await response.json();

    // Walrus returns: { newlyCreated: { blobObject: { blobId: "..." } } }
    // OR { alreadyCertified: { blobId: "..." } } depending on if data exists
    const blobId =
        data.newlyCreated?.blobObject?.blobId ||
        data.alreadyCertified?.blobId ||
        data.blobObject?.blobId;

    if (!blobId) {
        console.error("Walrus response:", data);
        throw new Error("Could not retrieve Blob ID from Walrus");
    }

    return blobId;
}

export function getWalrusUrl(blobId: string): string {
    return `${WALRUS_AGGREGATOR}/${blobId}`;
}

export async function fetchFromWalrus(blobId: string): Promise<string> {
    const response = await fetch(getWalrusUrl(blobId));
    if (!response.ok) {
        throw new Error(`Failed to fetch blob ${blobId}`);
    }
    return await response.text();
}
