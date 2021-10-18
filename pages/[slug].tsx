import fetchStaticPages from '@ncb/api/helper/fetchStaticPages';
import convertContextParamsToSlug from '@ncb/api/helper/convertContextParamsToSlug';
import { GetStaticPaths, GetStaticProps } from 'next';
import fetchPageBySlug from '@ncb/api/helper/fetchPageBySlug';
import { NavigationItem, Page } from '@ncb/types/index';
import { fetchCreateMainNavigation } from '@ncb/modules/MainNavigation/helper';
import { fetchCreateFooterNavigation } from '@ncb/modules/FooterNavigation/helper';
import Layout from '@ncb/components/Layout';
import { renderArticles } from '@ncb/lib/renderer';
import { NextSeo } from 'next-seo';

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
