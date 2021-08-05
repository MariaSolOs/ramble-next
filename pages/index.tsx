import { GetStaticProps } from 'next';

import useLanguageContext from 'context/languageContext';
import { getPlaceholder } from 'utils/cloudinary';
import { CLOUDINARY_BASE_URI } from 'global-constants';
import type { Image } from 'models/files';

import PageContainer from 'components/home-page/PageContainer';
import GallerySlide from 'components/home-page/GallerySlide';
import Footer from 'components/Footer';
import ResetPasswordDialog from 'components/ResetPasswordDialog';

const PARTAKE_URLS = [
    'holding_camera.jpg',
    'bar-whitedrinks.jpg',
    'camera_on_legs.jpg'
] as const;

const ADVENTURE_URLS = [
    'street_shoots.jpg',
    'cooking_online.jpg',
    'cocktail_workshop.jpg'
] as const;

type Props = {
    partakeImages: Image[];
    adventureImages: Image[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    // Get the images for the landing slides
    const partakeImagesPromises = PARTAKE_URLS.map(async (url) => {
        const src = `${CLOUDINARY_BASE_URI}/c_fill,h_500,w_400/v1/Ramble/Homepage/${url}`;
        const placeholder = await getPlaceholder(src);
        return { src, placeholder }
    });
    const partakeImages = await Promise.all(partakeImagesPromises);

    const adventureImagesPromises = ADVENTURE_URLS.map(async (url) => {
        const src = `${CLOUDINARY_BASE_URI}/c_fill,h_500,w_400/v1/Ramble/Homepage/${url}`;
        const placeholder = await getPlaceholder(src);
        return { src, placeholder }
    });
    const adventureImages = await Promise.all(adventureImagesPromises);

    return {
        props: {
            partakeImages,
            adventureImages
        }
    }
}

const Home = (props: Props) => {
    const { Home: text } = useLanguageContext().appText;

    return (
        <PageContainer>
            <ResetPasswordDialog />
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
        </PageContainer>
    );
}

export default Home;