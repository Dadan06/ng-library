import { Role } from 'src/app/role/types/role.interface';

export interface User {
    // tslint:disable-next-line:no-any
    _id: string;
    firstname: string;
    lastname: string;
    login: string;
    role: Role;
}
