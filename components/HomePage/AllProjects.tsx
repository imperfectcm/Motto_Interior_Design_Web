
interface AllProjectsProps {
    images: Promise<JSX.Element[]>;
}

export default function AllProjects(props: AllProjectsProps) {

    return (
        <div className="col-start-2 col-span-6 row-start-3 row-span-3 gap-6 
        flex flex-row overflow-x-auto snap-x snap-mandatory pb-6">
            {props.images}
        </div>
    )
    
}