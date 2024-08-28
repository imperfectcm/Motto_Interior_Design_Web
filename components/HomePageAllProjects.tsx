
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

const importAll = (context: any) => context.keys().map((key: any) => context(key).default);

const imageListByRPA = importAll(require.context('./../public/hardCodeImages/Project Chronology/', false, /\.(?:jpg|jpeg|png|gif|webp)$/));

import { promises as fs } from 'fs';

const imageList = async () => {
    const files: string[] = await fs.readdir('./public/hardCodeImages/Project Chronology/', 'utf8');
    return (files);
}


export default async function HomePageAllProjects() {
    const imgFolder = "/hardCodeImages/Project Chronology/"

    imageList().then((files) => {
        const displayImages = files.map((image: string) => `<img className="object-cover w-2/5" src={\`${imgFolder}${image}\`} alt="Main Page Cover Image" />`);

        console.log(displayImages);
    }).catch((error) => {
        console.error('Error: ', error);
    });

    return (
        <>
            {imageList().then((images) => {
                return images.map((image: string) => <img className="object-cover" src={`${imgFolder}${image}`} alt="Main Page Cover Image" />);
            })}
            <img className="object-cover w-2/5" src={`${imgFolder}00 cover.jpg`} alt="Main Page Cover Image" />
            <RowsPhotoAlbum photos={imageListByRPA} />
        </>
    )
}