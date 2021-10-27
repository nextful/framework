import { ContentfulModule } from '../types';

const findContentfulModuleByTypename = (typename: string, modules: ContentfulModule[]) =>
    modules?.find((module) => module.typename === typename);

export default findContentfulModuleByTypename;
