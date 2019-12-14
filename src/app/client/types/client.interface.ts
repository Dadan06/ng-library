export enum ClientType {
    PARTICULAR = 'PARTICULAR',
    GROUP = 'GROUP'
}

export interface Client {
    _id: string;
    name: string;
    email: string | null;
    remark: string | null;
    address: string;
    contact: string;
    type: ClientType;
}
