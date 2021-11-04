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
                openGraph {
                    title
                    url
                    type
                    description
                    imagesCollection {
                        items {
                            url
                            width
                            height
                            title
                        }
                    }
                }
                articlesCollection {
                    items {
                        sys {
                            id
                        }
                        ... on Article {
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
    }
`;

export default PAGE_DATA;
