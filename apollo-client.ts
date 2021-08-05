import { ApolloClient, InMemoryCache } from '@apollo/client';

/* Base URL depends on if we're calling this from the client 
or server. */
const rambleUrl = process.env.RAMBLE_URL || process.env.NEXT_PUBLIC_RAMBLE_URL;

const apolloClient = new ApolloClient({
    uri: `${rambleUrl}/api/graphql`,
    cache: new InMemoryCache()
});

export default apolloClient;
