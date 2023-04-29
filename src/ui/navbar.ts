import '../styles/navbar.css'
import pageLoad from "./pageLoad";
import { app } from "./pageUI";

const createTab = (tabName: string, tabPage: any) => {
    const tab = document.createElement('li');
    tab.classList.add(`${tabName.toLowerCase()}-link`);
    tab.textContent = tabName;

    tab.addEventListener('click', () => {
        pageLoad(tabPage)
    })
    return tab;
}

export const NavBar = () => {
    const navbar = document.createElement('div');
    navbar.classList.add('navbar')
    const ul = document.createElement('ul');

    ul.appendChild(createTab('Default', '/#'));
    navbar.appendChild(ul);

    app!.appendChild(navbar);

    return navbar;
}