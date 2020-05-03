import { UserPrivileges } from 'src/app/role/constants/privilege.constants';
import { Menu } from '../types/menu.interface';

export const HOME_MENU: Menu[] = [
    {
        title: `Produit`,
        icon: '',
        routerLink: '/root/home/product',
        accessRight: UserPrivileges.VIEW_PRODUCT
    },
    {
        title: `Fournisseur`,
        icon: '',
        routerLink: '/root/home/supplier',
        accessRight: UserPrivileges.VIEW_SUPPLIER
    },
    {
        title: `Client`,
        icon: '',
        routerLink: '/root/home/client',
        accessRight: UserPrivileges.VIEW_CLIENT
    }
];
