import ExperienceCard from './ExperienceCard';
import type { Language } from 'models/translation';
import type { ExperienceCard as CardType } from 'models/experience-interface';

export type ExperienceCardProps = {
    experience: CardType;
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