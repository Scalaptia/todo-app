import { Project, createProject } from "./projectFactory";
import projectIcon from '../assets/menu.svg'
import navbar from "../ui/navbar";import { parseISO } from "date-fns";
;

export default (() => {
    let projects: Project[] = [];
    let projectIDs: number = 0;

    function setProjects(newProjects: Project[]) {
        newProjects.reverse().forEach((proj: Project) => {
            addProject(proj);
            proj.todoList.forEach((todo) => { if(typeof todo.dueDate === 'string') { todo.dueDate = parseISO(todo.dueDate) }});
        });
    }

    function setProjectIDs(newProjectIDs: number) {
        projectIDs = newProjectIDs;
    }

    function addProject(name: string | Project) {
        switch (typeof name) {
            case 'string':
                if (name.length > 0) {
                    navbar.createTab('project', name, projectIcon, projectIDs);
                    let tempProject = createProject(name, projectIDs);
                    projects.unshift(tempProject);
                    console.log(projectIDs)
                    projectIDs++;
                    updateLocalStorage();
                } else {
                    throw new Error('Project title must contain at least 1 charater');
                }

                break;
            default:
                if (name instanceof Object) {
                    navbar.createTab('project', name.title, projectIcon, name.id);
                    let tempProject = createProject(name.title, name.id, name.todoList);
                    projects.unshift(tempProject);
                    console.log(tempProject)
                    updateLocalStorage();
                }

                break;
          }
    }

    function removeProject(project: Project) {
        if (projects.includes(project)) {
            navbar.removeTab('project', project.id)
            const index = projects.indexOf(project);
            projects.splice(index, 1);
            updateLocalStorage();
        } else {
            throw new Error('Project does not exist within the projects array');
        }
    }

    function updateLocalStorage() {
        localStorage.setItem("myProjects", JSON.stringify(projects));
        localStorage.setItem("myProjectIDs", JSON.stringify(projectIDs));
    }

    return {
        projects,
        setProjects,
        setProjectIDs,
        addProject,
        removeProject,
        updateLocalStorage,
    }
})();