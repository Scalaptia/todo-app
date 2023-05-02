import projectList from './modules/projectList';
import './styles/main.css';
import generatePage from './ui/pageUI';


console.log(projectList.projects);
projectList.addProject('Default');

generatePage();