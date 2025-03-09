export interface ServiceInformation {
    server: string;
    services: ServiceList[]
}

export interface ServiceList {
    name: string;
    status: string;
}
