import type { GetStaticProps } from 'next';

import useLanguageContext from 'context/languageContext';
import { getPostsCardsInfo } from 'lib/blog-markdown';
import { getPlaceholder } from 'lib/cloudinary';
import { CLOUDINARY_BASE_URI } from 'global-constants';
import type { Page } from 'models/application';
import type { Image } from 'models/files';

import RambleHead from 'components/RambleHead';
import Hero from 'components/blog/Hero';
import PostsGallery from 'components/blog/PostsGallery';

type Props = {
    heroImage: Image;
    posts: { title: string; slug: string; image: Image; }[];
}

const HERO_IMAGE_URL = `${CLOUDINARY_BASE_URI}/v1632595528/Ramble/Blog/csakewbsdq67k4eksxno.jpg` as const;

export const getStaticProps: GetStaticProps<Props> = async () => {
    const heroImagePlaceholder = await getPlaceholder(HERO_IMAGE_URL);
    const posts = await getPostsCardsInfo();

    return {
        props: { 
            heroImage: { 
                src: HERO_IMAGE_URL, 
                placeholder: heroImagePlaceholder 
            },
            posts 
        },
        revalidate: 60 * 10 // Update every 10 minutes
    }
}

const AllPostsPage: Page<Props> = (props) => {
    const { Blog: text } = useLanguageContext().appText;

    return (
        <>
            <RambleHead
            title="Ramble's blog: Experience different"
            description="About us, our creators, and the experiences we're living"
            imageUrl={props.heroImage.src} />
            <Hero 
            imageProps={{
                src: props.heroImage.src,
                blurDataURL: props.heroImage.placeholder,
                objectPosition: 'top'
            }}
            title={text.heroTitle} />
            <PostsGallery posts={props.posts} />
        </>
    );
}

AllPostsPage.displayName = 'AllPostsPage';

export default AllPostsPage;