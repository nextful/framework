import { ReactPropTypes } from 'react';

const ModuleExample = ({ ...props }: any) => {
    return <div>{props.moduleExample.headline}</div>;
};

export default ModuleExample;
