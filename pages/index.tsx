import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

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
import Collage from 'components/home-page/Collage';
import FeaturedExperiences from 'components/home-page/FeaturedExperiences';
import GallerySlide from 'components/home-page/GallerySlide';
import Footer from 'components/Footer';
const ResetPasswordDialog = dynamic(() => 
    import('components/ResetPasswordDialog')
);

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
    '616b5572d663c000080d39fe', // Discover the Joys of Food with a Chef & Dietitian
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
        },
        revalidate: 12 * 60 * 60 // Update every 12 hours
    }
}

const HomePage: Page<Props> = (props) => {
    const { Home: text } = useLanguageContext().appText;
    const { uiDispatch } = useUiContext();
    const router = useRouter();

    const [openResetPwdDialog, setOpenResetPwdDialog] = useState(false);

    // Check if the URL has a reset password query
    useEffect(() => {
        if (router.query['password-reset']) {
            setOpenResetPwdDialog(true);
        }
    }, [router.query]);

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

    return (
        <>
            <RambleHead
            title={`Ramble: ${text.experienceTitle1} ${text.experienceTitle2}.`}
            description={text.discoverTitle}
            imageUrl={`${process.env.RAMBLE_URL}/public/images/ramble-brand.png`} />
            {openResetPwdDialog &&
                <ResetPasswordDialog
                open={openResetPwdDialog}
                onClose={() => setOpenResetPwdDialog(false)} />}
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