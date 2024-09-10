'use client';

import { usePathname, useRouter } from "next/navigation";

const CreateProjectBtn = () => {

    const router = useRouter()

    const pathname = usePathname()
    console.log("pathname: ", pathname)

    const toCreateProjectsPage = () => {
        router.push(`${pathname}/create-project`)
      }

    return (
        <div className="flex justify-center items-center">
            <div className="beige-neumor-btn rounded-full px-10 py-4" onClick={toCreateProjectsPage}>
                Create New Project
            </div>
        </div>
    )

}

export default CreateProjectBtn;