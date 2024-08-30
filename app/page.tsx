
import HeadContainer from "@/components/HomePage/HeadContainer";
import ToAllProjectsPage from "../components/ToAllProjectsPage";
import AllProjectsContainer from "@/components/HomePage/AllProjectsContainer";
import FeatureProjectsContainer from "@/components/HomePage/FeatureProjectsContainer";


export default async function Home() {

  return (
    <main>
      <HeadContainer />
      <AllProjectsContainer />
      <FeatureProjectsContainer />
      Motto Interior Design
    </main>
  );
}
