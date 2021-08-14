import Category from './Category';
import type { Category as CategoryType } from 'models/experience-interface';
import type { CompletableSlide } from 'models/application';

export interface CategoryProps extends CompletableSlide {
    categories: CategoryType[];
    onSelectCategory: (category: CategoryType, remove: boolean) => void;
}

export default Category;