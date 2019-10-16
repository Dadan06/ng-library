import { UserPrivileges } from 'src/app/role/constants/privilege.constants';
import { Menu } from '../types/menu.interface';

export const ADMIN_MENU: Menu[] = [
    {
        title: `Vente`,
        icon: '',
        routerLink: '/root/admin/sale',
        accessRight: UserPrivileges.CREATE_SALE
    }
];
