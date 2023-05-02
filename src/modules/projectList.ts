import { Project, createProject } from "./projectFactory";
import projectIcon from '../assets/menu.svg'
import { navbar } from "../ui/navbar";

export default (() => {
    const projects: Project[] = [];
    let projectIDs = 1;

    function addProject(title: string) {
        if (title.length > 0) {
            navbar.createTab('project', title, '/', projectIcon, projectIDs);
            projects.unshift(createProject(title, projectIDs));
            projectIDs++;
            console.log(projects)
        } else {
            throw 'Project title must contain at least 1 charater';
        }
    }

    function removeProject(project: Project) {
        if (projects.includes(project)) {
            navbar.removeTab('project', project.projectID)
            const index = projects.indexOf(project);
            projects.splice(index, 1);
            console.log(projects)
        } else {
            throw 'Project does not exist within the projects array';
        }
    }

    return {
        projects,
        addProject,
        removeProject,
    }
})();