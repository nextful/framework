import { createClient } from '..';
import { INDEX_PAGE } from '../queries';

const fetchIndexPage = async () => {
    let data: any;
    const client = createClient();

    try {
        data = await client.query({
            query: INDEX_PAGE,
        });
    } catch (error) {
        console.error(error);
        return false;
    }

    const homeSlug = data?.data?.homePage?.items[0]?.slug;

    if (homeSlug) {
        return homeSlug;
    }

    const firstLevelSlug = data?.data?.firstLevelPage?.items[0]?.slug;

    if (firstLevelSlug) {
        return firstLevelSlug;
    }

    const pageSlug = data?.data?.page?.items[0]?.slug;

    if (pageSlug) {
        return pageSlug;
    }

    return false;
};

export default fetchIndexPage;
