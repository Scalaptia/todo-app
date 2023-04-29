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
    const navbar = document.createElement('nav');
    navbar.classList.add('navbar')
    const ul = document.createElement('ul');

    ul.appendChild(createTab('Home', Home()));
    ul.appendChild(createTab('Menu', Menu()));
    ul.appendChild(createTab('About', About()));
    navbar.appendChild(ul);

    app!.appendChild(navbar);

    return container;
}