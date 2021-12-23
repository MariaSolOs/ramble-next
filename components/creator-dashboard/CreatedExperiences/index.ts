import type { CardContentFragment } from 'graphql-server/sdk';

import CreatedExperiences from './CreatedExperiences';

export type CreatedExperiencesProps = {
    experiences: CardContentFragment[];
}

export default CreatedExperiences;