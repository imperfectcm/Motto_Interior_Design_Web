// import { projectFormData } from "@/app/create-project/page";
// import { projectService } from "@/services/ProjectService";


// class ProjectController {

//     constructor() { }

//     async controllerApiTest() {
//         return projectService.apiTest();
//     }

//     async controllerPbTest() {
//         return projectService.pbTest();
//     }

//     async createProject(data: projectFormData) {

//         data.aboutProject ? data.aboutProject = "" : data.aboutProject = data.aboutProject;

//         const projectData = {
//             "name": data.projectName,
//             "year": data.year,
//             "location": data.location,
//             "apartment_name": data.apartmentName,
//             "size": data.size,
//             "household_size": data.householdSize,
//             "description": data.aboutProject
//         };

//         return await projectService.createProject(projectData);

//     }

// }

// export const projectController = new ProjectController();