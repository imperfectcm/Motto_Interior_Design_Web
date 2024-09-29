

const getProjectImages = async (projectId: number) => {
    try {

        const res = await fetch(`${process.env.WEB_URL}/api/project-images?projectId=${projectId}`);

        if (!res.ok) {
            const errorData = await res.json();
            return errorData.message;
        }

        const response = await res.json();
        const data = response.data;

        return data;
    } catch (error: any) {
        throw error;
    }
}

export default getProjectImages;