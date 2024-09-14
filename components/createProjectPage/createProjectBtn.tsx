"use client";

import { Dispatch, SetStateAction } from "react";


interface CreateProjectBtnProps {
    btnContent: string;
    setIsUploading: Dispatch<SetStateAction<boolean>>
}


export function CreateProjectBtn(props: CreateProjectBtnProps) {

    return (
        <div className="mt-5 flex justify-center items-center">
            <button className="beige-neumor-btn rounded-full px-8 py-2" type="submit" onClick={() => props.setIsUploading(true)}>
                {props.btnContent}
            </button>
        </div >
    )
}
