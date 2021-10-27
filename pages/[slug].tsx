import fetchStaticPages from '@nextful/api/helper/fetchStaticPages';
import convertContextParamsToSlug from '@nextful/api/helper/convertContextParamsToSlug';
import type { GetStaticPaths, GetStaticProps } from 'next';
import fetchPageBySlug from '@nextful/api/helper/fetchPageBySlug';
import { NavigationItem, Page } from '@nextful/types/index';
import { fetchCreateMainNavigation } from '@nextful/modules/MainNavigation/helper';
import { fetchCreateFooterNavigation } from '@nextful/modules/FooterNavigation/helper';

type PageProps = {
    pageData: Page;
    mainNavigation: NavigationItem[];
    footerNavigation: NavigationItem[];
};

const DynamicPage = ({ pageData, mainNavigation, footerNavigation }: PageProps) => {
    return null;
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
