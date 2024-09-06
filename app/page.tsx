
import HeadContainer from "@/components/homePage/HeadContainer";
import AllProjectsContainer from "@/components/homePage/AllProjectsContainer";
import FeatureProjectsContainer from "@/components/homePage/FeatureProjectsContainer";
import ImageUploader from "@/components/utils/uploadImageToS3/ImageUploader";


export default async function Home() {

   return (
      <main>
         <HeadContainer />
         <AllProjectsContainer />
         <FeatureProjectsContainer />
         <ImageUploader />
         Motto Interior Design
      </main>
   );
}
