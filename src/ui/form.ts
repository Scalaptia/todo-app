import { createProject } from "../modules/projectFactory";
import Modal from "./modal";
import { createElement } from "./pageUI";

export default (() => {
    const modalForm = document.createElement('form');
        modalForm.classList.add('modal-form');
        modalForm.action = '#'
        modalForm.method = 'get'
    
    const Title = createElement('div', 'input-container');
        const titleLabel = document.createElement('label');
        titleLabel.classList.add('input-label');
        titleLabel.htmlFor = 'title-input';
        titleLabel.innerText = 'Nombre*';
        Title.appendChild(titleLabel);

        const titleInput = document.createElement('input');
        titleInput.name = 'title-input';
        titleInput.id = 'title-input';
        titleInput.type = 'text';
        Title.appendChild(titleInput);

    const Submit = document.createElement('button');
        Submit.classList.add('form-submit-btn');
        Submit.innerText = 'Añadir';
        Submit.addEventListener('click', () => {
            createProject(titleInput.value);
            Modal.toggleModal()
        });

    const Cancel = document.createElement('button');
        Cancel.classList.add('form-cancel-btn');
        Cancel.innerText = 'Cerrar';
        Cancel.addEventListener('click', () => {Modal.toggleModal()});

    const Buttons = createElement('div', 'form-buttons');
        Buttons.appendChild(Cancel);
        Buttons.appendChild(Submit);
    
    return {
        modalForm,
        Title,
        Buttons,
    }
})()