import { addDays, addHours, isWithinInterval } from "date-fns";
import { MenuItem } from "./menuList";
import projectList from "./projectList";

export default function (MenuItem: MenuItem) {
    MenuItem.todoList = []
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (MenuItem.id) {
        case 0:
            projectList.projects.forEach(project => {
                project.todoList.forEach(todo => {
                    if (!todo.status){
                        MenuItem.todoList.push(todo);
                    }
                });
            });
            break;
        case 1:
            const twentyFourHoursFromNow = addDays(today, 1);
            projectList.projects.forEach(project => {
                project.todoList.forEach(todo => {
                    if (!todo.status && isWithinInterval(todo.dueDate, { start: today, end: twentyFourHoursFromNow })){
                        MenuItem.todoList.push(todo);
                    }
                });
            });
            break;
        case 2:
            const oneWeekFromNow = addHours(today, 168);
            projectList.projects.forEach(project => {
                project.todoList.forEach(todo => {
                    if (!todo.status && isWithinInterval(todo.dueDate, {start: today, end: oneWeekFromNow})){
                        MenuItem.todoList.push(todo);
                    }
                });
            });
            break;
        case 3:
            projectList.projects.forEach(project => {
                project.todoList.forEach(todo => {
                    if (!todo.status && todo.priority) {
                        MenuItem.todoList.push(todo);
                    }
                });
            });
            break;
        default:
            throw new Error("Menu item doesn't exist");
    }
}