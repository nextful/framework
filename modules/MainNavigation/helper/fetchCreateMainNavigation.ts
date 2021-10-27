import fetchMainNavigation from '@nextful/api/helper/fetchMainNavigation';
import tranformNavigationData from '@nextful/lib/tranformNavigationData';

const fetchCreateMainNavigation = async () => {
    const data = await fetchMainNavigation();
    return tranformNavigationData(data);
};

export default fetchCreateMainNavigation;
