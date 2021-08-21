import type React from 'react';

import type { Category } from 'models/experience-interface';

import CategoryBox from './CategoryBox';

export type CategoryBoxProps = {
    category: Category;
    iconLocation: 'top' | 'left';
    boxClass?: string;
    iconClass?: string;
    titleClass?: string;
    divProps?: React.HTMLAttributes<HTMLDivElement>;
}

export type CategoryBoxStyleProps = {
    backgroundColor: string;
    backgroundImage: string;
    iconLocation: 'top' | 'left';
}

export default CategoryBox;