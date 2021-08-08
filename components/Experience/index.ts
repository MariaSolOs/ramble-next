import React from 'react';

import Experience from './Experience';
import type { ExperienceViewFragment as ExperienceType } from 'graphql-server/sdk';

export type ExperienceProps = {
    experience: ExperienceType;
    isExperienceSaved?: boolean;
    onHeartClick?: React.MouseEventHandler;
    onShareClick?: React.MouseEventHandler;
    useMobileDisplay?: boolean;
}

export type ExperienceStyleProps = {
    isExperienceSaved: boolean;
    numQuickInfosColumns: number;
}

export type CarouselItemProps = {
    original: string;
    thumbnail: string;
    placeholder: string;
    alt: string;
}

export default Experience;