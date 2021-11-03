const apollo = require('@apollo/client');
const fetch = require('cross-fetch');
const gql = require('graphql-tag');
const dotenv = require('dotenv');

dotenv.config();

const INDEX_PAGE = gql`
    query {
        homePage: pageCollection(limit: 1, where: { home: true }) {
            items {
                slug
            }
        }
        firstLevelPage: pageCollection(limit: 1, where: { parent: null }) {
            items {
                slug
            }
        }
        page: pageCollection(limit: 1) {
            items {
                slug
            }
        }
    }
`;

const createClient = () => {
    const token = process.env.CONTENTFUL_ACCESS_TOKEN;
    const spaceId = process.env.CONTENTFUL_SPACE_ID;

    const client = new apollo.ApolloClient({
        link: new apollo.HttpLink({ uri: `https://graphql.contentful.com/content/v1/spaces/${spaceId}?access_token=${token}`, fetch }),
        cache: new apollo.InMemoryCache(),
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

const fetchIndexPage = async () => {
    let data;
    const client = createClient();

    try {
        data = await client.query({
            query: INDEX_PAGE,
        });
    } catch (error) {
        console.error(error);
        return false;
    }

    const homeSlug = data?.data?.homePage?.items[0]?.slug;

    if (homeSlug) {
        return homeSlug;
    }

    const firstLevelSlug = data?.data?.firstLevelPage?.items[0]?.slug;

    if (firstLevelSlug) {
        return firstLevelSlug;
    }

    const pageSlug = data?.data?.page?.items[0]?.slug;

    if (pageSlug) {
        return pageSlug;
    }

    return false;
};

module.exports = fetchIndexPage;
