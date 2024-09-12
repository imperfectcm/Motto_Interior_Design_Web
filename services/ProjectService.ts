
import { authService, pb, POCKET_BASE_URL } from './AuthService';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

class ProjectService {

    constructor() { }

    async pbTest() {
        // you can also fetch all records at once via getFullList
        const records = await pb.collection('posts').getFullList({
            sort: '-created',
        });
        return records;
    }

    async apiTest() {
        let res = await fetch(`${POCKET_BASE_URL}/api/collections/posts/records`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        if (!res) return { data: "no res" };
        const data = await res.json();
        return data;
    }

    async getAllProjectsCover() {

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


    async uploadImagesToDB(projectName: string, imageUrlList: string[], cookies: ReadonlyRequestCookies) {
        const pbAuthData = authService.getUser(cookies);

        console.log("projectService imageUrlList: ", imageUrlList)
        
        const imagesData = imageUrlList.map((imageUrl) => {
            let sequence: number = 0
            sequence += 1;
            return {
                "image_url": imageUrl,
                "name": projectName,
                "url": imageUrl,
                "sequence": sequence,
                "is_cover": false,
                "cover_id": null
            }
        })

        try {
            const record = await pb.collection('images').create(imagesData);
            return record;
        } catch (error: any) {
            console.log(error.message);
            return { error: error.message };
        }
    }

}

export const projectService = new ProjectService;