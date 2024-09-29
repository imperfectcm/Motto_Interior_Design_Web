
const getAllProjectCovers = async () => {

    try {
        const res = await fetch(`${process.env.WEB_URL}/api/all-cover-images`, { cache: 'no-store' })

        if (!res.ok) {
            return ({ message: "Failed to get project cover images." })
        }

        const data = await res.json();
        
        return data.data || [];

    } catch (error: any) {
        console.log(error)
        return [];
    }

}

export default getAllProjectCovers;