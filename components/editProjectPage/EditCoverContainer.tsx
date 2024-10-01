import { Dispatch, SetStateAction } from "react";
import { ImageListType } from "react-images-uploading";
import CoverImageUploader from "../utils/uploadImageToS3/CoverImageUploader";
import CoverImageDisplayer from "../utils/CoverImageDisplayer";


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
            <CoverImageDisplayer
                coverImages={props.coverImages}
                editCover={editCover} />
    )
}

export default EditCoverContainer;