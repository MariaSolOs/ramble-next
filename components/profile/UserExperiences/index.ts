import type { CardContentFragment } from 'graphql-server/sdk';

import UserExperiences from './UserExperiences';

export type UserExperiencesProps = {
    title: string;
    experiences: CardContentFragment[];
}

export default UserExperiences;