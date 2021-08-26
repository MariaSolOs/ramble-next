import { useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { getGraphQLClient } from 'lib/graphql';
import { getPlaceholder } from 'lib/cloudinary';
import { getSdk } from 'graphql-server/sdk';
import useLanguageContext from 'context/languageContext';
import useUiContext from 'context/uiContext';
import { CLOUDINARY_BASE_URI } from 'global-constants';
import type { Image } from 'models/files';
import type { CardContentFragment as ExperienceCard } from 'graphql-server/sdk';
import type { Page } from 'models/application';

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

const FEATURED_EXPERIENCES_IDS = [
    '610acbb332b5150004b20c9f', // Crée ta propre chaussure en carton
    '60c50206daa7aa0017ca9c61', // #35mm Film Photography Introduction
    '6069e90709d1ae00172f4ea4', // Cocktails estivaux avec un mixologue
    '60f76485dbbabe0017308801' // Graffiti 101
];

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
    const experiencesData = await sdk.getExperiencesById({
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

const HomePage: Page<Props> = (props) => {
    const { Home: text } = useLanguageContext().appText;
    const { uiDispatch } = useUiContext();
    const router = useRouter();

    // Check if we just got redirected from Stripe
    useEffect(() => {
        const onboardingStatus = router.query['onboarding-status'];
        if (typeof onboardingStatus !== 'undefined') {
            const message = onboardingStatus === 'true' ? 
                text.onboardingReturnSuccess : text.onboardingReturnFailure;
            uiDispatch({ type: 'OPEN_SNACKBAR', message });
            // Remove the query from the URL
            router.replace('/', undefined, { shallow: true });
        }
    }, [router, uiDispatch, text]);

    // TODO: Import resetpassword dialog dynamically
    return (
        <>
            <RambleHead
            title={`Ramble: ${text.experienceTitle} Montréal`}
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

HomePage.displayName = 'HomePage';

export default HomePage;