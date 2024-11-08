
export const serverGetProjectsWithCovers = async () => {
    try {
        console.log("refresh the data now")
        const res = await fetch(`${process.env.WEB_URL}/api/all-projects-with-covers`, { cache: 'no-cache' })
        if (!res.ok) return ({ message: "Failed to get project with cover images." })
        const data = await res.json();
        return data.data;
    } catch (error: any) {
        console.log(error.message);
        return [];
    }
}

export const clientGetProjectsWithCovers = async () => {
    try {
        const res = await fetch("/api/all-projects-with-covers", { cache: 'no-cache' })
        if (!res.ok) return ({ message: "Failed to get project with cover images." })
        const data = await res.json();
        return data.data;
    } catch (error: any) {
        console.log(error.message);
        return [];
    }
}

export const clientGetAllProjects = async () => {
    try {
        const res = await fetch("/api/all-projects", { cache: 'no-cache', })
        if (!res.ok) return ({ message: "Failed to get projects" })
        const data = await res.json();
        return data.data;
    } catch (error: any) {
        console.log(error.message);
        return [];
    }
}

export const getLatestDisplayId = async () => {
    try {
        const res = await fetch(`${process.env.WEB_URL}/api/latest-display-id`, { cache: 'no-cache' });
        if (!res.ok) {
            const response = await res.json();
            return response.message;
        }
        const data = await res.json();
        return data.data;
    } catch (error: any) {
        console.log(error.message);
        return null;
    }
}

export const getProjectByName = async (projectName: string) => {
    try {
        const res = await fetch(`${process.env.WEB_URL}/api/project?projectName=${projectName}`, { cache: 'no-cache' });
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
        const res = await fetch(`${process.env.WEB_URL}/api/project-by-id?displayId=${displayId}`, { cache: 'no-cache' });
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