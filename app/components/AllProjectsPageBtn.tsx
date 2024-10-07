'use client'

import { useRouter } from "next/navigation"

export default function AllProjectsPageBtn() {
    const router = useRouter()
    const toProjectsPage = () => {
        router.push("projects")
      }

    return (
        <div className="row-start-6 col-start-4 col-span-2 flex justify-center items-center">
            <div className="beige-neumor-btn rounded-full px-10 py-4" onClick={toProjectsPage}>
                Discover All Projects
            </div>
        </div>
    )
}