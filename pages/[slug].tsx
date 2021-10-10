import fetchStaticPages from '@ncb/api/helper/fetchStaticPages';
import convertContextParamsToSlug from '@ncb/api/helper/convertContextParamsToSlug';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import fetchPageBySlug from '@ncb/api/helper/fetchPageBySlug';
import { NavigationItem, Page } from '@ncb/types/index';
import { fetchCreateMainNavigation } from '@ncb/modules/MainNavigation/helper';
import { fetchCreateFooterNavigation } from '@ncb/modules/FooterNavigation/helper';

type PageProps = {
    pageData: Page;
    mainNavigation: NavigationItem[];
    footerNavigation: NavigationItem[];
};

const DynamicPage = ({ pageData, mainNavigation, footerNavigation }: PageProps) => {
    const { seo } = pageData;
    return (
        <>
            <NextSeo title={seo?.metaTitle} description={seo?.metaDescription} />
        </>
    );
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
