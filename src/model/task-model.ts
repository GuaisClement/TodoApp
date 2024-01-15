export type TaskModel = {
    id: string,
    checked: boolean,
    title: string,
    content: string,
    date: Date,
    tags : string[];
    favorite: boolean,
}