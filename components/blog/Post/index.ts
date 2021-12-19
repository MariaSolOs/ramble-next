import type React from 'react';

import type { BlogPost } from 'models/files';

import Post from './Post';

export type PostProps = {
    post: BlogPost;
    onShareClick: React.MouseEventHandler;
}

export default Post;