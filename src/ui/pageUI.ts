import '../styles/main.css'
import LightMode from '../assets/light-mode.svg'
import { navbar } from './navbar';

export const app = document.querySelector<HTMLDivElement>('#app');

export function createElement(tag: string, className: string) {
        const element = document.createElement(tag);
        element.classList.add(className);
        return element;
}

export default function generatePage() {
        app!.appendChild(navbar.container)
        navbar.createTab('project', 'test', 'test-class', LightMode);
}