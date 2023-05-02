import '../styles/main.css'
import { navbar } from './navbar';
import Modal from './modal';

export const app = document.querySelector<HTMLDivElement>('#app');

export function createElement(tag: string, className: string) {
        const element = document.createElement(tag);
        element.classList.add(className);
        return element;
}

export default function generatePage() {
        app!.appendChild(Modal.modal);
        Modal.projectModal()
        app!.appendChild(navbar.container);
}