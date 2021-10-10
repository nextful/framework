import { gql } from '@apollo/client';

const STATIC_PATHS = gql`
    query staticPaths {
        pageCollection {
            items {
                slug
            }
        }
    }
`;

export default STATIC_PATHS;
