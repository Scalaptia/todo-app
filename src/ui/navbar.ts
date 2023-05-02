import '../styles/navbar.css';
import { createElement } from './pageUI';
import pageLoad from './pageLoad';
import logoSVG from '../assets/logo.svg';
import addSVG from '../assets/add.svg';
import deleteSVG from '../assets/delete.svg'
import allTasks from '../assets/inbox.svg';
import todayTasks from '../assets/today.svg';
import weekTasks from '../assets/week.svg';
import importantTasks from '../assets/important.svg'
import Modal from './modal';
import projectArray from '../modules/projectList';

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

const MenuList = () => {
    const container = createElement('div', 'menu-list')
        const ul = createElement('ul', 'menu-items');
        container.appendChild(ul);
    return {
        container
    }
}
const menuList = MenuList()

const ProjectList = () => {
    const container = createElement('div', 'project-list');

        const titleSection = createElement('div', 'add-section');
            const addBtnTitle = createElement('h3', 'add-btn-title');
            addBtnTitle.innerText = 'Materias'
            titleSection.appendChild(addBtnTitle);

            const addBtn = document.createElement('img');
            addBtn.classList.add('add-btn', 'btn');
            addBtn.src = addSVG
            addBtn.addEventListener('click', () => {Modal.projectModal()});
            titleSection.appendChild(addBtn);
        container.appendChild(titleSection)

        const ul = createElement('ul', 'projects');
        container.appendChild(ul);
        
    return {
        container
    }
}
const projectList = ProjectList()


const createNavBar = () => {
    const container = createElement('div', 'navbar');
        const sidebar = createElement('div', 'sidebar');
            sidebar.appendChild(menuList.container);
            sidebar.appendChild(projectList.container);

        container.appendChild(NavHeader());
        container.appendChild(sidebar);

    const createTab = (type: string, name: string, page: any, svg: string, id: number) => {
        const tab = createElement('div', 'tab');

            const nameContainer = createElement('div', 'tab-name-container');
                const tabSVG = document.createElement('img');
                tabSVG.classList.add('tab-image');
                tabSVG.src = svg
        
                const tabName = createElement('li', `tab-name`);
                tabName.textContent = name;
            nameContainer.appendChild(tabSVG);
            nameContainer.appendChild(tabName);

            const buttonsContainer = createElement('div', 'tab-buttons-container');
                const tabDelete = document.createElement('img');
                tabDelete.classList.add('tab-delete', 'btn');
                tabDelete.src = deleteSVG;

                tabDelete.addEventListener('click', () => {
                    const targetProject = projectArray.projects.filter(obj => obj.projectID === id);
                    projectArray.removeProject(targetProject[0])
                });
            buttonsContainer.appendChild(tabDelete);
        
        tab.appendChild(nameContainer);

        if (type === 'project') {
            tab.appendChild(buttonsContainer);
        }
            
        tab.addEventListener('click', () => {
            const menuElements = menuList.container?.children;
            const projectElements = projectList.container?.children;
    
            for (let i = 0; i < menuElements!.length; i++) {
                const item: any = menuElements![i];
                item.dataset.selected = 'false'
            }
    
            for (let i = 0; i < projectElements!.length; i++) {
                const item: any = projectElements![i];
                item.dataset.selected = 'false'
            }
        
            tab.dataset.selected = 'true'
            pageLoad(page);
        });

        tab.dataset.selected = 'false';
    
        switch (type) {
            case 'menu':
                menuList.container.appendChild(tab);
                break;
            case 'project':
                tab.dataset.projectid = `${id}`
                projectList.container.insertBefore(tab, projectList.container.children[1]);
                break;
            default:
                throw 'Tab is not of type Task of Project'
        }
    }

    const removeTab = (type: string, id: number) => {
        switch (type) {
            case 'menu':
                break;
            case 'project':
                const targetProject = projectList.container.querySelector(`[data-projectid="${id}"]`)
                projectList.container.removeChild(targetProject!);
                break;
            default:
                break;
        }
    }

    return {
        container,
        createTab,
        removeTab,
    };
}

export const navbar = createNavBar()

navbar.createTab('menu', 'Todos', '/', allTasks, 0);
navbar.createTab('menu', 'Hoy', '/', todayTasks, 0);
navbar.createTab('menu', 'Semana', '/', weekTasks, 0);
navbar.createTab('menu', 'Importantes', '/', importantTasks, 0);