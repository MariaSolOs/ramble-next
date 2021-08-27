import type { ExperienceCategory } from 'graphql-server/sdk';
import type { CompletableSlide } from 'models/application';

import Category from './Category';

export interface CategoryProps extends CompletableSlide {
    categories: ExperienceCategory[];
    onSelectCategory: (category: ExperienceCategory, remove: boolean) => void;
}

export default Category;