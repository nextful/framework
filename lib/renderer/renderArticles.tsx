import { Article as ArticleType } from '@nextful/types/index';
import Article from '@nextful/components/Article';

const renderArticles = (items?: ArticleType[]) => {
    if (!items) {
        return null;
    }

    return (
        <>
            {items.map((item) => {
                return <Article key={item.sys.id} {...item} />;
            })}
        </>
    );
};

export default renderArticles;
