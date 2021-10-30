import type React from 'react';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import type { Experience as ExperienceType } from 'models/experience-interface';
import type { GetReviewsQuery } from 'graphql-server/sdk';

import Experience from './Experience';

export type ExperienceProps = {
    experience: ExperienceType;
    isExperienceSaved?: boolean;
    onHeartClick?: React.MouseEventHandler;
    onShareClick?: React.MouseEventHandler;
    previewMode?: boolean;
    reviews?: GetReviewsQuery['getReviews'];
    onSeeAllReviews?: React.MouseEventHandler;
    onAddReview?: React.MouseEventHandler;
}

export type CarouselImgProps = {
    original: string;
    placeholder: string;
    thumbnail: string;
    alt: string;
}

export type QuickInfoProps = {
    icon: IconDefinition; 
    label: string;
    content: string;
}

export default Experience;