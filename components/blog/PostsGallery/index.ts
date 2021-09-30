import type { Image } from 'models/files';

import PostsGallery from './PostsGallery';

export type PostsGalleryProps = {
    posts: { title: string; slug: string; image: Image; }[];
}

export default PostsGallery;