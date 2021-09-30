import matter from 'gray-matter';
import path from 'path';
import fs from 'fs';

import { getPlaceholder } from 'lib/cloudinary';
import type { BlogPost } from 'models/files';

/**
 * @returns An array with all slugs
 */
export const getAllSlugs = () => {
    const postsPath = path.join(process.cwd(), 'posts');
    return fs.readdirSync(postsPath);
}

/**
 * From a post's slug, get the metadata and content.
 * 
 * @param slug - The post's slug (including .md extension)
 * @returns The corresponding blog post
 */
export const getPostFromSlug = async (slug: string) => {
    // Remove the file extension, we'll make sure to add it here
    const rawSlug = slug.replace(/\.md$/, '');
    const postPath = path.join(process.cwd(), 'posts', `${rawSlug}.md`);
    const fileContents = fs.readFileSync(postPath, 'utf-8');

    // Transform the Markdown to JSON
    const { data, content } = matter(fileContents);

    // Get the image with placeholder
    const imgPlaceholder = await getPlaceholder(data.imageUrl);

    return {
        meta: { 
            ...data, 
            image: {
                src: data.imageUrl,
                placeholder: imgPlaceholder
            } 
        },
        content
    } as BlogPost;
}   

/**
 * @returns The cards info to show in the AllPosts page
 */
export const getPostsCardsInfo = async () => {
    const slugs = getAllSlugs();
    const postsPromises = slugs.map(async slug => {
        const { meta } = await getPostFromSlug(slug);
        return { title: meta.title, image: meta.image }
    });

    return (await Promise.all(postsPromises).then(post => post));
}