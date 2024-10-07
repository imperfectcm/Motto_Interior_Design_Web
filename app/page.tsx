
import HeadContainer from "@/components/homePage/HeadContainer";
import AllProjectsContainer from "@/components/homePage/AllProjectsContainer";
import FeatureProjectsContainer from "@/components/homePage/FeatureProjectsContainer";
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
         Motto Interior Design
      </main>
   );
}
