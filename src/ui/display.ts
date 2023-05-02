import { createElement } from "./pageUI"
import '../styles/display.css'

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

    return {
        container,
        updateHeader
    }
})()