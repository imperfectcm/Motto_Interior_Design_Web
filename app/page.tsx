
import HeadContainer from "@/app/components/HeadContainer";
import AllProjectsContainer from "@/app/components/AllProjectsContainer";
import FeatureProjectsContainer from "@/app/components/FeatureProjectsContainer";
import getAllProjectCovers from "@/components/getProjects/getAllProjectsWithCovers";
import getAllProjectsWithCovers from "@/components/getProjects/getAllProjectsWithCovers";

export default async function Home() {
   const projectList = await getAllProjectsWithCovers();
   const featureProjects = projectList.filter((project: any) => project.is_feature_project === true);

   return (
      <main>
         <HeadContainer />
         <FeatureProjectsContainer featureProjects={featureProjects} />
         <AllProjectsContainer projectList={projectList} />
      </main>
   );
}
