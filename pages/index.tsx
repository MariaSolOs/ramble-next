import { GetStaticProps } from 'next';

// import getGraphQLClient from 'graphQLClient';
// import { 
//     GetFeaturedExperiencesDocument,
//     GetFeaturedExperiencesQuery,
//     GetFeaturedExperiencesQueryVariables
// } from 'graphql-server/operations';
import useLanguageContext from 'context/languageContext';
import { getPlaceholder } from 'utils/cloudinary';
import { CLOUDINARY_BASE_URI } from 'global-constants';
// import { CLOUDINARY_BASE_URI, FEATURED_EXPERIENCES_IDS } from 'global-constants';
// import { getCardInfo } from 'models/experience-interface';
import type { Image } from 'models/files';
// import type { ExperienceCard } from 'models/experience-interface';

import ResetPasswordDialog from 'components/ResetPasswordDialog';
// import Landing from 'components/home-page/Landing';
import GallerySlide from 'components/home-page/GallerySlide';
import Footer from 'components/Footer';

const GRID_URLS = [
    'v1628201003/Ramble/Homepage/homeGrid1.jpg',
    'v1628200960/Ramble/Homepage/homeGrid2.jpg',
    'v1628200812/Ramble/Homepage/homeGrid3.jpg',
    'v1628201061/Ramble/Homepage/homeGrid4.jpg',
    'v1628200898/Ramble/Homepage/homeGrid5.jpg'
];

const PARTAKE_URLS = [
    'v1628286593/Ramble/Homepage/partake1.jpg',
    'v1628286600/Ramble/Homepage/partake2.jpg',
    'v1628286600/Ramble/Homepage/partake3.jpg',
] as const;

const ADVENTURE_URLS = [
    'v1628286916/Ramble/Homepage/adventure1.jpg',
    'v1628286916/Ramble/Homepage/adventure2.jpg',
    'v1628286916/Ramble/Homepage/adventure3.jpg'
] as const;

type Props = {
    collageImages: Image[];
    partakeImages: Image[];
    adventureImages: Image[];
    // featuredExperiences: ExperienceCard[];
}

// const graphQLClient = getGraphQLClient();

export const getStaticProps: GetStaticProps<Props> = async () => {
    // Images for the landing collage
    const collageImagesPromises = GRID_URLS.map(async (url) => {
        const src = `${CLOUDINARY_BASE_URI}/dpr_auto,q_auto/${url}`;
        const placeholder = await getPlaceholder(src);
        return { src, placeholder }
    });
    const collageImages = await Promise.all(collageImagesPromises);

    // Images for the landing slides
    const partakeImagesPromises = PARTAKE_URLS.map(async (url) => {
        const src = `${CLOUDINARY_BASE_URI}/c_fill,h_600,w_500/${url}`;
        const placeholder = await getPlaceholder(src);
        return { src, placeholder }
    });
    const partakeImages = await Promise.all(partakeImagesPromises);

    const adventureImagesPromises = ADVENTURE_URLS.map(async (url) => {
        const src = `${CLOUDINARY_BASE_URI}/c_fill,h_600,w_500/${url}`;
        const placeholder = await getPlaceholder(src);
        return { src, placeholder }
    });
    const adventureImages = await Promise.all(adventureImagesPromises);

    // Featured experiences
    // const data = await graphQLClient.request<GetFeaturedExperiencesQuery, GetFeaturedExperiencesQueryVariables>(GetFeaturedExperiencesDocument, {
    //     ids: FEATURED_EXPERIENCES_IDS
    // });
    // const featuredExperiences = data.experiencesById.map(getCardInfo);

    return {
        props: {
            collageImages,
            partakeImages,
            adventureImages,
            // featuredExperiences
        }
    }
}

const Home = (props: Props) => {
    const { Home: text } = useLanguageContext().appText;

    return (
        <>
            <ResetPasswordDialog />
            {/* <Landing
            collageImages={props.collageImages}
            featuredExperiences={props.featuredExperiences} /> */}
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