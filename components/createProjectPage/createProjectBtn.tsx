"use client";

import { Dispatch, SetStateAction } from "react";


interface CreateProjectBtnProps {
    isUploading: boolean;
    setIsUploading: Dispatch<SetStateAction<boolean>>
}


export function CreateProjectBtn(props: CreateProjectBtnProps) {

    return (
        <div className="mt-5 flex justify-center items-center">
            <button className="beige-neumor-btn rounded-full px-8 py-2" disabled={props.isUploading} type="submit" onClick={() => props.setIsUploading(true)}>
                {props.isUploading ? "Uploading..." : "Create Project"}
            </button>
        </div >
    )
}
