import { Privilege } from './privilege.interface';

export interface Role {
    _id: string;
    name: string;
    privileges: Privilege[];
}
