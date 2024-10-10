
const getLastDisplayId = async () => {
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

export default getLastDisplayId;