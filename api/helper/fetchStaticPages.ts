import { createClient } from '..';
import { STATIC_PATHS } from '../queries';

const fetchStaticPages = async (level?: number) => {
    let data: any = []; // TODO: Remove any!
    const client = createClient();

    try {
        data = await client.query({
            query: STATIC_PATHS,
        });
    } catch (error) {
        console.error(error);
        return false;
    }

    return data?.data?.pageCollection?.items.map((pageItem: any) => {
        // TODO: ANY
        return {
            params: {
                slug: pageItem.slug,
            },
        };
    });
};

export default fetchStaticPages;
