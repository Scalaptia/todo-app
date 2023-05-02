import projectList from './modules/projectList';
import './styles/main.css';
import display from './ui/display';
import generatePage from './ui/pageUI';


generatePage();

projectList.addProject('Default');
const defaultTab = document.querySelector('.menu-list')?.children[0] as HTMLElement
defaultTab.dataset.selected = 'true'
display.updateHeader(defaultTab);

