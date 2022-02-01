import { ModulesBaseData, ModulesMergedData } from './types';

const fetchModuleData = async (modules: any[], modulesData: ModulesBaseData[]): Promise<ModulesMergedData[]> => {
    const response = [];

    for (let i = 0; i < modulesData.length; i++) {
        const module = modulesData[i];

        const internalModule = modules?.find((internal: any) => internal.typename === module.__typename);

        if (!internalModule) {
            console.error(`Could not find module with ${module?.__typename}`);
            continue;
        }

        const moduleData = await internalModule.fetch(module.sys.id);

        // merge data fetched by base query and module query
        response.push({ ...module, ...moduleData });
    }

    return response;
};

export default fetchModuleData;
