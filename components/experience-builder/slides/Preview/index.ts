import Preview from './Preview';
import type { CompletableSlide } from 'models/application';

export interface PreviewProps extends CompletableSlide {
    images: (File | string | undefined)[];
    onImageChange: (index: number, imgFile?: File) => void;
}

export default Preview;