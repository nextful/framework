import { createClient } from '..';
import { FOOTER_NAVIGATION } from '../queries';

const fetchFooterNavigation = async () => {
    let data: any = []; // TODO: Remove any!
    const client = createClient();

    try {
        data = await client.query({
            query: FOOTER_NAVIGATION,
        });
    } catch (error) {
        console.error(error);
        return false;
    }

    return data?.data?.pageCollection?.items;
};

export default fetchFooterNavigation;
