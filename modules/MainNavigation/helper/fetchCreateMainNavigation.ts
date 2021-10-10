import fetchMainNavigation from '@ncb/api/helper/fetchMainNavigation';
import tranformNavigationData from '@ncb/lib/tranformNavigationData';

const fetchCreateMainNavigation = async () => {
    const data = await fetchMainNavigation();
    return tranformNavigationData(data);
};

export default fetchCreateMainNavigation;
