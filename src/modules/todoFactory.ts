export enum TodoPriority {
    High = "high",
    Medium = "medium",
    Low = "low",
}

export interface Todo {
    title: string;
    description: string;
    dueDate: Date;
    priority: TodoPriority;
}

export const createTodo = (title: string, description: string, dueDate: Date, priority: TodoPriority) => {
    return {
        title,
        description,
        dueDate,
        priority,
    };
}
