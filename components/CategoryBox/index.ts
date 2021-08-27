import type React from 'react';

import type { ExperienceCategory } from 'graphql-server/sdk';

import CategoryBox from './CategoryBox';

export type CategoryBoxProps = {
    category: ExperienceCategory;
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