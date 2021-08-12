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
 * Deletes the profile picture of a user in Cloudinary.
 * 
 * @param imageUrl - The URL of the asset in Cloudinary
 */
export const deleteUserPicture = async (imageUrl: string) => {
    // Get the public ID from the URL
    const publicId = imageUrl.split('/').pop()?.split('.')[0]!;

    await cloudinary.api.delete_resources([`Ramble/Users/${publicId}`]);
}
