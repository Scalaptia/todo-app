import './styles/main.css';
import display from './ui/display';
import generatePage from './ui/pageUI';
import menuArray from './modules/menuList'
import projectList from './modules/projectList';

generatePage();

export const localStorageProjects = JSON.parse(localStorage.getItem("myProjects")!);
export const localStorageProjectIDs = JSON.parse(localStorage.getItem("myProjectIDs")!);

if (localStorageProjects) {
    projectList.setProjects(localStorageProjects);
    console.log(projectList.projects)
    projectList.setProjectIDs(localStorageProjectIDs);
} else {
    projectList.addProject('Default');
}


// Set Default tab to All Tasks
const defaultTab = document.querySelector('.menu-list')?.children[0] as HTMLElement
defaultTab.dataset.selected = 'true'

const defaultObj = menuArray.items.filter(obj => obj.id === parseInt(defaultTab.dataset.menuid!));
display.displayTasks(defaultObj[0]);