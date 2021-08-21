import type { Category as CategoryType } from 'models/experience-interface';
import type { CompletableSlide } from 'models/application';

import Category from './Category';

export interface CategoryProps extends CompletableSlide {
    categories: CategoryType[];
    onSelectCategory: (category: CategoryType, remove: boolean) => void;
}

export default Category;