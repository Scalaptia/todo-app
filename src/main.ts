import projectList from './modules/projectList';
import './styles/main.css';
import display from './ui/display';
import generatePage from './ui/pageUI';
import menuArray from './modules/menuList'

generatePage();

projectList.addProject('Default');

const defaultTab = document.querySelector('.menu-list')?.children[0] as HTMLElement
defaultTab.dataset.selected = 'true'

const defaultObj = menuArray.items.filter(obj => obj.id === parseInt(defaultTab.dataset.menuid!));
display.displayTasks(defaultObj[0]);

