import projectList from './modules/projectList';
import './styles/main.css';
import generatePage from './ui/pageUI';


generatePage();

projectList.addProject('Default');

const defaultON = document.querySelector(`[data-projectid="1"]`) as HTMLElement
defaultON.dataset.selected = 'true'