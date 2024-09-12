
import HeadContainer from "@/components/homePage/HeadContainer";
import AllProjectsContainer from "@/components/homePage/AllProjectsContainer";
import FeatureProjectsContainer from "@/components/homePage/FeatureProjectsContainer";


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
