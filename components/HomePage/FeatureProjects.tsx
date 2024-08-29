import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default async function FeatureProjects() {

    return (
        <section className="homepage-feature-project-box relative w-full bg-slate-100">
            <div className="absolute top-0 left-1/2 pl-20 end-10 w-1/3 h-full py-20 flex flex-col justify-around">
                <div>PROJECT</div>
                <div className="text-5xl font-bold">Chronology</div>
                <div className="font-light">
                    As we explore the desolate surface of the moon and experience its tranquil, uninhabited environment, our project aims to transform the shopping experience for our customers by redefining the physical space. Located in Tsuen Wan's Citywalk, this project was commissioned by INTIQUE, a women's fashion brand with a focus on retro fashion.
                </div>
                <div className="white-neumor-btn flex items-center gap-3 w-fit rounded-full px-10 py-4">
                    EXPLORER<FontAwesomeIcon icon={faArrowRight} />
                    </div>
            </div>
        </section>
    );

}