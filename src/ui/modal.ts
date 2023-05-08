import { createElement } from "./pageUI"
import '../styles/modal.css'
import Form from "./form";
import { Todo } from "../modules/todoFactory";

export default (() => {
    const modal = createElement('div', 'modal');
    modal.dataset.show = 'false';

    function toggleModal() {
        modal.innerHTML = ''
        modal.dataset.show === 'true' ? modal.dataset.show = 'false' : modal.dataset.show = 'true';
    }

    function taskModal() {
        toggleModal();
        const container = createElement('div', 'modal-container');
            const modalTitle = createElement('h1', 'modal-title');
            modalTitle.innerText = 'Add Task';

            const Buttons = createElement('div', 'form-buttons');
                Buttons.appendChild(Form.Cancel);
                Buttons.appendChild(Form.Submit);

            const formContainer = createElement('div', 'form-container');
                formContainer.dataset.type = 'task';
                formContainer.appendChild(Form.Title);
                formContainer.appendChild(Form.Description);
                formContainer.appendChild(Form.DueDate);
                formContainer.appendChild(Form.Priority);
                formContainer.appendChild(Buttons);

        container.appendChild(modalTitle);
        container.appendChild(formContainer);

        modal.appendChild(container);
        return modal;
    }

    function editTaskModal(todo: Todo) {
        toggleModal();
        const container = createElement('div', 'modal-container');
            const modalTitle = createElement('h1', 'modal-title');
            modalTitle.innerText = 'Edit Task';

            const formContainer = createElement('div', 'form-container');
                formContainer.dataset.type = 'task';

                const Buttons = createElement('div', 'form-buttons');
                    Buttons.appendChild(Form.Cancel);
                    Buttons.appendChild(Form.Edit);

                Form.titleInput.value = todo.title
                Form.descriptionInput.value = todo.description
                Form.dateInput.valueAsDate = todo.dueDate
                Form.priorityInput.checked = todo.priority

                formContainer.appendChild(Form.Title);
                formContainer.appendChild(Form.Description);
                formContainer.appendChild(Form.DueDate);
                formContainer.appendChild(Form.Priority);
                formContainer.appendChild(Buttons);

        container.appendChild(modalTitle);
        container.appendChild(formContainer);

        modal.appendChild(container);
        return modal;

    }

    function projectModal() {
        toggleModal();
        const container = createElement('div', 'modal-container');
            const modalTitle = createElement('h1', 'modal-title');
            modalTitle.innerText = 'Add Project';

            const Buttons = createElement('div', 'form-buttons');
                Buttons.appendChild(Form.Cancel);
                Buttons.appendChild(Form.Submit);

            const formContainer = createElement('div', 'form-container');
                formContainer.dataset.type = 'project';
                formContainer.appendChild(Form.Title);
                formContainer.appendChild(Buttons);

            
        container.appendChild(modalTitle);
        container.appendChild(formContainer);

        modal.appendChild(container);
        return modal
    }

    return {
        modal,
        taskModal,
        editTaskModal,
        projectModal,
        toggleModal,
    }
})()