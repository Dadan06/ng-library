import { UserPrivileges } from 'src/app/role/constants/privilege.constants';
import { Menu } from '../types/menu.interface';

export const ADMIN_MENU: Menu[] = [
    {
        title: `Gestion vente`,
        icon: '',
        routerLink: '/root/admin/trade',
        accessRight: UserPrivileges.CREATE_TRADE
    }
];
