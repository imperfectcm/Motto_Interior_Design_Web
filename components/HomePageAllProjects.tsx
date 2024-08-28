
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

const importAll = (context: any) => context.keys().map((key: any) => context(key).default);

const imageListByRPA = importAll(require.context('./../public/hardCodeImages/Project Chronology/', false, /\.(?:jpg|jpeg|png|gif|webp)$/));

<RowsPhotoAlbum photos={imageListByRPA} />

import { promises as fs } from 'fs';

const imageList = async () => {
    const files: string[] = await fs.readdir('./public/hardCodeImages/Project Chronology/', 'utf8');
    return (files);
}


export default async function HomePageAllProjects() {

    const imgFolder = "/hardCodeImages/Project Chronology/"

    return (
        <section className="h-screen w-full grid grid-cols-8 grid-rows-5 ">\
            <div className="col-start-2 col-span-6 row-start-2 row-span-3 gap-x-6 flex overflow-auto snap-x snap-mandatory">
                {imageList().then((images) => {
                    return images.map((image: string) => <img className="homepage-cover-img object-container snap-always snap-center" src={`${imgFolder}${image}`} alt="Main Page All Project Cover Images" />);
                })}
            </div>
        </section>
    )
}