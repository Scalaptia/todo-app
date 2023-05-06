export interface Todo {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    priority: boolean;
}

export const createTodo = (title: string, description: string, dueDate: Date, priority: boolean, id: number) => {
    return {
        id,
        title,
        description,
        dueDate,
        priority,
    };
}
