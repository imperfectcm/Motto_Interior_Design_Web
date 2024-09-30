
import HeadContainer from "@/components/homePage/HeadContainer";
import AllProjectsContainer from "@/components/homePage/AllProjectsContainer";
import FeatureProjectsContainer from "@/components/homePage/FeatureProjectsContainer";
import getAllProjectCovers from "@/components/utils/GetAllProjectCover";


const getAllProjectInfo = async () => {
   return await getAllProjectCovers();
}


export default async function Home() {

   const projectList = await getAllProjectInfo();

   const featureProjects = projectList.filter((project: any) => project.is_feature_project === true);

   console.log("feature projects: ", featureProjects);


   return (
      <main>
         <HeadContainer />
         <FeatureProjectsContainer featureProjects={featureProjects} />
         <AllProjectsContainer projectList={projectList} />
      </main>
   );
}
