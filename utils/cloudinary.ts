import { encode } from 'base64-arraybuffer';

/**
 * @param url - The image URL
 * @returns A placeholder image (encoded as a base64 string)
 */
export const getPlaceholder = async (url: string) => {
    const buffer = await (await (fetch(url))).arrayBuffer();
    const base64 = encode(buffer);
    return base64;
}