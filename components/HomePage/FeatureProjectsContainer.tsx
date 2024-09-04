import { projectService } from "@/services/ProjectService";
import FeatureTypeA from "./FeatureTypeA";
import FeatureTypeB from "./FeatureTypeB";
import { projectController } from "@/controllers/ProjectController";


export default async function FeatureProjectsContainer() {

    // const test = await projectService.apiTest();
    // const pbtest = await projectService.pbTest();
    const controllerPdTest = await projectController.controllerPbTest();

    return (
        <section>
            <FeatureTypeA />
            <FeatureTypeB />
            <FeatureTypeA />
        </section>
    )
}