import { gql } from '@apollo/client';

const MAIN_NAVIGATION = gql`
    query mainNavigation {
        pageCollection(limit: 1000, order: index_ASC, where: { mainNavigation: true }) {
            items {
                sys {
                    id
                }
                title
                slug
                parent {
                    sys {
                        id
                    }
                }
            }
        }
    }
`;

export default MAIN_NAVIGATION;
