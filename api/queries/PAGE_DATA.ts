import { gql } from '@apollo/client';

const PAGE_DATA = gql`
  query pageData($slug: String!) {
    pageCollection(limit: 1, where: { slug: $slug }) {
      items {
        sys {
          id
        }
        seo {
          metaTitle
          metaDescription
        }
        articlesCollection {
          items {
            sys {
              id
            }
            modulesCollection {
              items {
                sys {
                  id
                }
                __typename
              }
            }
          }
        }
      }
    }
  }
`;

export default PAGE_DATA;
