import getGraphQLClient from 'graphQLClient';
import { getSdkWithHooks } from 'graphql-server/sdk';

// import {
//     GetUserSavedExperiencesDocument,
//     GetUserSavedExperiencesQuery
// } from 'graphql-server/operations';

const graphQLClient = getGraphQLClient();

export default function useSavedExperiences() {
    const sdk = getSdkWithHooks(graphQLClient);
    console.log(sdk);
}