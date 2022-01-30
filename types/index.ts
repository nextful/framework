import { DocumentNode } from 'graphql';
import { FunctionComponent, ReactChild } from 'react';

export type Seo = {
    metaTitle: string;
    metaDescription: string;
};

export type ContentfulImage = {
    url: string;
    title: string;
    width: number;
    height: number;
};

export type OpenGraph = {
    title?: string;
    url?: string;
    description?: string;
    type?: string;
    imagesCollection?: {
        items: ContentfulImage[];
    };
};

export type Article = {
    sys: {
        id: string;
    };
    modulesCollection: {
        items: Module[];
    };
};

export interface Module {
    sys: {
        id: string;
    };
    __typename: string;
}

export type Page = {
    sys: {
        id: string;
    };
    seo: Seo;
    openGraph: OpenGraph;
    articlesCollection: {
        items: Article[];
    };
};

export type NavigationItem = {
    sys: {
        id: string;
    };
    title: string;
    slug: string;
    childs?: NavigationItem[];
    parent: null | {
        sys: {
            id: string;
        };
    };
};
