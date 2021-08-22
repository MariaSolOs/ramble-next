import { useSession } from 'next-auth/client';

import { getGraphQLClient } from 'lib/graphql'
import { getSdkWithHooks } from 'graphql-server/sdk';

const graphQLClient = getGraphQLClient();
const sdk = getSdkWithHooks(graphQLClient);

/**
 * @returns Hook that saves/unsaves an experience from the user's 
 * list of saved experiences, and also checks if an experience was
 * previously booked.
 */
export default function useUserExperiences() {
    const [session] = useSession();
    const isLoggedIn = Boolean(session?.user.userId);

    // Only fetch if logged in
    const { data, mutate } = sdk.useGetUserExperiences(
        isLoggedIn ? 'getUserExperiences' : null,
        { userId: session?.user.userId || '' }
    );

    const isExperienceSaved = (experienceId: string) => {
        return data?.me.savedExperiences.some(({ _id }) =>
            _id === experienceId
        );
    }

    const isExperienceBooked = (experienceId: string) => {
        return data?.me.bookedExperiences.some(({ _id }) =>
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
                    ) || [],
                    bookedExperiences: data?.me.bookedExperiences || []
                }
            }), false);
            sdk.unsaveExperience({ experienceId });
        } else {
            mutate(data => ({
                me: {
                    savedExperiences: [ 
                        ...(data?.me.savedExperiences || []), 
                        { _id: experienceId }
                    ],
                    bookedExperiences: data?.me.bookedExperiences || []
                }
            }), false);
            sdk.saveExperience({ experienceId });
        }
    }

    return { 
        isExperienceSaved, 
        isExperienceBooked,
        handleSavingToggle 
    }
}