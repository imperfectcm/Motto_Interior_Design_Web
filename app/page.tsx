import HomePageAllProjects from "@/componants/HomePageAllProjects";
import ToAllProjectsPage from "./../componants/ToAllProjectsPage";


export default async function Home() {

  return (
    <main>
      Motto Interior Design
      <ToAllProjectsPage />
      <HomePageAllProjects />
    </main>
  );
}
