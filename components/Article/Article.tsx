import { renderComponents } from '@nextful/packages/module-connector';
import { Article as ArticleType } from '@nextful/types/index';
import Modules from '@nextful/modules/mapping';

const Article = ({ modulesCollection }: ArticleType) => {
    return <>{renderComponents(modulesCollection.items, Modules)}</>;
};

export default Article;
