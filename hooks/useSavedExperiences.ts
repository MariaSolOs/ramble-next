// import { useState } from 'react';

import getGraphQLClient from 'graphQLClient';
import { getSdkWithHooks } from 'graphql-server/sdk';

// import {
//     GetUserSavedExperiencesDocument,
//     GetUserSavedExperiencesQuery
// } from 'graphql-server/operations';

const graphQLClient = getGraphQLClient();
const sdk = getSdkWithHooks(graphQLClient);

export default function useSavedExperiences() {
    const { data } = sdk.useGetUserSavedExperiences('/api/graphql');
    console.log(data);
}