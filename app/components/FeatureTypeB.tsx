
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FeatureTypeBProps {
    project: any;
}

export default async function FeatureTypeB(props: FeatureTypeBProps) {
    const project = props.project;

    return (
        <section className="homepage-feature-project-box relative w-full bg-slate-100">
            <div className="absolute right-1/2 pr-20 w-1/3 h-full py-20 flex flex-col justify-around">
                <div>PROJECT</div>
                <div className="text-5xl font-bold">{project.name}</div>
                <div className="font-light">
                    As we explore the desolate surface of the moon and experience its tranquil, uninhabited environment, our project aims to transform the shopping experience for our customers by redefining the physical space. Located in Tsuen Wan&apos;s Citywalk, this project was commissioned by INTIQUE, a women&apos;s fashion brand with a focus on retro fashion.
                </div>
                <div className="white-neumor-btn flex items-center gap-3 w-fit rounded-full px-10 py-4">
                    EXPLORER<FontAwesomeIcon icon={faArrowRight} />
                </div>
            </div>
            <div className="absolute inset-y-10 left-1/2 w-2/5 flex pl-32 img-shadow">
                <img className="object-cover aspect-[3/4]" src={project.cover[0]?.url} alt="Home Page Feature Projects Cover Image" loading="lazy" />
            </div>
            {project.cover[1] &&
                <div className="absolute bottom-1/4 left-1/2 w-1/5 h-1/3 flex img-shadow">
                    <img className="object-cover aspect-[1/1]" src={project.cover[1]?.url} alt="Home Page Feature Projects Cover Image" loading="lazy" />
                </div>}
        </section>
    );
}