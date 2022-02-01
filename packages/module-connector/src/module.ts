import { NextModule } from '../types.d';
import { FunctionComponent } from 'react';

class Module {
    public typename: string;
    public component: FunctionComponent;
    public fetch: (id: string) => Promise<any>;

    constructor({ typename, component, fetch }: NextModule) {
        this.typename = typename;
        this.component = component;
        this.fetch = fetch;
    }
}

export default Module;
