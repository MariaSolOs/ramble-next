import type { Image } from 'models/files';

import PostsGallery from './PostsGallery';

export type PostsGalleryProps = {
    posts: { title: string; image: Image; }[];
}

export default PostsGallery;