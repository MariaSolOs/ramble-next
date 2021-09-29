import { useRouter } from 'next/router';
import type { GetStaticProps, GetStaticPaths } from 'next';

import { getPostFromSlug, getAllSlugs } from 'lib/blog-markdown';
import type { BlogPost } from 'models/files';
import type { Page } from 'models/application';

import Spinner from 'components/Spinner';
import RambleHead from 'components/RambleHead';
import Hero from 'components/blog/Hero';
import Post from 'components/blog/Post';

type Props = {
    post: BlogPost;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    // Retrieve the post from the slug in the URL
    const slug = context.params!.slug as string;
    const post = await getPostFromSlug(slug);

    return {
        props: { post }
    }
}

export const getStaticPaths: GetStaticPaths = () => {
    // Only pre-generate first 100 posts
    const slugs = getAllSlugs().slice(0, 100);

    return {
        paths: slugs.map(slug => ({
            params: { slug }
        })),
        fallback: true
    }
}

const PostPage: Page<Props> = (props) => {
    const router = useRouter();

    if (router.isFallback) {
        return <Spinner />;
    }

    return (
        <>
            <RambleHead
            title={props.post.meta.title}
            description={`${props.post.meta.title} - Written by ${props.post.meta.author.name}`}
            imageUrl={props.post.meta.image.src} />
            <Hero 
            title={props.post.meta.title}
            imageProps={{
                src: props.post.meta.image.src,
                blurDataURL: props.post.meta.image.placeholder
            }} />
            <Post post={props.post} />
        </>
    );
}

PostPage.displayName = 'PostPage';

export default PostPage;