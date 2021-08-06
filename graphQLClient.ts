import { GraphQLClient } from 'graphql-request';

/* Base URL depends on if we're calling this from the client 
or server. */
const rambleUrl = process.env.RAMBLE_URL || process.env.NEXT_PUBLIC_RAMBLE_URL;

const getGraphQLClient = () => {
    return new GraphQLClient(`${rambleUrl}/api/graphql`);
}

export default getGraphQLClient;