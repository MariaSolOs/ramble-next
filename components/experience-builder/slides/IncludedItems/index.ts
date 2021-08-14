import IncludedItems from './IncludedItems';
import type { CompletableSlide } from 'models/application';

export interface IncludedItemsProps extends CompletableSlide {
    items: string[];
    onItemsChange: (items: string[]) => void;
}

export default IncludedItems;