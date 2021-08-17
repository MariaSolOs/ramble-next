import UserExperiences from './UserExperiences';
import type { CardContentFragment } from 'graphql-server/sdk';

export type UserExperiencesProps = {
    title: string;
    experiences: CardContentFragment[];
}

export default UserExperiences;