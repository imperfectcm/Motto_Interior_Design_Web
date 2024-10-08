'use server';

import { s3Client } from "nodejs-s3-typescript";

const s3Config = {
    bucketName: process.env.AWS_S3_BUCKET_NAME as string,
    region: process.env.AWS_S3_REGION as string,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string
};

export async function deleteImageFromS3(projectKey: string) {
    try {
        if (!projectKey) {
            return ({ message: "No image to delete." })
        }
        const s3 = new s3Client({
            ...s3Config,
        });
        await s3.deleteFile(projectKey);
        console.log('File deleted');
        return { message: 'Image deleted successfully' };
    } catch (error: any) {
        console.log(error);
        throw error;
    }
}