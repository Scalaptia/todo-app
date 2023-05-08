import display from "../ui/display";
import { Todo, createTodo } from "./todoFactory";

export interface Project {
    type: string,
    title: string;
    id: number;
    todoList: Todo[];
    addTodo: (taskTitle: string, taskDescription: string, dueDate: Date, priority: boolean, status: boolean) => void;
    removeTodo: (todo: Todo) => void;
}

export const createProject = (title: string, id: number) => {
    const type = 'project'
    const todoList: Todo[] = [];
    let taskIDs = 0

    function addTodo(this: Project, taskTitle: string, taskDescription: string, dueDate: Date, priority: boolean, status: boolean) {
        if (taskTitle.length > 0) {
            todoList.push(createTodo(taskTitle, taskDescription, dueDate, priority, taskIDs, status));
            taskIDs++
            display.displayTasks(this);
        } else {
            throw 'Todo title must contain at least 1 charater';
        }
    }

    function removeTodo(this: Project, todo: Todo) {
        if (todoList.includes(todo)) {
            this.todoList = this.todoList.filter(obj => obj !== todo);
            display.displayTasks(this);
        } else {
            throw 'Todo does not exist within the todoList array';
        }
    }

    return {
        type,
        title,
        id,
        todoList,
        addTodo,
        removeTodo
    };
}