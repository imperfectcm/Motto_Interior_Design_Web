
export const serverGetProjectsWithCovers = async () => {
    try {
        const res = await fetch(`${process.env.WEB_URL}/api/all-projects-with-covers`, {
            cache: 'no-store',
            next: {
                tags: ['create-project', 'update-project'],
            },
        })
        if (!res.ok) return ({ message: "Failed to get project cover images." })
        const data = await res.json();
        return data.data || [];
    } catch (error: any) {
        console.log(error.message);
        return [];
    }
}


export const getLastDisplayId = async () => {
    try {
        const res = await fetch(`${process.env.WEB_URL}/api/last-display-id`, { cache: 'no-store' })
        if (!res.ok) {
            const response = await res.json();
            return response.message;
        }
        const data = await res.json();
        return data.data || [];
    } catch (error: any) {
        console.log(error.message);
        return null;
    }
}


export const getProjectByName = async (projectName: string) => {
    try {
        const res = await fetch(`${process.env.WEB_URL}/api/project?projectName=${projectName}`, { cache: 'no-store' });
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