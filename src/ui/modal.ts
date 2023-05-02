import { createElement } from "./pageUI"
import '../styles/modal.css'
import Form from "./form";

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
            modalTitle.innerText = 'Añadir Tarea';

            const formContainer = createElement('div', 'form-container');
                formContainer.dataset.type = 'task';
                formContainer.appendChild(Form.Title);
                formContainer.appendChild(Form.Buttons);


        container.appendChild(modalTitle);
        container.appendChild(formContainer);

        modal.appendChild(container);
        return modal;
    }

    function projectModal() {
        toggleModal();
        const container = createElement('div', 'modal-container');
            const modalTitle = createElement('h1', 'modal-title');
            modalTitle.innerText = 'Añadir Materia';

            const formContainer = createElement('div', 'form-container');
                formContainer.dataset.type = 'project';
                formContainer.appendChild(Form.Title);
                formContainer.appendChild(Form.Buttons);

            
        container.appendChild(modalTitle);
        container.appendChild(formContainer);

        modal.appendChild(container);
        return modal
    }

    return {
        modal,
        taskModal,
        projectModal,
        toggleModal,
    }
})()