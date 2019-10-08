import { Privilege } from 'src/app/role/types/privilege.interface';
import { Menu } from '../types/menu.interface';

export const generateSideNavMenusDependingOnUserRights = (
    allMenus: Menu[],
    privileges: Privilege[] = []
): Menu[] => {
    const filteredMenus: Menu[] = [];
    const userPrivileges = privileges.map(p => p.name);
    allMenus.forEach((menu: Menu) => {
        if (menu.children) {
            const filteredChildren: Menu[] = (menu.children || []).filter(({ accessRight }) =>
                userPrivileges.includes(accessRight)
            );
            if (filteredChildren.length) {
                filteredMenus.push({
                    ...menu,
                    children: filteredChildren
                });
            }
        } else if (userPrivileges.includes(menu.accessRight)) {
            filteredMenus.push(menu);
        }
    });
    return filteredMenus;
};

const userHasAccess = (menu: Menu, privileges: Privilege[] = []): boolean => {
    if (menu.accessRight && privileges.map(p => p.name).includes(menu.accessRight)) {
        return true;
    } else if (menu.children && menu.children.length) {
        return menu.children.some(childMenu => userHasAccess(childMenu, privileges));
    }
};

export const filterHeaderMenusDependingOnUserRight = (
    allMenus: Menu[],
    privileges: Privilege[] = []
): Menu[] => allMenus.filter(menu => userHasAccess(menu, privileges));
