import type { Image } from 'models/files';
import type { Language } from 'models/translation';

import Collage from './Collage';

export type CollageProps = {
    images: Image[];
}

export type CollageStyleProps = {
    language: Language;
}   

export default Collage;