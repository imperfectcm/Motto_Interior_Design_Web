'use client';

import { usePathname, useRouter } from "next/navigation";


const CreateProjectBtn = () => {
    const router = useRouter();
    const pathname = usePathname();
    const toCreateProjectPage = () => {
        router.push(`${pathname}/create-project`)
    }

    return (
        <div className="flex justify-center items-center">
            <div className="beige-neumor-btn rounded-full px-10 py-4" onClick={toCreateProjectPage}>
                Create New Project
            </div>
        </div>
    )
}

export default CreateProjectBtn;