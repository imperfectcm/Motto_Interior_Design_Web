
import { serverGetProjectsWithCovers } from "@/controllers/projects/get";
import { ProjectGallery } from "./components/ProjectGallery";
import { HomepageBtn } from "./components/HomepageBtn";

export default async function AllProjects() {
    const projectList = await serverGetProjectsWithCovers();
    return (
        <main className="p-5">
            <ProjectGallery projectList={projectList} />
            <HomepageBtn />
        </main>
    )
}