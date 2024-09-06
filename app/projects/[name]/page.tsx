import { ScrollEffect } from "@/components/ScrollEffect";
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
            <ScrollEffect/>
        </div>
    );
}