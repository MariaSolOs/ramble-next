import type React from 'react';

import type { Experience as ExperienceType } from 'models/experience-interface';

import Experience from './Experience';

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

export type CarouselImgProps = {
    original: string;
    placeholder: string;
    thumbnail: string;
    alt: string;
}

export default Experience;