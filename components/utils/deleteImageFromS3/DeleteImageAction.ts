'use server';

import { s3Client } from "nodejs-s3-typescript";


const s3Config = {
    bucketName: process.env.AWS_S3_BUCKET_NAME as string,
    region: process.env.AWS_S3_REGION as string,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string
};

export async function DeleteImageFromS3(formData: FormData) {

    try {

        const file = formData.get("file") as File;
        const folderName = formData.get("folderName") as string;

        if (!file) {
            return ({ message: "No image to upload." })
        }

        if (!folderName) {
            return ({ message: "No project name." })
        }

        const s3 = new s3Client({
            ...s3Config,
            dirName: folderName
        });

        const res = await s3.uploadFile(Buffer.from(await file.arrayBuffer()));
        return res.location;
    } catch (error: any) {
        return { message: error.message };
    }
}