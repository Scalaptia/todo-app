import projectList from "../modules/projectList";
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
        Submit.addEventListener('click', (event) => {
            const parent = ((event.target as HTMLElement).parentNode as HTMLElement).parentNode as HTMLElement;
            console.log(parent.dataset.type)
                switch (parent.dataset.type) {
                    case 'project':
                        projectList.addProject(titleInput.value);
                        break;
                    case 'task':
                        const projects = document.querySelector('.project-list');
                        const targetProjectElement = projects!.querySelector(`[data-selected="true"]`) as HTMLElement
                        const targetProjectObject = projectList.projects.filter(obj => obj.id === parseInt(targetProjectElement.dataset.projectid!))
                        console.log(targetProjectObject);
                        break;
                    default:
                        break;
                }

                titleInput.value = '';
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
        Submit,
        Title,
        Buttons,
    }
})()