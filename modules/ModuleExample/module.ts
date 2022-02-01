import { createClient } from '@nextful/api/client';
import { createModule } from '@nextful/packages/module-connector';
import gql from 'graphql-tag';
import ModuleExample from './ModuleExample';

const client = createClient();

const Module = createModule({
    typename: 'ModuleExample',
    component: ModuleExample,
    async fetch(id: string) {
        const query = gql`
            query moduleExampleById($id: String!) {
                moduleExample(id: $id) {
                    sys {
                        id
                    }
                    __typename
                    headline
                    subline
                }
                test: moduleExample(id: $id) {
                    sys {
                        id
                    }
                    __typename
                    headline
                    subline
                }
            }
        `;

        const moduleData = await client.query({
            query: query,
            variables: {
                id,
            },
        });

        return moduleData.data;
    },
});

export default Module;
