import { createElement } from "./pageUI"
import '../styles/display.css'
import { Project } from "../modules/projectFactory";
import { MenuItem } from "../modules/menuList";
import { Todo } from "../modules/todoFactory";
import modal from "./modal";
import addSVG from '../assets/add.svg'

function isProject(obj: any): obj is Project {
    return Array.isArray(obj.todoList);
}


const displayHeader = (() => {
    const header = createElement('div', 'display-header');
        const headerTab = createElement('div', 'header-tab');
        headerTab.innerHTML = `Select a Tab`
    header.appendChild(headerTab);

    function updateHeader(tab: HTMLElement | string) {
        if (typeof tab === 'string') {
            header.innerHTML = tab
        } else if (tab instanceof HTMLElement) {
            header.innerHTML = `${tab.children[0].innerHTML}`
        }
    }

    return {
        header,
        updateHeader
    }
})()

const createTaskEl = (todo: Todo) => {
    const container = createElement('div', 'task');
        const leftContainer = createElement('div', 'task-left');
            const taskTitle = createElement('div', 'task-title');
            taskTitle.innerText = todo.title;
        leftContainer.appendChild(taskTitle);

        const rightContainer = createElement('div', 'task-right');
            const taskDate = createElement('div', 'task-date')

            const taskPriority = createElement('div', 'task-priority');

        rightContainer.appendChild(taskDate);
        rightContainer.appendChild(taskPriority);

    return container
}

const addTaskBtn = (() => {
    const container = createElement('div', 'add-task-section');
        const addBtnTitle = createElement('h3', 'add-btn-title');
        addBtnTitle.innerText = 'Añadir Tarea'

        const addBtn = document.createElement('img');
        addBtn.classList.add('add-btn', 'btn');
        addBtn.src = addSVG
    
    container.addEventListener('click', () => {modal.taskModal()});
    container.appendChild(addBtn);
    container.appendChild(addBtnTitle);

    return container
})()

const tasksSection = (() => {
    const container = createElement('div', 'task-section');

    return container
})()


export default (() => {
    const container = createElement('div', 'display');
        const displayMain = createElement('div', 'display-tasks');
        

    container.appendChild(displayHeader.header);
    container.appendChild(displayMain);
    displayMain.appendChild(tasksSection)


    function displayTasks(tab: (Project | MenuItem)) {
        if (tab === undefined) {
            displayHeader.updateHeader('Select Tab')
        }

        const menuElements = document.querySelector('.menu-list');
        const projectElements = document.querySelector('.project-list');
        let tabElement;
        
        switch (tab.type) {
            case 'menu-item':
                tabElement = menuElements!.querySelector(`[data-menuid="${tab.id}"]`) as HTMLElement
                displayHeader.updateHeader(tabElement)
                if (displayMain.contains(addTaskBtn)) {displayMain.removeChild(addTaskBtn)};
                break;

            case 'project':
                tabElement = projectElements!.querySelector(`[data-projectid="${tab.id}"]`) as HTMLElement
                displayHeader.updateHeader(tabElement)
                displayMain.appendChild(addTaskBtn);
                break;    
        }
        
        if (isProject(tab)) {
            tab.todoList.forEach(todo => {
                createTaskEl(todo)
            })
        }
    }

    return {
        container,
        displayTasks,
    }
})()