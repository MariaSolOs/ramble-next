import type { CardContentFragment as CardType } from 'graphql-server/sdk';

import ExperienceCard from './ExperienceCard';

export type ExperienceCardProps = {
    experience: CardType;
    linkTo: { href: string; as: string };
    isSaved?: boolean;
    onHeartClick?: React.MouseEventHandler;
    className?: string;
}

export default ExperienceCard;