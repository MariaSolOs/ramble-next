import GallerySlide from './GallerySlide';
import type { Image } from 'models/files';

export type GallerySlideProps = {
    images: Image[];
    title: string;
    subtitle: string;
}

export default GallerySlide;