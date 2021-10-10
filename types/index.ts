export type Seo = {
    metaTitle: string;
    metaDescription: string;
}

export type Article = {
    sys:  {
        id: string;
    };
    items: Module[];
}

export interface Module {
    sys: {
        id: string;
    };
    __typename: string;
};

export type Page = {
    sys: {
        id: string;
    };
    seo: Seo;
    articlesCollection: {
        items: Article[];
    }
}

export type NavigationItem = {
    sys: {
        id: string;
    };
    title: string;
    slug: string;
    childs?: NavigationItem[];
    parent: null| {
        sys: {
            id: string;
        };
    }
}