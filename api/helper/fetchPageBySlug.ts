import { createClient } from '..';
import { PAGE_DATA } from '../queries';

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

    return data?.data?.pageCollection?.items[0];
};

export default fetchPageBySlug;
