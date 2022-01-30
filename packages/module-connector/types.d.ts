export type NextModule = {
    typename: string;
    component: FunctionComponent;
    fetch(id: string): Promise<any>;
};
