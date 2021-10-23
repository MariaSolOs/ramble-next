import type { Image } from 'models/files';

import GallerySlide from './GallerySlide';

export type GallerySlideProps = {
    images: Image[];
    title: string;
    subtitle: string;
    titlesAlign: 'left' | 'right';
}

export default GallerySlide;