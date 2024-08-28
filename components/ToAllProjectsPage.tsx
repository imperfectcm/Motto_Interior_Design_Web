'use client'

import React from "react";
import { useRouter } from "next/navigation";

export default function ToAllProjectsPage() {
    const router = useRouter();

    const toProjectsPage = () => {
        router.push("/projects");
    };
    
    return (
        <div onClick={toProjectsPage}>Go to projects page</div>
    )
}