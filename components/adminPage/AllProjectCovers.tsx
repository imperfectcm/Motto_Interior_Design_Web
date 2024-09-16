



const getAllProjectCovers = async () => {

    try {
        const res = await fetch(`${process.env.WEB_URL}/api/all-cover-images`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (!res.ok) {
            return ({ message: "Failed to get project cover images." })
        }

        const data = await res.json();

        console.log("Project List: " + data)
        return data.data || [];

    } catch (error: any) {
        console.log(error)
        return [];
    }

}
const AllProjectCovers = async () => {

    const coverList = await getAllProjectCovers();

    console.log("coverList: ", coverList)

    return (
        <section className="grid grid-flow-row-dense grid-cols-3 gap-3 py-10">
            {coverList?.length > 0 && coverList.map((project: any, index: number) => (
                <div key={index} className="flex flex-col place-items-center">
                    <img src={project.cover[0].url} alt={`Cover of project ${project.name}`} className="aspect-[3/4] grow" />
                    <div className="flex-wrap text-xl">Name: {project.name}</div>
                    <div className="flex-wrap">Size: {project.size} sq. ft.</div>
                    <div className="flex justify-center w-full">
                        <button className="w-1/3 bg-neutral-400 hover:bg-teal-700 hover:duration-200 text-neutral-100 py-1 rounded-full cursor-pointer">Edit</button>
                    </div>
                </div>
            ))}
        </section>
    )


};

export default AllProjectCovers;