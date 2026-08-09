export interface Note {
    id: string;
    title: string;
    content: string;
    tag: string;
    createdAt: string;
}
export type Tag = "Work" | "Todo" | "Personal" | "Meeting" | "Shopping";
export type SortBy = "created" | "updated";