import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export class ProjectService {

    async pbTest() {
        // you can also fetch all records at once via getFullList
        const records = await pb.collection('posts').getFullList({
            sort: '-created',
        });
        console.log(records);
        return records;
    }

    async apiTest() {
        let res = await fetch('http://127.0.0.1:8090/api/collections/posts/records',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        if (!res) return { data: "no res" };
        const data = await res.json();
        console.log(data);
        return data;
    }

    async getAllProjectsCover() {

    }

}

export const projectService = new ProjectService;