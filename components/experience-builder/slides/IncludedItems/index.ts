import type { CompletableSlide } from 'models/application';

import IncludedItems from './IncludedItems';

export interface IncludedItemsProps extends CompletableSlide {
    items: string[];
    onItemsChange: (items: string[]) => void;
}

export default IncludedItems;