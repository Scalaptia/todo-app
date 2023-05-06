export interface Todo {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    priority: boolean;
    status: boolean;
}

export const createTodo = (title: string, description: string, dueDate: Date, priority: boolean, id: number, status: boolean) => {
    return {
        id,
        title,
        description,
        dueDate,
        priority,
        status,
    };
}
