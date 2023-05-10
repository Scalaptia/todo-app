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
import { handleToggleNavbar } from "./navbar";

export default (() => {
    function isProject(obj: any): obj is Project {
        return Array.isArray(obj.todoList);
    }
    
    const header = (() => {
        const container = createElement('div', 'display-header');
            const headerTab = createElement('div', 'header-tab');
            headerTab.addEventListener('click', handleToggleNavbar);
        container.appendChild(headerTab);
    
        function updateHeader(tab: HTMLElement | string) {
            if (typeof tab === 'string') {
                headerTab.innerHTML = tab;
            } else if (tab instanceof HTMLElement) {
                headerTab.innerHTML = `${tab.children[0].innerHTML}`;
            }
        }
    
        return {
            container,
            updateHeader,
        }
    })()
    
    const createTaskEl = (todo: Todo, tab: Project | MenuItem) => {
        const container = createElement('div', 'task');
            const leftContainer = createElement('div', 'task-left');
                const taskStatus = createElement('div', 'task-status');
                container.dataset.status = 'not done';
                (todo.status) ? (container.dataset.status = 'done') : (container.dataset.status = 'not done');

                taskStatus.addEventListener('click', () => {
                    todo.status = !todo.status;
                    (todo.status) ? (container.dataset.status = 'done') : (container.dataset.status = 'not done');
                    if (todo.status) {
                        tab.todoList = tab.todoList.filter(obj => obj !== todo); // Remove Todo from List
                        tab.todoList.push(todo); // Add Todo at bottom of list
                        displayTasks(tab);
                    }
                });
                leftContainer.appendChild(taskStatus);
    
                const taskTitle = createElement('div', 'task-title');
                taskTitle.innerText = todo.title;
                leftContainer.appendChild(taskTitle);
            container.appendChild(leftContainer);
            
            const rightContainer = createElement('div', 'task-right');
                const taskDate = createElement('div', 'task-date');
                if (todo.dueDate) {taskDate.innerText = format(todo.dueDate, 'MM/dd/yyyy')};
                rightContainer.appendChild(taskDate);
                
                if (tab.type === 'project' && isProject(tab)) {
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
                }
    
                const taskPriority = document.createElement('img');
                taskPriority.classList.add('btn', 'task-priority');
                todo.priority ? taskPriority.src = starCheckedSVG : taskPriority.src = starSVG
                taskPriority.addEventListener('click', () => {
                    todo.priority = !todo.priority
                    todo.priority ? taskPriority.src = starCheckedSVG : taskPriority.src = starSVG
                })
                rightContainer.appendChild(taskPriority);
            container.appendChild(rightContainer);

        container.dataset.taskid = `${todo.id}`
        return container
    }
    
    const addTaskBtn = (() => {
        const container = createElement('div', 'add-task-section');
            const addBtnTitle = createElement('h3', 'add-btn-title');
            addBtnTitle.innerText = 'Add Task'
    
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
        return container;
    })()

    
    const displayMain = (() => {
        const container = createElement('div', 'display-tasks');
            container.appendChild(tasksSection);

        return container
    })()


    function displayTasks(tab: (Project | MenuItem)) {
        tasksSection.innerHTML = ''

        if (tab === undefined) {
            header.updateHeader('Select Tab')
            return;
        }

        const menuElements = document.querySelector('.menu-list');
        const projectElements = document.querySelector('.project-list');
        let tabElement;
        
        if (tab.type === 'project' && isProject(tab)) {
            tabElement = projectElements!.querySelector(`[data-projectid="${tab.id}"]`) as HTMLElement
                header.updateHeader(tabElement);
                displayMain.appendChild(addTaskBtn); 
        } else if (tab.type === 'menu-item') {
            tabElement = menuElements!.querySelector(`[data-menuid="${tab.id}"]`) as HTMLElement
                header.updateHeader(tabElement);
                if (displayMain.contains(addTaskBtn)) {displayMain.removeChild(addTaskBtn)};
        }

        tab.todoList.forEach(todo => {
            tasksSection.appendChild(createTaskEl(todo, tab));
        })
    }

    const main = (() =>{
        const container = createElement('div', 'display');
        
        container.appendChild(header.container);
        container.appendChild(displayMain);

        return container
    })()

    return {
        main,
        displayTasks,
    }
})()