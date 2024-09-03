import { projectService } from "@/services/ProjectService";
import FeatureTypeA from "./FeatureTypeA";
import FeatureTypeB from "./FeatureTypeB";


export default async function FeatureProjectsContainer() {

    // const test = await projectService.apiTest();
    // const pbtest = await projectService.pbTest();

    return (
        <section>
            <FeatureTypeA />
            <FeatureTypeB />
            <FeatureTypeA />
        </section>
    )
}