import { createClient } from '..';
import { PAGE_DATA } from '../queries';
import Modules from '@nextful/modules/mapping';

const fetchPageBySlug = async (slug: string) => {
    if (!slug && slug !== '') {
        throw new Error('Can´t fetch page without slug.');
    }

    let data;

    const client = createClient();

    try {
        data = await client.query({
            query: PAGE_DATA,
            variables: {
                slug,
            },
        });
    } catch (error) {
        console.error(error);
        return false;
    }

    const pageData = data?.data?.pageCollection?.items[0];

    if (pageData?.articlesCollection?.items?.length > 0) {
        for (const article of pageData.articlesCollection.items) {
            const modules = article?.modulesCollection?.items;

            if (modules?.length < 0) {
                continue;
            }

            for (let i = 0; i < modules.length; i++) {
                const module = modules[i];

                const internalModule = Modules?.find((internal: any) => module.typename === internal.__typename);

                if (!internalModule) {
                    console.error(`Could not find module with ${module?.__typename}`);
                    continue;
                }

                const moduleData = await client.query({
                    query: internalModule.query,
                    variables: {
                        id: module.sys.id,
                    },
                });

                // merge data fetched by base query and module query
                modules[i] = { ...module, ...moduleData?.data };
            }
        }
    }

    return pageData;
};

export default fetchPageBySlug;
