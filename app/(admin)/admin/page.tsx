
import CreateProjectBtn from "@/app/(admin)/admin/components/CreateProjectBtn";
import ProjectsContainer from "./components/ProjectsContainer";
import { serverGetProjectsWithCovers } from "@/controllers/projects/get";
import AdminLogOutBtn from "./components/AdminLogOutBtn";

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