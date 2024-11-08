
import HeadContainer from "@/app/_component/HeadContainer";
import AllProjectsContainer from "@/app/_component/AllProjectsContainer";
import FeatureProjectsContainer from "@/app/_component/FeatureProjectsContainer";
import { serverGetProjectsWithCovers } from "@/controllers/projects/get";

export default async function Home() {
   const projectList = await serverGetProjectsWithCovers();
   const featureProjects = [...projectList.filter((project: any) => project.is_feature_project === true)]
      .sort((a: any, b: any) => a.feature_id - b.feature_id);

   return (
      <main>
         <HeadContainer />
         <FeatureProjectsContainer featureProjects={featureProjects} />
         <AllProjectsContainer projectList={projectList} />
      </main>
   );
}
