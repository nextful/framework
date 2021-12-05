import { createElement } from 'react';

const renderComponents = (items: any[], modules: any[]) => {
    if (!items || items?.length < 1) {
        return null;
    }

    return items.map((item) => {
        const module = modules?.find((module) => module.typename === item.__typename);

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
