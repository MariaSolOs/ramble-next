import GallerySlide from './GallerySlide';
import type { Image } from 'models/files';

export type GallerySlideProps = {
    images: Image[];
    title: string;
    subtitle: string;
    titlesAlign: 'left' | 'right';
}

export type GallerySlideStyleProps = {
    titlesAlign: 'left' | 'right';
}

export default GallerySlide;