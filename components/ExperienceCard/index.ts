import type { Language } from 'models/translation';
import type { CardContentFragment as CardType } from 'graphql-server/sdk';

import ExperienceCard from './ExperienceCard';

export type ExperienceCardProps = {
    experience: CardType;
    linkTo: { href: string; as: string };
    isSaved?: boolean;
    onHeartClick?: React.MouseEventHandler;
    containerClass?: string;
}

export type ExperienceCardStyleProps = {
    language: Language;
    hasRatingInfo: boolean;
    isSaved: boolean;
}

export default ExperienceCard;