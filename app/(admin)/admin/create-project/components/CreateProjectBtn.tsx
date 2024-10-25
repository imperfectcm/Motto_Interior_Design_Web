"use client";

import ActionLoading from "@/components/actionLoading/ActionLoading";

interface CreateProjectBtnProps {
    isSubmitting: boolean;
}

export function CreateProjectBtn(props: CreateProjectBtnProps) {
    let isSubmitting = props.isSubmitting

    return (
        isSubmitting ?
            <ActionLoading />
            :
            <div className="mt-5 flex justify-center items-center">
                <button className="beige-neumor-btn rounded-full px-8 py-2" disabled={isSubmitting} type="submit">
                    Create Project
                </button>
            </div >
    )
}
