import { Dispatch, SetStateAction } from "react";
import { ImageListType } from "react-images-uploading";
import ImageUploader from "../../../../../../components/s3Actions/upload/ImageUploader";


interface EditImageContainerProps {
    isEditImages: boolean;
    setIsEditImages: Dispatch<SetStateAction<boolean>>;
    images: ImageListType;
    setImages: Dispatch<SetStateAction<ImageListType>>;
}

const EditImageContainer = (props: EditImageContainerProps) => {

    const editImage = () => {
        props.setIsEditImages(true);
    }

    return (
        props.isEditImages ?
            <ImageUploader
                images={props.images}
                setImages={props.setImages} />
            :
            <section>
                <div className="grid grid-flow-row-dense grid-cols-3 gap-3">
                    <div className="col-span-full text-2xl">Project Images :</div>
                    {props.images.length > 0 &&
                        props.images.map((image: any, index) => (
                            <div key={index} className={`relative col-span-1 group overflow-hidden flex flex-col`}>
                                <img src={image.url} alt="Image" className="w-full object-contain object-top grow" />
                            </div>
                        ))
                    }
                </div>
                <span className="flex justify-center mt-5">
                    <button className="w-1/3 bg-neutral-400 hover:bg-sky-900 duration-200 text-neutral-100 py-1 rounded-full cursor-pointer" onClick={editImage}>Edit</button>
                </span>
            </section>
    )
}

export default EditImageContainer;