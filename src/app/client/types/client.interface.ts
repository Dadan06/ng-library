export enum ClientType {
    PARTICULAR = 'PARTICULAR',
    GROUP = 'GROUP'
}

export interface Client {
    _id: string;
    name: string;
    address: string;
    contact: string;
    type: ClientType;
}
