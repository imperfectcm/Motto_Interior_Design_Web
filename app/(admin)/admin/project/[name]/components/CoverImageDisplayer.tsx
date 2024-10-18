
import { ImageListType } from "react-images-uploading";

interface CoverImageDisplayerProps {
    coverImages: ImageListType
    editCover: () => void
}

const CoverImageDisplayer = (props: CoverImageDisplayerProps) => {
    const coverImages = props.coverImages;
    const editCover = props.editCover;

    return (
        <section>
            <div className="grid grid-flow-row-dense grid-cols-3 gap-3">
                <div className="col-span-full text-2xl">Project Cover Images :</div>
                {coverImages.length > 0 &&
                    coverImages.map((image: any, index) => (
                        <div key={index} className={`relative col-span-1 group overflow-hidden flex flex-col`}>
                            <img src={image.url} alt="Image" className="w-full object-contain object-top grow" />
                        </div>
                    ))
                }
            </div>
            <span className="flex justify-center mt-5">
                <button className="w-1/3 bg-neutral-400 hover:bg-sky-900 duration-200 text-neutral-100 py-1 rounded-full cursor-pointer" onClick={editCover}>Edit</button>
            </span>
        </section>
    );
}

export default CoverImageDisplayer;