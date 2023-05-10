import '../styles/navbar.css';
import { app, createElement } from './pageUI';
import logoSVG from '../assets/logo.svg';
import addSVG from '../assets/add.svg';
import deleteSVG from '../assets/delete.svg'
import Modal from './modal';
import projectArray from '../modules/projectList';
import menuArray from '../modules/menuList'
import display from './display';
import menuTasks from '../modules/menuTasks';

export function handleToggleNavbar() {
    if (screen.width <= 768) {
        app!.dataset.navbar === 'show' ? app!.dataset.navbar = 'hide' : app!.dataset.navbar = 'show';
    }
}

export default (() => {
    const navHeader = (() => {
        const container = createElement('div', 'nav-header');
    
            const logo = document.createElement('img');
            logo.classList.add('nav-logo');
            logo.src = logoSVG;
            logo.addEventListener('click', handleToggleNavbar);

            container.appendChild(logo);
    
            const title = createElement('h1', 'nav-title');
            title.innerText = 'TodoApp';
            container.appendChild(title);
    
            const toggleBtn = createElement('img', 'toggle-dark-btn');
            container.appendChild(toggleBtn);
    
        return container;
    })() 
    

    const menuList = (() => {
        const container = createElement('div', 'menu-list');
        return container;
    })()
    

    const projectList = (() => {
        const container = createElement('div', 'project-list');
            const titleSection = createElement('div', 'add-project-section');
                const addBtnTitle = createElement('h3', 'add-btn-title');
                addBtnTitle.innerText = 'Projects';
                titleSection.appendChild(addBtnTitle);
    
                const addBtn = document.createElement('img');
                addBtn.classList.add('add-btn', 'btn');
                addBtn.src = addSVG;
                addBtn.addEventListener('click', () => {Modal.projectModal()});
                titleSection.appendChild(addBtn);
            container.appendChild(titleSection);
        return container;
    })()
    
    
    const sidebar = (() => {
        const container = createElement('div', 'navbar');
            const sidebar = createElement('div', 'sidebar');
                sidebar.appendChild(menuList);
                sidebar.appendChild(projectList);
    
        container.appendChild(navHeader);
        container.appendChild(sidebar);
    
        return container;
    })()

    
    function createTab (type: string, name: string, svg: string, id: number) {
        const tab = createElement('div', 'tab');

            const nameContainer = createElement('div', 'tab-name-container');
                const tabSVG = document.createElement('img');
                tabSVG.classList.add('tab-image');
                tabSVG.src = svg;
        
                const tabName = createElement('p', `tab-name`);
                tabName.textContent = name;
            nameContainer.appendChild(tabSVG);
            nameContainer.appendChild(tabName);

            const buttonsContainer = createElement('div', 'tab-buttons-container');
                const tabDelete = document.createElement('img');
                tabDelete.classList.add('tab-delete', 'btn');
                tabDelete.src = deleteSVG;

                tabDelete.addEventListener('click', () => {
                    const targetProject = projectArray.projects.filter(obj => obj.id === id);
                    projectArray.removeProject(targetProject[0]);
                });
            buttonsContainer.appendChild(tabDelete);
        
        tab.appendChild(nameContainer);

        if (type === 'project') {
            tab.appendChild(buttonsContainer);
        }
            
        tab.addEventListener('click', () => {
            const menuElements = menuList?.children;
            const projectElements = projectList?.children;
    
            // Set all tabs to not-selected
            for (let i = 0; i < menuElements!.length; i++) {
                const item: any = menuElements![i];
                item.dataset.selected = 'false';
            }
    
            for (let i = 0; i < projectElements!.length; i++) {
                const item: any = projectElements![i];
                item.dataset.selected = 'false';
            }

            // Set selected tab object to selected
            switch (type) {
                case 'menu':
                    const targetItem = menuArray.items.filter(obj => obj.id === id);
                    menuTasks(targetItem[0]);
                    display.displayTasks(targetItem[0]);
                    break;
                case 'project':
                    const targetProject = projectArray.projects.filter(obj => obj.id === id);
                    display.displayTasks(targetProject[0]);
                    break;
            }

            handleToggleNavbar();
            tab.dataset.selected = 'true';
        });

        tab.dataset.selected = 'false'; // Default to not-selected
    
        switch (type) {
            case 'menu':
                tab.dataset.menuid = `${id}`
                menuList.appendChild(tab);
                break;
            case 'project':
                tab.dataset.projectid = `${id}`;
                projectList.insertBefore(tab, projectList.children[1]);
                break;
        }
    }

    function removeTab (type: string, id: number) {
        switch (type) {
            case 'menu':
                throw 'Cannot remove menu item';
            case 'project':
                const targetProject = projectList.querySelector(`[data-projectid="${id}"]`);
                projectList.removeChild(targetProject!);
                break;
        }
    }

    return {
        sidebar,
        createTab,
        removeTab,
    };
})()