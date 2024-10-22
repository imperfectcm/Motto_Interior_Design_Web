
import AllProjects from "./AllProjects";
import AllProjectsPageBtn from "./AllProjectsPageBtn";

interface AllProjectsContainerProps {
    projectList: any;
}

export default async function AllProjectsContainer(props: AllProjectsContainerProps) {
    const projectList = props.projectList;
    return (
        <section className="relative homepage-cover-img-box h-screen w-full grid grid-cols-8 grid-rows-7">
            <AllProjects projectList={projectList} />
            <AllProjectsPageBtn />
        </section>
    )
}