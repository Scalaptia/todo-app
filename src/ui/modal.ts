import { createElement } from "./pageUI"
import '../styles/modal.css'

const createModal = () => {
    const modal = createElement('div', 'modal');
    modal.dataset.show = 'false';

    function toggleModal() {
        modal.innerHTML = ''
        modal.dataset.show === 'false' ? modal.dataset.show = 'true' : modal.dataset.show = 'false';
    }

    const modalTitle = createElement('h1', 'modal-title');
    
    const modalForm = document.createElement('form');
        modalForm.classList.add('modal-form');
        modalForm.action = '#'
        modalForm.method = 'get'
    
    const formTitle = createElement('div', 'input-container');
        const titleLabel = document.createElement('label');
        titleLabel.classList.add('input-label');
        titleLabel.htmlFor = 'title-input';
        titleLabel.innerText = 'Nombre*';
        formTitle.appendChild(titleLabel);

        const titleInput = document.createElement('input');
        titleInput.name = 'title-input';
        titleInput.id = 'title-input';
        titleInput.type = 'text';
        formTitle.appendChild(titleInput);

    const formSubmit = document.createElement('button')
        formSubmit.classList.add('form-submit-btn')
        formSubmit.innerText = 'Añadir'

    const formCancel = document.createElement('button')
        formCancel.classList.add('form-cancel-btn')
        formCancel.innerText = 'Cerrar'
        formCancel.addEventListener('click', toggleModal)
        

    function taskModal() {
        toggleModal();
        const container = createElement('div', 'modal-container');
            modalTitle.innerText = 'Añadir Tarea';

            const formContainer = createElement('div', 'form-container');
                formContainer.appendChild(formTitle);
                formContainer.appendChild(formCancel);
                formContainer.appendChild(formSubmit);

        container.appendChild(modalTitle);
        container.appendChild(formContainer);
        modal.appendChild(container);
        return modal
    }

    function projectModal() {
        toggleModal();
        const container = createElement('div', 'modal-container');
            modalTitle.innerText = 'Añadir Materia';

            const formContainer = createElement('div', 'form-container');
                formContainer.appendChild(formTitle);

                const formButtons = createElement('div', 'form-buttons');
                    formButtons.appendChild(formCancel);
                    formButtons.appendChild(formSubmit);
                formContainer.appendChild(formButtons);
            
        container.appendChild(modalTitle);
        container.appendChild(formContainer);
        modal.appendChild(container);
        return modal
    }

    return {
        modal,
        taskModal,
        projectModal,
    }
}


export const modal = createModal();