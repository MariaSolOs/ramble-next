import { useSession } from 'next-auth/client';

import { getGraphQLClient } from 'lib/graphql'
import { getSdkWithHooks } from 'graphql-server/sdk';

const graphQLClient = getGraphQLClient();
const sdk = getSdkWithHooks(graphQLClient);

/**
 * @returns Hook that saves/unsaves an experience from the user's 
 * list of saved experiences.
 */
export default function useSavedExperiences() {
    const [session] = useSession();
    const isLoggedIn = Boolean(session?.user.userId);

    // Only fetch if logged in
    const { data, mutate } = sdk.useGetUserSavedExperiences(
        isLoggedIn ? 'getUserSavedExperiences' : null,
        { userId: session?.user.userId || '' }
    );

    const isExperienceSaved = (experienceId: string) => {
        return data?.me.savedExperiences.some(({ _id }) =>
            _id === experienceId
        );
    }

    const handleSavingToggle = (experienceId: string) => {
        // There's nothing to change if not logged in
        if (!isLoggedIn) {
            return;
        }

        if (isExperienceSaved(experienceId)) {
            mutate(data => ({
                me: {
                    savedExperiences: data?.me.savedExperiences.filter(({ _id }) => 
                        _id !== experienceId
                    ) || []
                }
            }), false);
            sdk.unsaveExperience({ experienceId });
        } else {
            mutate(data => ({
                me: {
                    savedExperiences: [ 
                        ...(data?.me.savedExperiences || []), 
                        { _id: experienceId }
                    ]
                }
            }), false);
            sdk.saveExperience({ experienceId });
        }
    }

    return { isExperienceSaved, handleSavingToggle }
}