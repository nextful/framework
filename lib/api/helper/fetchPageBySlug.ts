import { createClient } from '..';
import { PAGE_DATA } from '../queries';
import Modules from '@nextful/modules/mapping';
import { fetchModuleData } from '@nextful/packages/module-connector';

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
        for (let i = 0; i < pageData.articlesCollection.items.length; i++) {
            const article = pageData.articlesCollection.items[i];
            const modules = article?.modulesCollection?.items;

            if (modules?.length < 0) {
                continue;
            }

            pageData.articlesCollection.items[i].modulesCollection.items = await fetchModuleData(Modules, modules);
        }
    }

    return pageData;
};

export default fetchPageBySlug;
