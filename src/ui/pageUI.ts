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
app!.dataset.navbar = 'show'

export function createElement(tag: string, className: string) {
        const element = document.createElement(tag);
        element.classList.add(className);
        return element;
}

export default function generatePage() {
        app!.appendChild(Modal.modal);
        app!.appendChild(navbar.sidebar);
        app!.appendChild(display.main);

        menuList.addItem('All Tasks', allTasks);
        menuList.addItem('Today', todayTasks);
        menuList.addItem('Week', weekTasks);
        menuList.addItem('Important', importantTasks);
}