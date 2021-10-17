import { Article as ArticleType } from '@ncb/types/index';
import Article from '@ncb/components/Article';

const renderArticles = (items?: ArticleType[]) => {
    if (!items) {
        return null;
    }

    return (
        <>
            {items.map((item) => (
                <Article key={item.sys.id} {...item} />
            ))}
        </>
    );
};

export default renderArticles;
