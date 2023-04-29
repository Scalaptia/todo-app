import { Project, createProject } from "./projectFactory";

export default function projectList() {
    const projects = [
        createProject('Default'),
        createProject('Second Project')
    ];

    function addProject(project: Project) {
        if (project.title.length > 0) {
            projects.unshift(project);
        } else {
            throw 'Project title must contain at least 1 charater';
        }
    }

    function removeProject(project: Project) {
        if (projects.includes(project)) {
            const index = projects.indexOf(project);
            projects.splice(index, 1);
        } else {
            throw 'Project does not exist within the projects array';
        }
    }

    return {
        addProject,
        removeProject,
    }
}