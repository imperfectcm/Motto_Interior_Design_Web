import getAllProjectCovers from "../utils/GetAllProjectCover";


const AllProjectCovers = async () => {

    const coverList = await getAllProjectCovers();

    return (
        <section className="grid grid-flow-row-dense grid-cols-3 gap-3 mb-10">
            {coverList?.length > 0 && coverList.map((project: any, index: number) => (
                <div key={index} className="flex flex-col place-items-center">
                    <img src={project.cover[0]?.url || "no-image.png"} alt={`Cover of project ${project.name}`} className="aspect-[3/4] grow object-cover" />
                    <div className="flex-wrap text-xl">Name: {project.name}</div>
                    <div className="flex-wrap">Size: {project.size} sq. ft.</div>
                    <div className="flex justify-center w-full">
                        <button className="w-1/3 bg-neutral-400 hover:bg-sky-900 hover:duration-200 text-neutral-100 py-1 rounded-full cursor-pointer">Edit</button>
                    </div>
                </div>
            ))}
        </section>
    )


};

export default AllProjectCovers;