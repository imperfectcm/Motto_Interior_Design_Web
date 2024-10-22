
import CreateProjectBtn from "@/app/(admin)/admin/components/CreateProjectBtn";
import ProjectsContainer from "./components/ProjectsContainer";
import { getLastDisplayId, serverGetProjectsWithCovers } from "@/controllers/projects/get";

const admin = async () => {
    const projectList = await serverGetProjectsWithCovers();
    const lastDisplayId = await getLastDisplayId();
    return (
        <main className="py-10 px-5">
            <ProjectsContainer projectList={projectList} lastDisplayId={lastDisplayId} />
            <CreateProjectBtn />
        </main>
    )
}

export default admin;