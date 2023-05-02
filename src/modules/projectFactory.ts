import { Todo } from "./todoFactory";

export interface Project {
    id: number;
    title: string;
    todoList: Todo[];
    addTodo: (todo: Todo) => void;
    removeTodo: (todo: Todo) => void;
}

export const createProject = (title: string, id: number) => {
    const type = 'project'
    const todoList: Todo[] = [];

    function addTodo(todo: Todo) {
        if (todo.title.length > 0) {
            todoList.unshift(todo);
        } else {
            throw 'Todo title must contain at least 1 charater';
        }
    }

    function removeTodo(todo: Todo) {
        if (todoList.includes(todo)) {
            const index = todoList.indexOf(todo);
            todoList.splice(index, 1);
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