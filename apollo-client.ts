import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

/* Base URL depends on if we're calling this from the client 
or server. */
const rambleUrl = process.env.RAMBLE_URL || process.env.NEXT_PUBLIC_RAMBLE_URL;

// Use a reactive variable to store user's saved experiences
export const savedExperiencesVar = makeVar<string[]>([]);

export const saveExperience = (toAdd: string) => {
    const savedExperiences = savedExperiencesVar();
    savedExperiencesVar([ ...savedExperiences, toAdd ]);
}

export const unsaveExperience = (toDelete: string) => {
    const updatedExperiences = savedExperiencesVar().filter(id => 
        id !== toDelete
    );
    savedExperiencesVar(updatedExperiences);
}

const apolloClient = new ApolloClient({
    uri: `${rambleUrl}/api/graphql`,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    savedExperiences: {
                        read() {
                            return savedExperiencesVar();
                        }
                    }
                }
            }
        }
    })
});

export default apolloClient;
