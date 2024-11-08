"use server";

import { getLatestDisplayId } from "@/controllers/projects/get";
import CreateProjectForm from "./_component/CreateProjectForm";

const CreateProject = async () => {
    const lastDisplayId = await getLatestDisplayId();
    return (
        <CreateProjectForm lastDisplayId={lastDisplayId} />
    );
}

export default CreateProject;