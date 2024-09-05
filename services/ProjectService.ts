import PocketBase from 'pocketbase';
import { authService, pb, POCKET_BASE_URL } from './AuthService';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

class ProjectService {

    constructor() { }

    async pbTest() {
        // you can also fetch all records at once via getFullList
        const records = await pb.collection('posts').getFullList({
            sort: '-created',
        });
        console.log(records);
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
        console.log(data.items[0].value)
        return data;
    }

    async getAllProjectsCover() {

    }


    async createProject(projectData: any) {

        console.log(projectData);

        console.log("authStore: ", pb.authStore);

        console.log("is admin? ", pb.authStore.isAdmin);
        console.log("is valid? ", pb.authStore.isValid);
        console.log("token? ", pb.authStore.token);
        console.log("id? ", pb.authStore.model?.id);

        const data = {
            "name": "aa",
            "year": 2024,
            "location": "aa",
            "apartment_name": "aa",
            "size": 300,
            "household_size": 3,
            "description": ""
        };

        try {
            const record = await pb.collection('projects').create(data);
            console.log(record)
            return record;
        } catch (error: any) {
            console.log(error.message);
            return { error: error.message };
        }

    }

}

export const projectService = new ProjectService;