
import { serverGetProjectsWithCovers } from "@/controllers/projects/get";
import { ProjectGallery } from "./_component/ProjectGallery";
import { HomepageBtn } from "./_component/HomepageBtn";

export default async function AllProjects() {
    const projectList = await serverGetProjectsWithCovers();
    return (
        <main className="p-5">
            <ProjectGallery projectList={projectList} />
            <HomepageBtn />
        </main>
    )
}