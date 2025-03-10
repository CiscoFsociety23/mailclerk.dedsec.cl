export interface SendRecord {
    layout: Layout;
    email: string;
    name: string;
    subject: string
}

export interface Layout {
    id: number;
    name: string;
    layoutB64: string
}
