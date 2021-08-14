import ToBringItems from './ToBringItems';
import type { CompletableSlide } from 'models/application';

export interface ToBringItemsProps extends CompletableSlide {
    items: string[];
    onItemsChange: (items: string[]) => void;
}

export default ToBringItems;