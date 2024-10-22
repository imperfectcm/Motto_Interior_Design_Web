
import CreateProjectForm from "@/app/(admin)/admin/create-project/components/CreateProjectForm";
import { getLastDisplayId } from "@/controllers/projects/get";

const CreateProject = async () => {
    const lastDisplayId = await getLastDisplayId();
    return <CreateProjectForm lastDisplayId={lastDisplayId} />
}

export default CreateProject;