import { UserPrivileges } from 'src/app/role/constants/privilege.constants';
import { Menu } from 'src/app/root/types/menu.interface';

export const getFirstAvailableMenu = (userPrivileges: UserPrivileges[], menus: Menu[]): Menu => {
    const menuList = menus.filter(menu => menu.accessRight);
    menus
        .filter(menu => menu.children)
        .forEach(menu => menu.children.forEach(submenu => menuList.push(submenu)));
    return menuList.find(menu => userPrivileges.includes(menu.accessRight));
};
