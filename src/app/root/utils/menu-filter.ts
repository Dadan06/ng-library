import { Privilege } from 'src/app/role/types/privilege.interface';
import { Menu } from '../types/menu.interface';

export const generateMenusDependingOnUserRights = (
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
