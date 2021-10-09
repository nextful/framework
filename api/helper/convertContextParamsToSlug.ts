import { ParsedUrlQuery } from 'querystring';

// Every url param from context must have following pattern ^(slug[1-9]+|slug$)
// In future version it should be possible to create dynamic page levels therefore param keys need to have
// a pattern.
// slug is the lowest level
// 1+ are deeper levels

const convertContextParamsToSlug = (params?: ParsedUrlQuery) => {
    if (!params) {
        throw new Error('Params not defined');
    }

    return Object
        .keys(params)
        .sort() // keys will be sorted by their level slug/slug1/slug2 ..
        .map((key: string) => params[key])
        .join('/');
};

export default convertContextParamsToSlug;