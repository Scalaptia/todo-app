import projectList from "../modules/projectList";
import display from "./display";
import Modal from "./modal";
import { createElement } from "./pageUI";

export default (() => {
    const modalForm = document.createElement('form');
        modalForm.autocomplete = 'off';
        modalForm.classList.add('modal-form');
        modalForm.action = '#'
        modalForm.method = 'get'

    function clearForm() {
        titleInput.value = '';
        descriptionInput.value = '';
        dateInput.value = '';
        priorityInput.checked = false;
    }
    
    const Title = createElement('div', 'input-container');
        const titleLabel = document.createElement('label');
        titleLabel.classList.add('input-label');
        titleLabel.htmlFor = 'title-input';
        titleLabel.innerHTML = `Title <b style="color:red">*</b>`;
        Title.appendChild(titleLabel);

        const titleInput = document.createElement('input');
        titleInput.name = 'title-input';
        titleInput.id = 'title-input';
        titleInput.type = 'text';
        titleInput.autocomplete = 'off';
        Title.appendChild(titleInput);

    const Description = createElement('div', 'input-container');
        const descriptionLabel = document.createElement('label');
        descriptionLabel.classList.add('decription-label');
        descriptionLabel.htmlFor = 'description-input';
        descriptionLabel.innerText = 'Description';
        Description.appendChild(descriptionLabel);

        const descriptionInput = document.createElement('input');
        descriptionInput.name = 'description-input';
        descriptionInput.id = 'description-input';
        descriptionInput.type = 'text';
        descriptionInput.autocomplete = 'off';
        Description.appendChild(descriptionInput);

    const DueDate = createElement('div', 'input-container');
        const dateLabel = document.createElement('label');
        dateLabel.classList.add('date-label');
        dateLabel.htmlFor = 'date-input';
        dateLabel.innerText = 'Date';
        DueDate.appendChild(dateLabel);

        const dateInput = document.createElement('input');
        dateInput.name = 'date-input';
        dateInput.id = 'date-input';
        dateInput.type = 'date';
        DueDate.appendChild(dateInput);
        
    const Priority = createElement('div', 'input-container');
        const priorityLabel = document.createElement('label');
        priorityLabel.classList.add('priority-label');
        priorityLabel.htmlFor = 'priority-input';
        priorityLabel.innerText = 'Important';
        Priority.appendChild(priorityLabel);

        const priorityInput = document.createElement('input');
        priorityInput.name = 'priority-input';
        priorityInput.id = 'priority-input';
        priorityInput.type = 'checkbox';
        Priority.appendChild(priorityInput);

    const Submit = document.createElement('button');
        Submit.classList.add('form-submit-btn');
        Submit.innerText = 'Add';
        Submit.addEventListener('click', handleSubmitEvent);

        function handleSubmitEvent(event: MouseEvent | KeyboardEvent) {
            if((event as KeyboardEvent).key === 'Enter' || (event as MouseEvent).type === 'click') {
                const parent = ((event.target as HTMLElement).parentNode as HTMLElement).parentNode as HTMLElement;
                switch (parent.dataset.type) {
                    case 'project':
                        projectList.addProject(titleInput.value);
                        break;
                    case 'task':
                        const projects = document.querySelector('.project-list');
                        const targetProjectElement = projects!.querySelector(`[data-selected="true"]`) as HTMLElement
                        const targetProjectObject = projectList.projects.filter(obj => obj.id === parseInt(targetProjectElement.dataset.projectid!))[0];
                        const selectedDate = dateInput.valueAsDate!

                        if (dateInput.valueAsDate) {
                            let timezoneOffset = selectedDate.getTimezoneOffset();
                            selectedDate.setMinutes(selectedDate.getMinutes() + timezoneOffset);
                        }

                        targetProjectObject.addTodo(titleInput.value, descriptionInput.value, selectedDate, priorityInput.checked!, false);
                        break;
                }

                clearForm();
                Modal.toggleModal()
            }
        }

    const Cancel = document.createElement('button');
        Cancel.classList.add('form-cancel-btn');
        Cancel.innerText = 'Close';
        Cancel.addEventListener('click', handleCancelEvent);

        function handleCancelEvent(event: MouseEvent | KeyboardEvent) {
            if((event as KeyboardEvent).key === 'Escape' || (event as MouseEvent).type === 'click') {
                clearForm();
                Modal.toggleModal();
            }
        }

    const Edit = document.createElement('button');
        Edit.classList.add('form-edit-btn');
        Edit.innerText = 'Edit';
        Edit.addEventListener('click', handleEditEvent);

        function handleEditEvent(event: MouseEvent | KeyboardEvent) {
            if((event as KeyboardEvent).key === 'Enter' || (event as MouseEvent).type === 'click') {
                const parent = ((event.target as HTMLElement).parentNode as HTMLElement).parentNode as HTMLElement;
                    switch (parent.dataset.type) {
                        case 'project':
                            // Edit Project
                            break;
                        case 'task':
                            const projects = document.querySelector('.project-list');
                            const targetProjectElement = projects!.querySelector(`[data-selected="true"]`) as HTMLElement
                            const targetProjectObject = projectList.projects.filter(obj => obj.id === parseInt(targetProjectElement.dataset.projectid!))[0];

                            const tasks = document.querySelector('.task-section');
                            const targetTaskElement = tasks!.querySelector(`[data-editing="true"]`) as HTMLElement
                            const targetTaskObject =  targetProjectObject.todoList.filter(obj => obj.id === parseInt(targetTaskElement.dataset.taskid!))[0];

                            const selectedDate = dateInput.valueAsDate!
                            if (dateInput.valueAsDate) {
                                let timezoneOffset = selectedDate.getTimezoneOffset();
                                selectedDate.setMinutes(selectedDate.getMinutes() + timezoneOffset);
                            }

                            targetTaskObject.title = titleInput.value;
                            targetTaskObject.description = descriptionInput.value;
                            targetTaskObject.dueDate = selectedDate;
                            targetTaskObject.priority = priorityInput.checked;
                            display.displayTasks(targetProjectObject)
                            break;
                        default:
                            break;
                    }

                    clearForm();
                    Modal.toggleModal()
            }                
        }
    
    return {
        modalForm,
        Submit,
        Cancel,
        Edit,
        Title,
        Description,
        DueDate,
        Priority,
        titleInput,
        descriptionInput,
        dateInput,
        priorityInput,
        handleSubmitEvent,
        handleCancelEvent,
        handleEditEvent,
    }
})()