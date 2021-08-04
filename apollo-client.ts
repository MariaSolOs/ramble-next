import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
    uri: `${process.env.RAMBLE_URL}/api/graphql`
});

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

export default apolloClient;
