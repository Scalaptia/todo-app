import '../styles/main.css'
import { NavBar } from "./navbar";

export const app = document.querySelector<HTMLDivElement>('#app');

export default function generatePage() {
        NavBar()
}