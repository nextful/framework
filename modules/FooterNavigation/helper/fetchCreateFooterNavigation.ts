import fetchFooterNavigation from '@nextful/api/helper/fetchMainNavigation';
import tranformNavigationData from '@nextful/lib/tranformNavigationData';

const fetchCreateFooterNavigation = async () => {
    const data = await fetchFooterNavigation();
    return tranformNavigationData(data);
};

export default fetchCreateFooterNavigation;
