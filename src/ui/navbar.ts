import '../styles/navbar.css';
import { createElement } from './pageUI';
import pageLoad from './pageLoad';
import logoSVG from '../assets/logo.svg';
import addSVG from '../assets/add.svg';
import allTasks from '../assets/inbox.svg';
import todayTasks from '../assets/today.svg';
import weekTasks from '../assets/week.svg';
import importantTasks from '../assets/important.svg'
import projectIcon from '../assets/menu.svg'
import { modal } from './modal';

const NavHeader = () => {
    const navHeader = createElement('div', 'nav-header');

        const logo = document.createElement('img');
        logo.classList.add('nav-logo');
        logo.src = logoSVG
        navHeader.appendChild(logo);

        const title = createElement('h1', 'nav-title');
        title.innerText = 'Tareas';
        navHeader.appendChild(title);

        const toggleBtn = createElement('img', 'toggle-dark-btn');
        navHeader.appendChild(toggleBtn);

    return navHeader
}

const TaskList = () => {
    const container = createElement('div', 'task-list')
        const ul = createElement('ul', 'tasks');
        container.appendChild(ul);
    return {
        container
    }
}

const ProjectList = () => {
    const container = createElement('div', 'project-list');

        const titleSection = createElement('div', 'add-section');
            const addBtnTitle = createElement('h3', 'add-btn-title');
            addBtnTitle.innerText = 'Materias'
            titleSection.appendChild(addBtnTitle);

            const addBtn = document.createElement('img');
            addBtn.classList.add('add-btn', 'svg');
            addBtn.src = addSVG
            addBtn.addEventListener('click', () => {modal.projectModal()});
            titleSection.appendChild(addBtn);
        container.appendChild(titleSection)

        const ul = createElement('ul', 'projects');
        container.appendChild(ul);
        
    return {
        container
    }
}

const createNavBar = () => {
    const container = createElement('div', 'navbar');
        const sidebar = createElement('div', 'sidebar');
            const taskList = TaskList()
            sidebar.appendChild(taskList.container);
            const projectList = ProjectList()
            sidebar.appendChild(projectList.container);

        container.appendChild(NavHeader());
        container.appendChild(sidebar);

    const createTab = (type: string, name: string, page: any, svg: string) => {
        const tab = createElement('div', 'tab');
            const tabSVG = document.createElement('img');
            tabSVG.classList.add('tab-image');
            tabSVG.src = svg
    
            const tabName = createElement('li', `tab-name`);
            tabName.textContent = name;
    
        tab.addEventListener('click', () => {
            const taskElements = taskList.container?.children;
            const projectElements = projectList.container?.children;
    
            for (let i = 0; i < taskElements!.length; i++) {
                const item: any = taskElements![i];
                item.dataset.selected = 'false'
            }
    
            for (let i = 0; i < projectElements!.length; i++) {
                const item: any = projectElements![i];
                item.dataset.selected = 'false'
            }
        
            tab.dataset.selected = 'true'
            pageLoad(page);
        });

        tab.appendChild(tabSVG);
        tab.appendChild(tabName);
        tab.dataset.selected = 'false';
    
        switch (type) {
            case 'task':
                taskList.container.appendChild(tab);
                break;
            case 'project':
                projectList.container.appendChild(tab);
                break;
            default:
                throw 'Tab is not of type Task of Project'
        }
    }

    return {
        container,
        createTab
    };
}

export const navbar = createNavBar()

navbar.createTab('task', 'Todos', '/', allTasks);
navbar.createTab('task', 'Hoy', '/', todayTasks);
navbar.createTab('task', 'Semana', '/', weekTasks);
navbar.createTab('task', 'Importantes', '/', importantTasks);
navbar.createTab('project', 'School', '/', projectIcon);
navbar.createTab('project', 'Personal', '/', projectIcon);