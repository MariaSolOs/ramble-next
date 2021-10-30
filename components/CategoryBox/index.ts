import type React from 'react';

import type { ExperienceCategory } from 'graphql-server/sdk';

import CategoryBox from './CategoryBox';
import { Title as TitleComponent, Icon as IconComponent } from './CategoryBox.styled';

export type IconLocation = 'top' | 'left';

export type CategoryBoxProps = {
    category: ExperienceCategory;
    iconLocation: IconLocation;
    titleComponent?: React.ComponentType;
    iconComponent?: React.ComponentType;
    divProps?: React.HTMLAttributes<HTMLDivElement>;
    className?: string;
}

export { TitleComponent, IconComponent }
export default CategoryBox;