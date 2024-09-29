import { Dispatch, SetStateAction } from "react";
import { ImageListType } from "react-images-uploading";
import CoverImageUploader from "../utils/uploadImageToS3/CoverImageUploader";


interface EditCoverContainerProps {
    isEditCovers: boolean;
    setIsEditCovers: Dispatch<SetStateAction<boolean>>;
    coverImages: ImageListType;
    setCoverImages: Dispatch<SetStateAction<ImageListType>>;
}

const EditCoverContainer = (props: EditCoverContainerProps) => {

    const editCover = () => {
        props.setIsEditCovers(true);
    }

    return (
        props.isEditCovers ?
            <CoverImageUploader
                coverImages={props.coverImages}
                setCoverImages={props.setCoverImages} />
            :
            <section>
                <div className="grid grid-flow-row-dense grid-cols-3 gap-3">
                    <div className="col-span-full text-2xl">Project Cover Images :</div>
                    {props.coverImages.length > 0 &&
                        props.coverImages.map((image: any, index) => (
                            <div key={index} className={`relative col-span-1 group overflow-hidden flex flex-col`}>
                                <img src={image.url} alt="Image" className="w-full object-contain object-top grow" />
                            </div>
                        ))
                    }
                </div>
                {props.coverImages.length > 0 && <span className="flex justify-center mt-5">
                    <button className="w-1/3 bg-neutral-400 hover:bg-sky-900 hover:duration-200 text-neutral-100 py-1 rounded-full cursor-pointer" onClick={editCover}>Edit</button>
                </span>}
            </section>
    )
}

export default EditCoverContainer;