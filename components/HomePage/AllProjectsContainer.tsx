
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
        <div className="col-span-2 aspect-[3/4] snap-always snap-center">
            <img className="object-cover aspect-[3/4] scale-90 hover:scale-100 duration-100 cursor-pointer"
                id={`${index}`}
                src={`${imgFolder}${image}`}
                loading="lazy"
                alt="Home Page All Project Cover Images" />
        </div>
    );
})


export default async function AllProjectsContainer() {

    return (
        <section className="relative homepage-cover-img-box h-screen w-full grid grid-cols-8 grid-rows-7">
            <AllProjects images={images} />
            <ToAllProjectsPageBtn />
        </section>
    )

}