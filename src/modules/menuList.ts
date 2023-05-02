import navbar from "../ui/navbar";

export interface MenuItem {
    type: string;
    id: number;
    title: string;
}

const createItem = (title: string, id: number) => {
    const type = 'menu-item';
    return {
        type,
        title,
        id,
    };
}

export default (() => {
    const items: MenuItem[] = [];
    let menuIDs = 0;

    function addItem(title: string, icon: string) {
        if (title.length > 0) {
            navbar.createTab('menu', title, icon, menuIDs);
            items.push(createItem(title, menuIDs));
            menuIDs++;
        } else {
            throw 'Menu item title must contain at least 1 charater';
        }
    }

    return {
        items,
        addItem,
    }
})();