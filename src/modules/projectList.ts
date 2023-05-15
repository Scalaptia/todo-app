import { Project, createProject } from "./projectFactory";
import projectIcon from '../assets/menu.svg'
import navbar from "../ui/navbar";

export default (() => {
    const projects: Project[] = [];
    let projectIDs = 0;

    function addProject(title: string) {
        if (title.length > 0) {
            navbar.createTab('project', title, projectIcon, projectIDs);
            let tempProject = createProject(title, projectIDs) ;
            projects.unshift(tempProject);
            projectIDs++;
        } else {
            throw new Error('Project title must contain at least 1 charater');
        }
    }

    function removeProject(project: Project) {
        if (projects.includes(project)) {
            navbar.removeTab('project', project.id)
            const index = projects.indexOf(project);
            projects.splice(index, 1);
        } else {
            throw new Error('Project does not exist within the projects array');
        }
    }

    return {
        projects,
        addProject,
        removeProject,
    }
})();