
const getAllProjectsWithCovers = async () => {
    try {
        const res = await fetch(`${process.env.WEB_URL}/api/all-projects-with-covers`, { cache: 'no-store' })
        if (!res.ok) return ({ message: "Failed to get project cover images." })
        const data = await res.json();
        return data.data || [];
    } catch (error: any) {
        console.log(error)
        return [];
    }
}

export default getAllProjectsWithCovers;