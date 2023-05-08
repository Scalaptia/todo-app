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
import starSVG from '../assets/star.svg'
import starCheckedSVG from '../assets/star-filled.svg'

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

const createTaskEl = (todo: Todo, tab: Project) => {
    const container = createElement('div', 'task');
        const leftContainer = createElement('div', 'task-left');
            const taskStatus = createElement('div', 'task-status');
            container.dataset.status = 'not done';
            (todo.status) ? (container.dataset.status = 'done') : (container.dataset.status = 'not done');
            taskStatus.addEventListener('click', () => {
                todo.status = !todo.status;
                (todo.status) ? (container.dataset.status = 'done') : (container.dataset.status = 'not done');
                if (todo.status) {
                    const task = tab.todoList.splice(todo.id, 1)[0];
                    tab.todoList.push(task);
                }
            });
            leftContainer.appendChild(taskStatus);

            const taskTitle = createElement('div', 'task-title');
            taskTitle.innerText = todo.title;
            leftContainer.appendChild(taskTitle);

        
            const rightContainer = createElement('div', 'task-right');
            const taskDate = createElement('div', 'task-date');
            if (todo.dueDate) {taskDate.innerText = format(todo.dueDate, 'MM/dd/yyyy')};
            rightContainer.appendChild(taskDate);
        
            const taskEdit = document.createElement('img');
            taskEdit.classList.add('btn', 'task-edit');
            taskEdit.src = editSVG;
            taskEdit.addEventListener('click', () => {
                container.dataset.editing = 'true';
                modal.editTaskModal(todo);
            });
            rightContainer.appendChild(taskEdit);

            const taskDelete = document.createElement('img');
            taskDelete.classList.add('btn', 'task-delete');
            taskDelete.src = deleteSVG;
            taskDelete.addEventListener('click', () => {
                tab.removeTodo(todo);
            });
            rightContainer.appendChild(taskDelete);

            const taskPriority = document.createElement('img');
            taskPriority.classList.add('btn', 'task-priority');
            todo.priority ? taskPriority.src = starCheckedSVG : taskPriority.src = starSVG
            taskPriority.addEventListener('click', () => {
                todo.priority = !todo.priority
                todo.priority ? taskPriority.src = starCheckedSVG : taskPriority.src = starSVG
            })
            rightContainer.appendChild(taskPriority);
    
    container.appendChild(leftContainer);
    container.appendChild(rightContainer);
    container.dataset.taskid = `${todo.id}`
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
                tasksSection.appendChild(createTaskEl(todo, tab))
            })
        }
    }

    return {
        container,
        displayTasks,
    }
})()