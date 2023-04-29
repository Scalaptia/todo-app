import '../styles/main.css'
import { NavBar } from "./navbar";

export const app = document.querySelector<HTMLDivElement>('#app');

export function createElement(tag: string, className: string) {
        const element = document.createElement(tag);
        element.classList.add(className);
        return element;
}

export default function generatePage() {
        app!.appendChild(NavBar())
}