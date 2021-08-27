import { getPlaiceholder } from 'plaiceholder';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!
});

/**
 * @param url - The image URL
 * @returns A placeholder image (encoded as a base64 string)
 */
export const getPlaceholder = async (url: string) => {
    const { base64 } = await getPlaiceholder(url);
    return base64;
}

/**
 * Deletes assets from Cloudinary.
 * 
 * @param imageUrl - The URLs of the assets in Cloudinary
 */
export const deletePhotos = async (urls: string[], folder: 'Users' | 'Experiences') => {
    // Get the public IDs from the URLs
    const publicIds = urls.map(url => {
        const id = url.split('/').pop()?.split('.')[0]!;
        return `Ramble/${folder}/${id}`;
    });

    await cloudinary.api.delete_resources(publicIds);
}
