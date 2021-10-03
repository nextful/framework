import fetchStaticPages from '@ncb/api/helper/fetchStaticPages';
import type { NextPage } from 'next';

const DynamicPage: NextPage = () => {
  return (
   null
  )
};

export async function getStaticPaths() {
    
    return {
        paths: await fetchStaticPages(),
        fallback: false,
    };
};

export async function getStaticProps() {
    return {
        props: {},
    };
};

export default DynamicPage;
