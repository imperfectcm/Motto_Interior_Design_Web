
const getFeatureProjectCovers = async () => {
    try {
        const res = await fetch(`${process.env.WEB_URL}/api/feature-cover-images`, { cache: 'no-store' })
        if (!res.ok) {
            return ({ message: "Get feature project covers failed" })
        }
        const data = await res.json();
        return data.data || [];
    } catch (error: any) {
        console.log(error)
        return [];
    }
}

export default getFeatureProjectCovers;