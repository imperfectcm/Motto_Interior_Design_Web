
import { authService, pb, POCKET_BASE_URL } from './AuthService';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

class ProjectService {

    constructor() { }


    async getAllProjectsInfo() {
        try {
            const resultList = await pb.collection('projects').getFullList({
                sort: '-created',
            });
            return { data: resultList, success: true };
        } catch (error: any) {
            return { error: error.message };
        }
    }


    async getNonFeatureProjectsInfo() {
        try {
            const resultList = await pb.collection('projects').getFullList({
                filter: 'is_feature_project = false',
                sort: '-created',
            });

            return resultList;
        } catch (error: any) {
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
            return { error: error.message };
        }
    }


    async getProjectInfoByName(projectName: string) {
        try {
            const resultList = await pb.collection('projects').getFirstListItem(`name="${projectName}"`);

            return resultList;
        } catch (error: any) {
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
            return { error: error.message };
        }
    }


    async getProjectImages(projectId: string) {
        try {
            const resultList = await pb.collection('images').getFullList({
                filter: `name = "${projectId}" && is_cover = false`,
                sort: '+sequence',
            });
            return resultList;
        } catch (error: any) {
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
            return { error: error.message };
        }
    }

    async updateProjectById(projectData: any, projectId: string, cookies: ReadonlyRequestCookies) {
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
            const record = await pb.collection('projects').update(projectId, data);
            return record;
        } catch (error: any) {
            return { error: error.message };
        }
    }

    async deleteProjectById(projectId: string, cookies: ReadonlyRequestCookies) {
        const pbAuthData = authService.getUser(cookies);
        try {
            await pb.collection('projects').delete(projectId);
            return { success: true };
        } catch (error: any) {
            return { error: error.message, success: false };
        }
    }

    async uploadCoverImagesToDB(projectId: string, coverImageUrl: string, coverKey: string, sequence: number, coverId: number, cookies: ReadonlyRequestCookies) {
        const pbAuthData = authService.getUser(cookies);
        const imageData = {
            "name": projectId,
            "url": coverImageUrl,
            "sequence": sequence,
            "is_cover": true,
            "cover_id": coverId,
            "key": coverKey,
        }
        try {
            const record = await pb.collection('images').create(imageData, { requestKey: null });
            return record;
        } catch (error: any) {
            return { error: error.message };
        }
    }

    async deleteImageFromDB(imageId: string, cookies: ReadonlyRequestCookies) {
        const pbAuthData = authService.getUser(cookies);

        try {
            await pb.collection('images').delete(imageId, { requestKey: null });
            return true;
        } catch (error: any) {
            return { error: error.message };
        }

    }


    async uploadImagesToDB(projectId: string, imageUrl: string, imageKey: string, sequence: number, cookies: ReadonlyRequestCookies) {
        const pbAuthData = authService.getUser(cookies);

        const imageData = {
            "name": projectId,
            "url": imageUrl,
            "sequence": sequence,
            "is_cover": false,
            "key": imageKey,
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