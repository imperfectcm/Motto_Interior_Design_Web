
export const serverGetProjectsWithCovers = async () => {
    try {
        const res = await fetch(`${process.env.WEB_URL}/api/all-projects-with-covers`, {
            cache: 'no-store',
        })
        if (!res.ok) return ({ message: "Failed to get project cover images." })
        const data = await res.json();
        console.log("data: ", data)
        return data.data || [];
    } catch (error: any) {
        console.log(error.message);
        return [];
    }
}

export const clientGetProjectsWithCovers = async () => {
    try {
        const res = await fetch("/api/all-projects-with-covers", {
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
    console.log("get projectName: ", projectName)
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
        throw new Error(error.message);
    }
}

export const getProjectByDisplayId = async (displayId: number) => {
    try {
        const res = await fetch(`${process.env.WEB_URL}/api/project-by-id?displayId=${displayId}`, { cache: 'no-store' });
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