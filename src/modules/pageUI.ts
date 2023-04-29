import { NavBar } from "./navbar";

export const app = document.querySelector<HTMLDivElement>('#app');

export default function generatePage() {
        app!.classList.add(`bg-slate-950`)
        NavBar()
}