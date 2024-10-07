
import FeatureTypeA from "./FeatureTypeA";
import FeatureTypeB from "./FeatureTypeB";

interface FeatureProjectsContainerProps {
    featureProjects: any;
}

export default async function FeatureProjectsContainer(props: FeatureProjectsContainerProps) {
    const featureProjects = props.featureProjects;
    const isOdd = (id: number) => { return id % 2 === 1 };

    return (
        <section>
            {featureProjects.map((project: any) => (
                isOdd(project.feature_id) ?
                    <FeatureTypeA key={project.feature_id} project={project} /> :
                    <FeatureTypeB key={project.feature_id} project={project} />
            ))}
        </section>
    )
}