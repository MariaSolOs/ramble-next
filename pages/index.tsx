import { GetStaticProps } from 'next';

import getGraphQLClient from 'graphQLClient';
import { getSdk } from 'graphql-server/sdk';
import useLanguageContext from 'context/languageContext';
import { getPlaceholder } from 'utils/cloudinary';
import { CLOUDINARY_BASE_URI, FEATURED_EXPERIENCES_IDS } from 'global-constants';
import type { Image } from 'models/files';
import type { CardContentFragment as ExperienceCard } from 'graphql-server/sdk';

import RambleHead from 'components/RambleHead';
import ResetPasswordDialog from 'components/ResetPasswordDialog';
import Collage from 'components/home-page/Collage';
import FeaturedExperiences from 'components/home-page/FeaturedExperiences';
import GallerySlide from 'components/home-page/GallerySlide';
import Footer from 'components/Footer';

type Props = {
    collageImages: Image[];
    partakeImages: Image[];
    adventureImages: Image[];
    featuredExperiences: ExperienceCard[];
}

const GRID_IMGS_URLS = [
    'v1628201003/Ramble/Homepage/homeGrid1.jpg',
    'v1628200960/Ramble/Homepage/homeGrid2.jpg',
    'v1628200812/Ramble/Homepage/homeGrid3.jpg',
    'v1628201061/Ramble/Homepage/homeGrid4.jpg',
    'v1628200898/Ramble/Homepage/homeGrid5.jpg'
];

const PARTAKE_IMGS_URLS = [
    'v1628286593/Ramble/Homepage/partake1.jpg',
    'v1628286600/Ramble/Homepage/partake2.jpg',
    'v1628286600/Ramble/Homepage/partake3.jpg',
] as const;

const ADVENTURE_IMGS_URLS = [
    'v1628286916/Ramble/Homepage/adventure1.jpg',
    'v1628286916/Ramble/Homepage/adventure2.jpg',
    'v1628286916/Ramble/Homepage/adventure3.jpg'
] as const;

const graphQLClient = getGraphQLClient();
const sdk = getSdk(graphQLClient);

export const getStaticProps: GetStaticProps<Props> = async () => {
    // Images for the landing collage
    const collageImagesPromises = GRID_IMGS_URLS.map(async (url) => {
        const src = `${CLOUDINARY_BASE_URI}/dpr_auto,q_auto/${url}`;
        const placeholder = await getPlaceholder(src);
        return { src, placeholder }
    });
    const collageImages = await Promise.all(collageImagesPromises);

    // Images for the landing slides
    const partakeImagesPromises = PARTAKE_IMGS_URLS.map(async (url) => {
        const src = `${CLOUDINARY_BASE_URI}/c_fill,h_600,w_500/${url}`;
        const placeholder = await getPlaceholder(src);
        return { src, placeholder }
    });
    const partakeImages = await Promise.all(partakeImagesPromises);

    const adventureImagesPromises = ADVENTURE_IMGS_URLS.map(async (url) => {
        const src = `${CLOUDINARY_BASE_URI}/c_fill,h_600,w_500/${url}`;
        const placeholder = await getPlaceholder(src);
        return { src, placeholder }
    });
    const adventureImages = await Promise.all(adventureImagesPromises);

    // Featured experiences
    const experiencesData = await sdk.getFeaturedExperiences({
        ids: FEATURED_EXPERIENCES_IDS
    });
    const featuredExperiences = experiencesData.experiencesById;

    return {
        props: {
            collageImages,
            partakeImages,
            adventureImages,
            featuredExperiences
        }
    }
}

const Home = (props: Props) => {
    const { Home: text } = useLanguageContext().appText;

    return (
        <>
            <RambleHead
            title={`Ramble: ${text.experienceTitle}`}
            description={text.discoverTitle}
            imageUrl={`${process.env.RAMBLE_URL}/public/images/ramble-brand.png`} />
            <ResetPasswordDialog />
            <Collage images={props.collageImages} />
            <FeaturedExperiences experiences={props.featuredExperiences} />
            <GallerySlide 
            images={props.partakeImages}
            title={text.partakeTitle}
            subtitle={text.partakeSubtitle}
            titlesAlign="left" />
            <GallerySlide 
            images={props.adventureImages}
            title={text.adventureTitle}
            subtitle={text.adventureSubtitle}
            titlesAlign="right" />
            <Footer />
        </>
    );
}

export default Home;