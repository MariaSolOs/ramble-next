import matter from 'gray-matter';
import path from 'path';
import fs from 'fs';

import { getPlaceholder } from 'lib/cloudinary';
import type { BlogPost } from 'models/files';

/**
 * From a post's slug, get the metadata and content.
 * 
 * @param slug - The post's slug (including .md extension)
 * @returns The corresponding blog post
 */
export const getPostFromSlug = async (slug: string) => {
    const postPath = path.join(process.cwd(), 'posts', slug);
    const fileContents = fs.readFileSync(postPath, 'utf-8');

    // Transform the Markdown to JSON
    const { data, content } = matter(fileContents);

    // Get the image with placeholder
    const image = await getPlaceholder(data.imageUrl);

    return {
        meta: { ...data, image },
        content
    } as unknown as BlogPost;
}   

/**
 * @returns The cards info to show in the AllPosts page
 */
export const getPostsCardsInfo = async () => {
    const postsPath = path.join(process.cwd(), 'posts');
    const slugsNames = fs.readdirSync(postsPath);
    const postsPromises = slugsNames.map(async slug => {
        const { meta } = await getPostFromSlug(slug);
        return { title: meta.title, image: meta.image }
    });

    return (await Promise.all(postsPromises).then(post => post));
}