import Title from './Title';
import type { CompletableSlide } from 'models/application';

export interface TitleProps extends CompletableSlide {
    title: string;
    onTitleChange: (title: string) => void;
}

export default Title;