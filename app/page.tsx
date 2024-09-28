
import HeadContainer from "@/components/HomePage/HeadContainer";
import AllProjectsContainer from "@/components/HomePage/AllProjectsContainer";
import FeatureProjectsContainer from "@/components/HomePage/FeatureProjectsContainer";
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
