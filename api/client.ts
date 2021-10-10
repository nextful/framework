import { ApolloClient, InMemoryCache } from '@apollo/client';

export const createClient = (preview = false) => {
    const token = process.env.CONTENTFUL_ACCESS_TOKEN;
    const spaceId = process.env.CONTENTFUL_SPACE_ID;

    const client = new ApolloClient({
        uri: `https://graphql.contentful.com/content/v1/spaces/${spaceId}?access_token=${token}`,
        cache: new InMemoryCache(),
        defaultOptions: {
            query: {
                fetchPolicy: 'no-cache',
                errorPolicy: 'all',
            },
            watchQuery: {
                fetchPolicy: 'no-cache',
                errorPolicy: 'all',
            },
        },
    });

    return client;
};

const client = createClient();

export default client;
