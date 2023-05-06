import { createElement } from "./pageUI"
import '../styles/display.css'
import { Project } from "../modules/projectFactory";
import { MenuItem } from "../modules/menuList";
import { Todo } from "../modules/todoFactory";
import modal from "./modal";
import { format } from "date-fns";
import addSVG from '../assets/add.svg'
import editSVG from '../assets/edit.svg'
import deleteSVG from '../assets/delete.svg'
import importantSVG from '../assets/important.svg'

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
            const taskStatus = createElement('div', 'task-status');
            container.dataset.status = 'not done';

            taskStatus.addEventListener('click', () => {
                (container.dataset.status === 'not done') ? (container.dataset.status = 'done') : (container.dataset.status = 'not done')
            })
            leftContainer.appendChild(taskStatus);

            const taskTitle = createElement('div', 'task-title');
            taskTitle.innerText = todo.title;
            leftContainer.appendChild(taskTitle);

        const rightContainer = createElement('div', 'task-right');
            const taskDate = createElement('div', 'task-date');
            todo.dueDate ? taskDate.innerText = format(todo.dueDate, 'MM/dd/yyyy') : '';

            const taskEdit = document.createElement('img');
            taskEdit.classList.add('btn', 'task-edit');
            taskEdit.src = editSVG;

            const taskDelete = document.createElement('img');
            taskDelete.classList.add('btn', 'task-delete');
            taskDelete.src = deleteSVG;

            const taskPriority = document.createElement('img');
            taskPriority.classList.add('btn', 'task-priority');
            taskPriority.src = importantSVG;

        rightContainer.appendChild(taskDate);
        rightContainer.appendChild(taskEdit);
        rightContainer.appendChild(taskDelete);
        rightContainer.appendChild(taskPriority);

    container.appendChild(leftContainer);
    container.appendChild(rightContainer);
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
    displayMain.appendChild(tasksSection);

    function displayTasks(tab: (Project | MenuItem)) {
        tasksSection.innerHTML = ''
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
                console.log(todo)
                tasksSection.appendChild(createTaskEl(todo))
            })
        }
    }

    return {
        container,
        displayTasks,
    }
})()