import { UserPrivileges } from 'src/app/role/constants/privilege.constants';
import { Menu } from '../types/menu.interface';

export const HEADER_MENU: Menu[] = [
    {
        title: 'Acceuil',
        icon: 'assets/images/header/ico-home.png',
        iconActive: 'assets/images/header/ico-home--active.png',
        routerLink: '/root/home',
        accessRight: UserPrivileges.CONTACT_LIST
    },
    {
        title: 'Autre',
        icon: 'assets/images/header/ico-admin.png',
        iconActive: 'assets/images/header/ico-admin--active.png',
        routerLink: '/root/admin',
        accessRight: UserPrivileges.CONTACT_LIST
    },
    {
        title: 'Administration',
        icon: 'assets/images/header/ico-param.png',
        iconActive: 'assets/images/header/ico-param--active.png',
        routerLink: '/root/access-management',
        accessRight: UserPrivileges.CONTACT_LIST
    }
];
