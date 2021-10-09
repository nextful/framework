import fetchStaticPages from '@ncb/api/helper/fetchStaticPages';
import convertContextParamsToSlug from '@ncb/api/helper/convertContextParamsToSlug';
import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import fetchPageBySlug from '@ncb/api/helper/fetchPageBySlug';
import { Page } from '@ncb/types/index';

type PageProps = {
    pageData: Page
};

const DynamicPage = ({ pageData }: PageProps) => {
  return (
   null
  )
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
        },
    };
}

export default DynamicPage;
