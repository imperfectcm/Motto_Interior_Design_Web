import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.BACKEND);

async () => {
    const authData = await pb.admins.authWithPassword('test@example.com', '1234567890');
}


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
        let res = await fetch(`${process.env.BACKEND}/api/collections/posts/records`,
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

}

export const projectService = new ProjectService;