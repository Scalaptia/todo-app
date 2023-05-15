import navbar from "../ui/navbar";
import { Todo } from "./todoFactory";

export interface MenuItem {
    type: string;
    id: number;
    title: string;
    todoList: Todo[];
}

const createItem = (title: string, id: number) => {
    const type = 'menu-item';
    const todoList: Todo[] = [];

    return {
        type,
        title,
        id,
        todoList,
    };
}

const menuList = (() => {
    const items: MenuItem[] = [];
    let menuIDs = 0;

    function addItem(title: string, icon: string) {
        if (title.length > 0) {
            navbar.createTab('menu', title, icon, menuIDs);
            items.push(createItem(title, menuIDs));
            menuIDs++;
        } else {
            throw new Error('Menu item title must contain at least 1 charater');
        }
    }

    return {
        items,
        addItem,
    }
})();

export default menuList;