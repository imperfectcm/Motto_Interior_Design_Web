import MainPageHeadContainer from "@/components/MainPageHeadContainer";
import ToAllProjectsPage from "../components/ToAllProjectsPage";
import HomePageAllProjects from "@/components/HomePageAllProjects";


export default async function Home() {

  return (
    <main>
      <MainPageHeadContainer />
      <HomePageAllProjects />
      Motto Interior Design
      <ToAllProjectsPage />
    </main>
  );
}
