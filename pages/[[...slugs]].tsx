import fetchStaticPages from '@nextful/api/helper/fetchStaticPages';
import { GetStaticPaths, GetStaticProps } from 'next';
import fetchPageBySlug from '@nextful/api/helper/fetchPageBySlug';
import { NavigationItem, Page } from '@nextful/types/index';
import { fetchCreateMainNavigation } from '@nextful/modules/MainNavigation/helper';
import { fetchCreateFooterNavigation } from '@nextful/modules/FooterNavigation/helper';
import Layout from '@nextful/components/Layout';
import { renderArticles } from '@nextful/lib/renderer';
import { NextSeo } from 'next-seo';

const path = require('path');

type PageProps = {
    pageData: Page;
    mainNavigation: NavigationItem[];
    footerNavigation: NavigationItem[];
};

const DynamicPage = ({ pageData, mainNavigation, footerNavigation }: PageProps) => {
    return (
        <>
            <NextSeo
                title={pageData?.seo?.metaTitle}
                description={pageData?.seo?.metaDescription}
                openGraph={{
                    title: pageData?.openGraph?.title,
                    url: pageData?.openGraph?.url,
                    type: pageData?.openGraph?.url,
                    description: pageData?.openGraph?.description,
                    images: pageData?.openGraph?.imagesCollection?.items?.map((item) => ({
                        url: item?.url,
                        alt: item?.title,
                        width: item?.width,
                        height: item?.height,
                    })),
                }}
            />
            <Layout>{renderArticles(pageData?.articlesCollection?.items)}</Layout>
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
    const slug = (context?.params?.slugs as string[])?.join('/');
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
