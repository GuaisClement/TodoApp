export type TaskModel = {
    id: number,
    checked: boolean
    title: string,
    content: string,
    date: Date,
    tags : string[];
}