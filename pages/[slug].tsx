import fetchStaticPages from '@ncb/api/helper/fetchStaticPages';
import convertContextParamsToSlug from '@ncb/api/helper/convertContextParamsToSlug';
import { GetStaticPaths, GetStaticProps } from 'next';
import fetchPageBySlug from '@ncb/api/helper/fetchPageBySlug';
import { NavigationItem, Page } from '@ncb/types/index';
import { fetchCreateMainNavigation } from '@ncb/modules/MainNavigation/helper';
import { fetchCreateFooterNavigation } from '@ncb/modules/FooterNavigation/helper';
import Layout from '@ncb/components/Layout';
import { renderArticles } from '@ncb/lib/renderer';

type PageProps = {
    pageData: Page;
    mainNavigation: NavigationItem[];
    footerNavigation: NavigationItem[];
};

const DynamicPage = ({ pageData, mainNavigation, footerNavigation }: PageProps) => {
    return <Layout>{renderArticles(pageData?.articlesCollection?.items)}</Layout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: await fetchStaticPages(),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const slug = convertContextParamsToSlug(context?.params);
    const pageData = await fetchPageBySlug(slug);

    return {
        props: {
            pageData,
            mainNavigation: await fetchCreateMainNavigation(),
            footerNavigation: await fetchCreateFooterNavigation(),
        },
    };
};

export default DynamicPage;
