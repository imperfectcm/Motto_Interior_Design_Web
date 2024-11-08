
import ProjectsContainer from "./_component/ProjectsContainer";
import { serverGetProjectsWithCovers } from "@/controllers/projects/get";
import AdminLogOutBtn from "./_component/AdminLogOutBtn";
import CreateProjectBtn from "./_component/CreateProjectBtn";

const admin = async () => {
    const projectList = await serverGetProjectsWithCovers();
    return (
        <main className="py-10 px-5">
            <ProjectsContainer projectList={projectList} />
            <CreateProjectBtn />
            <AdminLogOutBtn />
        </main>
    )
}

export default admin;