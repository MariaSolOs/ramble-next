import type { CompletableSlide } from 'models/application';

import Title from './Title';

export interface TitleProps extends CompletableSlide {
    title: string;
    onTitleChange: (title: string) => void;
}

export default Title;