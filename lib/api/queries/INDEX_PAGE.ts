import { gql } from '@apollo/client';

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

export default INDEX_PAGE;
