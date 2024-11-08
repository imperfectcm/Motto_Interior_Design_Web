export const dynamic = "force-dynamic";

export const getFeatureProjectCovers = async () => {
    try {
        const res = await fetch(`${process.env.WEB_URL}/api/feature-cover-images`, { cache: 'no-cache' })
        if (!res.ok) {
            return ({ message: "Get feature project covers failed" })
        }
        const data = await res.json();
        return data.data || [];
    } catch (error: any) {
        console.log(error.message)
        return [];
    }
}

export const getProjectImages = async (projectId: string) => {
    try {
        const res = await fetch(`${process.env.WEB_URL}/api/project-images?projectId=${projectId}`, { cache: 'no-cache' });
        if (!res.ok) {
            const errorData = await res.json();
            return errorData.message;
        }
        const response = await res.json();
        const data = response.data;
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}