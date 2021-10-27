import { gql } from '@apollo/client';

const FOOTER_NAVIGATION = gql`
    query mainNavigation {
        pageCollection(limit: 1000, order: index_ASC, where: { footerNavigation: true }) {
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

export default FOOTER_NAVIGATION;
