
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import AllProjects from "./AllProjects";
import AllProjectsPageBtn from "./AllProjectsPageBtn";

const importAll = (context: any) => context.keys().map((key: any) => context(key).default);
const imageListByRPA = importAll(require.context('./../../public/hardCodeImages/Project Chronology/', false, /\.(?:jpg|jpeg|png|gif|webp)$/));
<RowsPhotoAlbum photos={imageListByRPA} />

interface AllProjectsContainerProps {
    projectList: any;
}

export default async function AllProjectsContainer(props: AllProjectsContainerProps) {
    const projectList = props.projectList;

    return (
        <section className="relative homepage-cover-img-box h-screen w-full grid grid-cols-8 grid-rows-7">
            <AllProjects projectList={projectList} />
            <AllProjectsPageBtn />
        </section>
    )
}