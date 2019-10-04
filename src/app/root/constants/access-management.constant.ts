import { UserPrivileges } from 'src/app/role/constants/privilege.constants';
import { Menu } from '../types/menu.interface';

export const ACCESS_MANAGEMENT_MENU: Menu[] = [
    {
        title: `utilisateurs`,
        icon: '',
        routerLink: '/root/access-management/user',
        accessRight: UserPrivileges.VIEW_USER
    },
    {
        title: `rôles`,
        icon: '',
        routerLink: '/root/access-management/role',
        accessRight: UserPrivileges.VIEW_ROLE
    }
];
