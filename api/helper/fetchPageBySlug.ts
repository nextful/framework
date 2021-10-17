import { createClient } from '..';
import { PAGE_DATA } from '../queries';
import Modules from '@ncb/modules/mapping';

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

            for (const module of modules) {
                const internalModule = Modules.find((item) => item.typename === module.__typename);
                console.log(internalModule);
            }
        }
    }

    return pageData;
};

export default fetchPageBySlug;
