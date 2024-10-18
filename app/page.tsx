
import HeadContainer from "@/app/components/HeadContainer";
import AllProjectsContainer from "@/app/components/AllProjectsContainer";
import FeatureProjectsContainer from "@/app/components/FeatureProjectsContainer";
import { serverGetProjectsWithCovers } from "@/controllers/projects/get";

export default async function Home() {
   const projectList = await serverGetProjectsWithCovers();
   console.log("projectList: ", projectList)
   const featureProjects = projectList.filter((project: any) => project.is_feature_project === true);

   return (
      <main>
         <HeadContainer />
         <FeatureProjectsContainer featureProjects={featureProjects} />
         <AllProjectsContainer projectList={projectList} />
      </main>
   );
}
