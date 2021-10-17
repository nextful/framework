import { renderComponents } from '@ncb/lib/renderer';
import { Article as ArticleType } from '@ncb/types/index';
import Modules from '@ncb/modules/mapping';

const Article = ({ modulesCollection }: ArticleType) => {
    return <>{renderComponents(modulesCollection.items, Modules)}</>;
};

export default Article;
