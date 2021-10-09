import { createContext } from 'react';

interface GlobalContextInterface {
    mainNavigation: any;
    footerNavigation: any;    
};

export const GlobalContext = createContext<GlobalContextInterface | null>(null);

export const InitialValues: GlobalContextInterface = {
    mainNavigation: false,
    footerNavigation: false,
};