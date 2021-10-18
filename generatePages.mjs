import * as fs from 'fs';
import apollo from '@apollo/client';
import fetch from 'cross-fetch';
import gql from 'graphql-tag';
import dotenv from 'dotenv';

dotenv.config();

const DIR  = process.cwd();

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

const run = async () => {
    const client = createClient();
    let levels = 0;

    const pathsData = await client.query({
        query: gql`
            query staticPaths {
                pageCollection {
                    items {
                        slug
                    }
                }
            }
        `
    });    
    
    pathsData?.data?.pageCollection?.items?.forEach((item) => {
        const matches = (item?.slug?.match(/\//g) || []).length;
        if (matches > levels) {
            levels = matches;
        }
    });

    for (let level = 0; level <= levels; level++) {
    
        if (level === 0) {
            const fileContent = fs.readFileSync(`${DIR}/templates/slug.tsx`,'utf8')
            fs.writeFileSync(`${DIR}/pages/slug.tsx`, fileContent);
            continue;
        }

        let dirPath = `${DIR}/pages/`;
        for(let dirLevel = 0; dirLevel < level; dirLevel++) {
            dirPath += `slug${dirLevel === 0 ? '' : dirLevel}/`
        }

        fs.mkdirSync(dirPath, { recursive: true });
        const fileContent = fs.readFileSync(`${DIR}/templates/slug.tsx`,'utf8')
        fs.writeFileSync(`${dirPath}slug${level}.tsx`, fileContent);
    };

};

run();