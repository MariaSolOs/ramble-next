import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import type { GetStaticProps, GetStaticPaths } from 'next';

import useLanguageContext from 'context/languageContext';
import { getPostFromSlug, getAllSlugs } from 'lib/blog-markdown';
import type { BlogPost } from 'models/files';
import type { Page } from 'models/application';

import Spinner from 'components/Spinner';
import RambleHead from 'components/RambleHead';
import Hero from 'components/blog/Hero';
import Post from 'components/blog/Post';
const ShareDialog = dynamic(() => 
    import('components/ShareDialog')
);

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
            params: { slug: slug.replace(/\.md$/, '') }
        })),
        fallback: true
    }
}

const PostPage: Page<Props> = (props) => {
    const { Blog: text } = useLanguageContext().appText;
    const router = useRouter();

    const [openShareDialog, setOpenShareDialog] = useState(false);
    
    if (router.isFallback || !props.post) {
        return <Spinner />;
    }
    
    const { meta } = props.post;
    const shareUrl = `${process.env.NEXT_PUBLIC_RAMBLE_URL}${router.asPath}`;

    return (
        <>
            <RambleHead
            title={meta.title}
            description={`${meta.title} - Written by ${meta.author.name}`}
            imageUrl={meta.image.src} />
            {openShareDialog &&
                <ShareDialog
                dialogTitle={text.sharePostTitle}
                shareUrl={shareUrl}
                open={openShareDialog}
                onClose={() => setOpenShareDialog(false)} />}
            <Hero 
            title={meta.title}
            imageProps={{
                src: meta.image.src,
                blurDataURL: meta.image.placeholder
            }} />
            <Post post={props.post} onShareClick={() => setOpenShareDialog(true)} />
        </>
    );
}

PostPage.displayName = 'PostPage';

export default PostPage;