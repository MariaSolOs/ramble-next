import type { GetStaticProps } from 'next';

import { getPostsCardsInfo } from 'lib/blog-markdown';
import { getPlaceholder } from 'lib/cloudinary';
import { CLOUDINARY_BASE_URI } from 'global-constants';
import type { Page } from 'models/application';
import type { Image } from 'models/files';

import BlogHero from 'components/blog/BlogHero';

type Props = {
    heroImage: Image;
    posts: { title: string; image: Image; }[];
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
    return (
        <BlogHero image={props.heroImage} />
    );
}

AllPostsPage.displayName = 'AllPostsPage';

export default AllPostsPage;