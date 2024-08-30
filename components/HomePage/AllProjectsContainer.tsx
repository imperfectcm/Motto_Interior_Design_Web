
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import AllProjects from "./AllProjects";

const importAll = (context: any) => context.keys().map((key: any) => context(key).default);
const imageListByRPA = importAll(require.context('./../../public/hardCodeImages/Project Chronology/', false, /\.(?:jpg|jpeg|png|gif|webp)$/));
<RowsPhotoAlbum photos={imageListByRPA} />


import { promises as fs } from 'fs';
import ToAllProjectsPageBtn from "./ToAllProjectsPageBtn";

const imgFolder = "/hardCodeImages/Project Chronology/"

const imageList = async () => {
    const files: string[] = await fs.readdir('./public/hardCodeImages/Project Chronology/', 'utf8');
    return (files);
}

const images: Promise<JSX.Element[]> = imageList().then((images) => {
    return images.map((image: string, index: number) =>
        <img className="object-cover w-1/3 aspect-[3/4] snap-always snap-center"
            id={`${index}`}
            src={`${imgFolder}${image}`}
            loading="lazy"
            alt="Home Page All Project Cover Images" />
    );
})


export default async function AllProjectsContainer() {

    return (
        <section className="homepage-cover-img-box h-screen w-full grid grid-cols-8 grid-rows-5">
            <AllProjects images={images} />
            <ToAllProjectsPageBtn />
        </section>
    )

}