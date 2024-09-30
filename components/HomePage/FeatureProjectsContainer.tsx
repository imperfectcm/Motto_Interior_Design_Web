
import { projectService } from "@/services/ProjectService";
import FeatureTypeA from "./FeatureTypeA";
import FeatureTypeB from "./FeatureTypeB";
import getFeatureProjectCovers from "../utils/getFeatureProjectCovers";


interface FeatureProjectsContainerProps {
    featureProjects: any;
}

export default async function FeatureProjectsContainer(props: FeatureProjectsContainerProps) {

    const featureProjects = props.featureProjects;

    const isOdd = (id: number) => {
        return id % 2 === 1;
    }

    return (
        <section>
            {featureProjects.map((project: any) => (
                isOdd(project.feature_id) ? <FeatureTypeA project={project} /> : <FeatureTypeB project={project} />
            ))}
        </section>
    )
}