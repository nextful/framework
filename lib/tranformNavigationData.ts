import { NavigationItem } from '../types';

const tranformNavigationData = (data: NavigationItem[]) => {
    const findPossibleChildByParentId = (parent: NavigationItem) => {
        const childs = data.filter((item: NavigationItem) => {
            return parent.sys.id === item?.parent?.sys?.id;
        });

        parent.childs = childs;
        childs.forEach((child: NavigationItem) => {
            findPossibleChildByParentId(child);
        });
    };

    const navigationData = data.filter((item: NavigationItem) => {
        return item.parent === null;
    });

    navigationData.forEach((item: NavigationItem) => {
        findPossibleChildByParentId(item);
    });

    return navigationData;
};

export default tranformNavigationData;
