import type { CompletableSlide } from 'models/application';

import Preview from './Preview';

export interface PreviewProps extends CompletableSlide {
    images: (File | string | undefined)[];
    onImageChange: (index: number, imgFile?: File) => void;
}

export default Preview;