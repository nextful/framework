import { ContentfulModule } from '@ncb/types/index';
import gql from 'graphql-tag';
import ModuleExample from './ModuleExample';

const Module: ContentfulModule = {
    typename: 'ModuleExample',
    component: ModuleExample,
    query: gql`
        query moduleExampleById($id: String) {
            moduleExample(id: $id) {
                sys {
                    id
                }
                __typename
                headline
                subline
            }
        }
    `,
};

export default Module;
