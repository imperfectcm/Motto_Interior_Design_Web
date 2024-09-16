
import { authService, pb, POCKET_BASE_URL } from './AuthService';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

class ProjectService {

    constructor() { }


    async getAllProjectsInfo() {

        try {
            const resultList = await pb.collection('projects').getFullList({
                filter: 'is_feature_project = false',
                sort: '+created',
            });
            
            return resultList;
        } catch (error: any) {
            console.log(error.message);
            return { error: error.message };
        }

    }


    async getFeatureProjectsInfo() {

        try {
            const resultList = await pb.collection('projects').getFullList({
                filter: 'is_feature_project = true',
                sort: '+feature_id',
            });
            
            return resultList;
        } catch (error: any) {
            console.log(error.message);
            return { error: error.message };
        }

    }


    async getProjectInfoByName(projectName: string) {

        try {
            const resultList = await pb.collection('projects').getFullList({
                filter: `name = ${projectName}`,
                sort: '+feature_id',
            });
            
            return resultList;
        } catch (error: any) {
            console.log(error.message);
            return { error: error.message };
        }

    }


    async getProjectCover(projectId: string) {

        try {
            const resultList = await pb.collection('images').getFullList({
                filter: `name = "${projectId}" && is_cover = true`,
                sort: '+sequence',
            });
            return resultList;
        } catch (error: any) {
            console.log(error.message);
            return { error: error.message };
        }

    }


    async createProject(projectData: any, cookies: ReadonlyRequestCookies) {
        const pbAuthData = authService.getUser(cookies);

        const data = {
            "name": projectData.name,
            "year": projectData.year,
            "location": projectData.location,
            "apartment_name": projectData.apartment_name,
            "size": projectData.size,
            "household_size": projectData.household_size,
            "description": projectData.description
        };

        try {
            const record = await pb.collection('projects').create(data);
            return record;
        } catch (error: any) {
            console.log(error.message);
            return { error: error.message };
        }
    }


    async uploadCoverImagesToDB(projectId: string, coverImageUrl: string, sequence: number, coverId: number, cookies: ReadonlyRequestCookies) {
        const pbAuthData = authService.getUser(cookies);

        const imageData = {
            "name": projectId,
            "url": coverImageUrl,
            "sequence": sequence,
            "is_cover": true,
            "cover_id": coverId
        }

        try {
            const record = await pb.collection('images').create(imageData, { requestKey: null });
            return record;
        } catch (error: any) {
            console.log("Error: " + error.message);
            return { error: error.message };
        }

    }


    async uploadImagesToDB(projectId: string, imageUrl: string, sequence: number, cookies: ReadonlyRequestCookies) {
        const pbAuthData = authService.getUser(cookies);

        const imageData = {
            "name": projectId,
            "url": imageUrl,
            "sequence": sequence,
            "is_cover": false
        }

        try {
            const record = await pb.collection('images').create(imageData, { requestKey: null });
            return record;
        } catch (error: any) {
            console.log("Error: " + error.message);
            return { error: error.message };
        }

    }

}

export const projectService = new ProjectService;