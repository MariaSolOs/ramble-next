import type { CompletableSlide } from 'models/application';

import ToBringItems from './ToBringItems';

export interface ToBringItemsProps extends CompletableSlide {
    items: string[];
    onItemsChange: (items: string[]) => void;
}

export default ToBringItems;