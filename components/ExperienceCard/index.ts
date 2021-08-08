import ExperienceCard from './ExperienceCard';
import type { Language } from 'models/translation';
import type { CardContentFragment as CardType } from 'graphql-server/sdk';

export type ExperienceCardProps = {
    experience: CardType;
    isSaved?: boolean;
    onHeartClick: React.MouseEventHandler;
    containerClass?: string;
}

export type ExperienceCardStyleProps = {
    language: Language;
    hasRatingInfo: boolean;
    isSaved: boolean;
}

export default ExperienceCard;