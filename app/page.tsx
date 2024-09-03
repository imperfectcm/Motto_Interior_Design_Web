
import HeadContainer from "@/components/HomePage/HeadContainer";
import AllProjectsContainer from "@/components/HomePage/AllProjectsContainer";
import FeatureProjectsContainer from "@/components/HomePage/FeatureProjectsContainer";
import UploadImageTest from "@/components/utils/uploadImageToS3/UploadImageTest";


export default async function Home() {

   return (
      <main>
         <HeadContainer />
         <AllProjectsContainer />
         <FeatureProjectsContainer />
         <UploadImageTest />
         Motto Interior Design
      </main>
   );
}
