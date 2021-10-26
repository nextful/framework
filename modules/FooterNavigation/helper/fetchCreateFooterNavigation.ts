import fetchFooterNavigation from '@ncb/api/helper/fetchFooterNavigation';
import tranformNavigationData from '@ncb/lib/tranformNavigationData';

const fetchCreateFooterNavigation = async () => {
    const data = await fetchFooterNavigation();
    return tranformNavigationData(data);
};

export default fetchCreateFooterNavigation;
