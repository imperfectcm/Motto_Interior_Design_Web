
import HeadContainer from "@/components/HomePage/HeadContainer";
import ToAllProjectsPage from "../components/ToAllProjectsPage";
import AllProjectsContainer from "@/components/HomePage/AllProjectsContainer";
import FeatureProjects from "@/components/HomePage/FeatureProjects";


export default async function Home() {

  return (
    <main>
      <HeadContainer />
      <AllProjectsContainer />
      <FeatureProjects />
      Motto Interior Design
      <ToAllProjectsPage />
    </main>
  );
}
