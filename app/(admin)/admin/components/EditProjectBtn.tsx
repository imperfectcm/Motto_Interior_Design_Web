"use client";

import { usePathname, useRouter } from "next/navigation";

interface EditPorjectBtnProps {
    projectName: string;
}

const EditPorjectBtn = (props: EditPorjectBtnProps) => {
    const router = useRouter();
    const path = usePathname();
    const projectName = props.projectName;
    const toEditProjectPage = (projectName: string) => {
        router.push(`${path}/project/${projectName}`)
    }

    return (
        <button className="w-1/3 bg-neutral-400 hover:bg-sky-900 hover:duration-200 text-neutral-100 py-1 rounded-full cursor-pointer"
            onClick={() => toEditProjectPage(projectName)}>Edit</button>
    )
}

export default EditPorjectBtn;