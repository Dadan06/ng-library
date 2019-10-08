import { UserPrivileges } from 'src/app/role/constants/privilege.constants';
import { Menu } from '../types/menu.interface';

export const HOME_MENU: Menu[] = [
    {
        title: `Produits`,
        icon: '',
        routerLink: '/root/home/product',
        accessRight: UserPrivileges.VIEW_PRODUCT
    },
    {
        title: `Fournisseurs`,
        icon: '',
        routerLink: '/root/home/supplier',
        accessRight: UserPrivileges.VIEW_SUPPLIER
    }
];
