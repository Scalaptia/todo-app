import '../styles/main.css'
import navbar from './navbar';
import Modal from './modal';
import display from './display';
import menuList from '../modules/menuList';
import allTasks from '../assets/inbox.svg';
import todayTasks from '../assets/today.svg';
import weekTasks from '../assets/week.svg';
import importantTasks from '../assets/important.svg'

export const app = document.querySelector<HTMLDivElement>('#app');

export function createElement(tag: string, className: string) {
        const element = document.createElement(tag);
        element.classList.add(className);
        return element;
}

export default function generatePage() {
        app!.appendChild(Modal.modal);
        app!.appendChild(navbar.sidebar);
        app!.appendChild(display.container);

        menuList.addItem('Todos', allTasks);
        menuList.addItem('Hoy', todayTasks);
        menuList.addItem('Semana', weekTasks);
        menuList.addItem('Importantes', importantTasks);
}