
interface AllProjectsProps {
    images: Promise<JSX.Element[]>;
}

export default function AllProjects(props: AllProjectsProps) {

    return (
        <div className="col-start-2 col-span-6 row-start-3 row-span-3 overflow-x-auto snap-x snap-mandatory pb-3">
            <div className="w-full h-full flex flex-row homepage-cover-img">
                {props.images}
            </div>
        </div>
    )

}