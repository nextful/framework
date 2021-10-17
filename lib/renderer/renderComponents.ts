import { ContentfulModule } from '@ncb/types/index';
import { createElement } from 'react';
import { findContentfulModuleByTypename } from '..';

const renderComponents = (items: any[], modules: ContentfulModule[]) => {
    if (!items || items?.length < 1) {
        return null;
    }

    return items.map((item) => {
        const module = findContentfulModuleByTypename(item.__typename, modules);

        if (!module) {
            return null;
        }

        return createElement(module.component, {
            key: item.sys.id,
            ...item,
        });
    });
};

export default renderComponents;
