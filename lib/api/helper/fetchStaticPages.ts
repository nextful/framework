import { createClient } from '..';
import { STATIC_PATHS } from '../queries';

const fetchStaticPages = async () => {
    let data: any = []; // TODO: Remove any!
    const client = createClient();

    try {
        data = await client.query({
            query: STATIC_PATHS,
        });
    } catch (error) {
        console.error(error);
        return [];
    }

    const items = data?.data?.pageCollection?.items.map((pageItem: any) => {
        return {
            params: {
                slugs: pageItem.slug.split('/'),
            },
        };
    });

    console.log('IREMS', items);

    return items;
};

export default fetchStaticPages;
