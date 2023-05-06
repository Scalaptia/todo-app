import { addDays, addHours, isWithinInterval } from "date-fns";
import { MenuItem } from "./menuList";
import projectList from "./projectList";

export default function (MenuItem: MenuItem) {
    MenuItem.todoList = []
    const now = new Date();

    switch (MenuItem.id) {
        case 0:
            projectList.projects.forEach(project => {
                project.todoList.forEach(todo => {
                    MenuItem.todoList.push(todo);
                });
            });
            console.log(MenuItem);
            break;
        case 1:
            const twentyFourHoursFromNow = addDays(now, 1);
            projectList.projects.forEach(project => {
                project.todoList.forEach(todo => {
                    if(isWithinInterval(todo.dueDate, { start: now, end: twentyFourHoursFromNow })){
                        MenuItem.todoList.push(todo);
                    }
                });
            });
            console.log(MenuItem);
            break;
        case 2:
            const oneWeekFromNow = addHours(now, 24);
            projectList.projects.forEach(project => {
                project.todoList.forEach(todo => {
                    if(isWithinInterval(todo.dueDate, {start: now, end: oneWeekFromNow})) {
                        MenuItem.todoList.push(todo);
                    }
                });
            });
            console.log(MenuItem);
            break;
        case 3:
            projectList.projects.forEach(project => {
                project.todoList.forEach(todo => {
                    if(todo.priority) {
                        MenuItem.todoList.push(todo);
                    }
                });
            });
            console.log(MenuItem);
            break;
        default:
            throw "Menu item doesn't exist"
    }
}