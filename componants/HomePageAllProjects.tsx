
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

const importAll = (context: any) => context.keys().map((key: any) => context(key).default);

const imageList = importAll(require.context('./../hardCodeImages/Project Chronology/', false, /\.(?:jpg|jpeg|png|gif|webp)$/));

export default async function HomePageAllProjects() {
    console.log(imageList)

    return (
        <RowsPhotoAlbum photos={imageList} />
    )
}