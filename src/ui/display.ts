import { createElement } from "./pageUI"
import '../styles/display.css'
import { Project } from "../modules/projectFactory";
import { MenuItem } from "../modules/menuList";
// import { app } from "./pageUI";

export default (() => {
    const container = createElement('div', 'display');
        const header = createElement('div', 'display-header');
            const headerTab = createElement('div', 'header-tab');
            headerTab.innerHTML = `Select a Tab`
        header.appendChild(headerTab);
    container.appendChild(header);

    function updateHeader(tab: HTMLElement) {
        headerTab.innerHTML = `${tab.children[0].innerHTML}`
    }

    function pageLoad(tab: (Project | MenuItem)) {

        console.log(tab)
        // window.scrollTo(0,0)
        // app!.removeChild(app!.childNodes[1]!);
        // app!.insertBefore(newTab, app!.children[1]);
    }

    return {
        container,
        updateHeader,
        pageLoad
    }
})()