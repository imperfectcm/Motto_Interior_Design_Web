import { ScrollEffect } from "@/componants/ScrollEffect";
import React from "react";

interface ProjectDetailProps {
    params: {
        name: string;
    }
}

export default function ProjectDetail(props: ProjectDetailProps) {
    const projectName = props.params.name;

    return (
        <div>
            <h1>Project Name: {projectName}</h1>
            <ScrollEffect/>
        </div>
    );
}