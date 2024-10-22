
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FeatureTypeAProps {
    project: any;
}

export default async function FeatureTypeA(props: FeatureTypeAProps) {
    const project = props.project;
    const projectName = project.name;

    return (
        <section className="homepage-feature-project-box relative w-full bg-slate-100">
            <div className="absolute left-1/2 pl-20 end-10 w-1/3 h-full py-20 flex flex-col justify-around">
                <div className="text-5xl font-bold">{project.name}</div>
                {project.description &&
                    <div className="font-light whitespace-pre-wrap">
                        {project.description}
                    </div>
                }
                <a href={`/projects/${projectName}`} className="white-neumor-btn flex items-center gap-3 w-fit rounded-full px-10 py-4">
                    EXPLORER<FontAwesomeIcon icon={faArrowRight} />
                </a>
            </div>
            <div className="absolute inset-y-10 right-1/2 w-2/5 flex justify-end pr-32 img-shadow">
                <img className="object-cover aspect-[3/4]" src={project.cover[0]?.url} alt="Home Page Feature Projects Cover Image" loading="lazy" />
            </div>
            {project.cover[1] &&
                <div className="absolute bottom-1/4 right-1/2 w-1/5 h-1/3 flex justify-end img-shadow">
                    <img className="object-cover aspect-[1/1]" src={project.cover[1]?.url} alt="Home Page Feature Projects Cover Image" loading="lazy" />
                </div>}
        </section>
    );
}