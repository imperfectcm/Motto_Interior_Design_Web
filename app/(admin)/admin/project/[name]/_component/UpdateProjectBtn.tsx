"use client";

import ActionLoading from "@/components/actionLoading/ActionLoading";

interface CreateProjectBtnProps {
    isSubmitting: boolean;
}

export function UpdateProjectBtn(props: CreateProjectBtnProps) {
    let isSubmitting = props.isSubmitting
    return (
        isSubmitting ?
            <ActionLoading />
            :
            <div className="mt-5 flex justify-center items-center">
                <button className="beige-neumor-btn rounded-full px-8 py-2" disabled={isSubmitting} type="submit">
                    Update Project
                </button>
            </div >
    )
}