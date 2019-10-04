import { PrivilegeCategories, UserPrivileges } from '../constants/privilege.constants';

export interface Privilege {
    _id: string;
    name: UserPrivileges;
    category: PrivilegeCategories;
    active?: boolean;
}
