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
                    MenuItem.todoList.push(todo);
                });
            });
            console.log(MenuItem);
            break;
        case 1:
            const twentyFourHoursFromNow = addDays(today, 1);
            projectList.projects.forEach(project => {
                project.todoList.forEach(todo => {
                    if(isWithinInterval(todo.dueDate, { start: today, end: twentyFourHoursFromNow })){
                        MenuItem.todoList.push(todo);
                    }
                });
            });
            console.log(MenuItem);
            break;
        case 2:
            const oneWeekFromNow = addHours(today, 24);
            projectList.projects.forEach(project => {
                project.todoList.forEach(todo => {
                    if(isWithinInterval(todo.dueDate, {start: today, end: oneWeekFromNow})) {
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