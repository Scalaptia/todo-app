import { createElement } from "./pageUI"
import '../styles/display.css'
import { Project } from "../modules/projectFactory";
import { MenuItem } from "../modules/menuList";
// import { app } from "./pageUI";

const displayHeader = (() => {
    const header = createElement('div', 'display-header');
        const headerTab = createElement('div', 'header-tab');
        headerTab.innerHTML = `Select a Tab`
    header.appendChild(headerTab);

    function updateHeader(tab: HTMLElement | string) {
        if (typeof tab === 'string') {
            header.innerHTML = tab
        } else if (tab instanceof HTMLElement) {
            header.innerHTML = `${tab.children[0].innerHTML}`
        }
    }

    return {
        header,
        updateHeader
    }
})()

const createTaskEl = () => {

}

export default (() => {
    const container = createElement('div', 'display');
        const displayMain = createElement('div', 'display-tasks');
        
    container.appendChild(displayHeader.header);
    container.appendChild(displayMain);


    function displayTasks(tab: (Project | MenuItem)) {
        if (tab === undefined) {
            displayHeader.updateHeader('Select Tab')
        }

        const menuElements = document.querySelector('.menu-list');
        const projectElements = document.querySelector('.project-list');
        let tabElement;
        
        switch (tab.type) {
            case 'menu-item':
                tabElement = menuElements!.querySelector(`[data-menuid="${tab.id}"]`) as HTMLElement
                displayHeader.updateHeader(tabElement)
                break;

            case 'project':
                tabElement = projectElements!.querySelector(`[data-projectid="${tab.id}"]`) as HTMLElement
                displayHeader.updateHeader(tabElement)
                break;    
        }

        console.log(tab)
    }

    return {
        container,
        displayTasks
    }
})()