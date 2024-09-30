import AllProjectCovers from "./AllProjectCovers";

interface AllProjectCoverContainerProps {
    projectList: any;
}

const AllProjectCoversContainer = (props: AllProjectCoverContainerProps) => {

    const projectList = props.projectList;

    return (
        <main>
            <AllProjectCovers projectList={projectList}/>
        </main>
    )
};

export default AllProjectCoversContainer;