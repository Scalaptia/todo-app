export interface Todo {
    title: string;
    description: string;
    dueDate: Date;
    priority: boolean;
}

export const createTodo = (title: string, description: string, dueDate: Date, priority: boolean) => {
    return {
        title,
        description,
        dueDate,
        priority,
    };
}
