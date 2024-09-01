import FeatureTypeA from "./FeatureTypeA";
import FeatureTypeB from "./FeatureTypeB";


export default async function FeatureProjectsContainer() {

    return (
        <section>
            <FeatureTypeA />
            <FeatureTypeB />
            <FeatureTypeA />
        </section>
    )
}