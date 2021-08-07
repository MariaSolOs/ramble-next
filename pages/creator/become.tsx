import { GetStaticProps } from 'next';

import useLanguageContext from 'context/languageContext';
import { getPlaceholder } from 'utils/cloudinary';
import { CLOUDINARY_BASE_URI } from 'global-constants';
import type { Image } from 'models/files';
import type { CreatorBio } from 'models/creator-interface';

import RambleHead from 'components/RambleHead';
import Landing from 'components/become-a-creator/Landing';
import CreatorBios from 'components/become-a-creator/CreatorBios';
import ActGraph from 'components/become-a-creator/ActGraph';
import Footer from 'components/Footer';

type Props = {
    landingImage: Image;
    biosData: CreatorBio[];
}

const LANDING_IMG_URL = `${CLOUDINARY_BASE_URI}/c_fill,h_600,w_500/v1622837493/Ramble/Homepage/sidneyCamera.jpg`;

const biosData: CreatorBio[] = [
    {
        name: 'Kevin',
        image: {
            src: `${CLOUDINARY_BASE_URI}/c_thumb,g_face,h_500,w_500/v1614733940/Ramble/Creators/kevin_ezussv.jpg`,
            placeholder: ''
        },
        bio: {
            en: "I'm a bartender and an ice carver in one of Montreal's coolest cocktail bars. I consider myself a creative and devoted mind and I have yet to quench my thirst for everything mixology.",
            fr: "Je travaille dans l'un des bars à cocktails les plus \"cool\" de Montréal. Après toutes ces années, je ne suis toujours pas arrivé à étancher ma soif de tout ce qui touche à la mixologie."
        }
    }, 
    {
        name: 'Pierre & Sidney',
        image: {
            src: `${CLOUDINARY_BASE_URI}/c_thumb,h_500,w_500/v1617381856/Ramble/Users/xdpk0dduqlqq5tnunwnj.jpg`,
            placeholder: ''
        },
        bio: {
            en: "After various journeys that have led us to work in some of the most renowned institutions in the world, our paths crossed in 2016, at the Relais Bernard Loiseau, one of the most famous tables of France. We look forward to welcoming you behind the scenes of our restaurant.",
            fr: "Après différents périples nous ayant amenés à travailler dans quelques unes des institutions les plus réputées au monde, de l’Atelier de Joël Robuchon au Kikunoi, au Japon, nos chemins se sont croisés en 2016, au Relais Bernard Loiseau, l'une des tables de plus réputées de France. Au plaisir de vous recevoir dans les coulisses de notre restaurant."
        }
    }
];

export const getStaticProps: GetStaticProps<Props> = async () => {
    // Get placeholder for Sidney's image
    const landingPlaceholder = await getPlaceholder(LANDING_IMG_URL);
    const landingImage: Image = { 
        src: LANDING_IMG_URL,  
        placeholder: landingPlaceholder
    }

    // Set placeholders for creator bios
    for (const { image } of biosData) {
        image.placeholder = await getPlaceholder(image.src);
    }

    return {
        props: {
            landingImage,
            biosData
        }
    }
}

const BecomeACreator = (props: Props) => {
    const { BecomeACreator: text } = useLanguageContext().appText;

    return (
        <>
            <RambleHead
            title={`Ramble: ${text.becomeTitle}`}
            description={`${text.becomeTitle} ${text.shareTitle} ${text.getPaidTitle}`}
            imageUrl={props.landingImage.src} />
            <Landing image={props.landingImage} />
            <CreatorBios bios={props.biosData} />
            <ActGraph />
            <Footer />
        </>
    );
}

export default BecomeACreator;