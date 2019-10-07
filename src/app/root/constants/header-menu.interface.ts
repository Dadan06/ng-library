import { Menu } from '../types/menu.interface';

export const HEADER_MENU: Menu[] = [
    {
        title: 'Article',
        icon: 'assets/images/header/ico-home.png',
        iconActive: 'assets/images/header/ico-home--active.png',
        routerLink: '/root/home'
    },
    {
        title: 'Vente',
        icon: 'assets/images/header/ico-admin.png',
        iconActive: 'assets/images/header/ico-admin--active.png',
        routerLink: '/root/admin'
    },
    {
        title: 'Administration',
        icon: 'assets/images/header/ico-param.png',
        iconActive: 'assets/images/header/ico-param--active.png',
        routerLink: '/root/access-management'
    }
];
