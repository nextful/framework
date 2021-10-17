type Props = {
    headline?: string;
    subline?: string;
};

const ModuleExample = ({ headline, subline }: Props) => {
    return (
        <div>
            <h1>{headline}</h1>
            <span>{subline}</span>
        </div>
    );
};

export default ModuleExample;
