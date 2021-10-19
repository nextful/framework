import { createClient } from '..';
import { STATIC_PATHS } from '../queries';

const fetchStaticPages = async (level?: any) => {
    const _level = level === null ? 0 : parseInt(level[0], 10);

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

    return data?.data?.pageCollection?.items
        .filter((item: any) => {
            const slugs = (item?.slug?.match(/\//g) || []).length;
            return slugs === _level;
        })
        .map((pageItem: any) => {
            const slugChunks = pageItem.slug.split('/');
            type Params = {
                [key: string]: string;
            };

            const params: Params = {};

            for (let i = 0; i < slugChunks.length; i++) {
                if (i === 0) {
                    params['slug'] = slugChunks[i];
                    continue;
                }

                params[`slug${i}`] = slugChunks[i];
            }

            return {
                params,
            };
        });
};

export default fetchStaticPages;
