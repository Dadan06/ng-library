import { UserPrivileges } from 'src/app/role/constants/privilege.constants';

export interface Menu {
    title: string;
    icon: string;
    iconActive?: string;
    routerLink?: string;
    children?: SubMenu[];
    accessRight?: UserPrivileges;
}

export interface SubMenu {
    title: string;
    routerLink: string;
    accessRight?: UserPrivileges;
}
