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

const createTab = (name: string, page: any, svg: string) => {
    const tab = createElement('div', 'tab');
        
        const tabSVG = document.createElement('img');
        tabSVG.classList.add('tab-image');
        tabSVG.src = svg

        const tabName = createElement('li', `tab-name`);
        tabName.textContent = name;

    tab.addEventListener('click', () => {
        pageLoad(page);
    });
    tab.appendChild(tabSVG);
    tab.appendChild(tabName);

    return tab;
}

const Header = () => {
    const navHeader = createElement('div', 'nav-header');

        const logo = document.createElement('img');
        logo.classList.add('nav-logo');
        logo.src = logoSVG
        navHeader.appendChild(logo);

        const title = createElement('h1', 'nav-title');
        title.innerText = 'Todo App';
        navHeader.appendChild(title);

        const toggleBtn = createElement('img', 'toggle-dark-btn');
        navHeader.appendChild(toggleBtn);

    return navHeader
}

const TaskList = () => {
    const container = createElement('div', 'task-list')
        const ul = createElement('ul', 'tasks');
            ul.appendChild(createTab('All-Tasks', '/#', allTasks));
            ul.appendChild(createTab('Today', '/#', todayTasks));
            ul.appendChild(createTab('Week', '/#', weekTasks));
            ul.appendChild(createTab('Important', '/#', importantTasks));
        container.appendChild(ul);
    return container;
}

const ProjectList = () => {
    const container = createElement('div', 'project-list');

        const titleSection = createElement('div', 'add-section');
            const addBtnTitle = createElement('h3', 'add-btn-title');
            addBtnTitle.innerText = 'Projects'
            titleSection.appendChild(addBtnTitle);

            const addBtn = document.createElement('img');
            addBtn.classList.add('add-btn', 'svg');
            addBtn.src = addSVG
            titleSection.appendChild(addBtn);
        container.appendChild(titleSection)

        const ul = createElement('ul', 'projects');
            ul.appendChild(createTab('School', '/#', projectIcon));
            ul.appendChild(createTab('Personal', '/#', projectIcon));
        container.appendChild(ul);

    return container;
}

export const NavBar = () => {
    const navbar = createElement('div', 'navbar');
        
        const sidebar = createElement('div', 'sidebar');
            sidebar.appendChild(TaskList());
            sidebar.appendChild(ProjectList());

        navbar.appendChild(Header());
        navbar.appendChild(sidebar);

    return navbar;
}