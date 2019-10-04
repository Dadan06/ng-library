export const enum UserPrivileges {
    CONTACT_LIST = 'VIEW_CONTACT',
    CONTACT_FORM = 'EDIT_CONTACT',
    CONTACT_DELETE = 'DELETE_CONTACT',
    VIEW_USER = 'VIEW_USER',
    CREATE_USER = 'CREATE_USER',
    EDIT_USER = 'EDIT_USER',
    DELETE_USER = 'DELETE_USER',
    VIEW_ROLE = 'VIEW_ROLE',
    CREATE_ROLE = 'CREATE_ROLE',
    EDIT_ROLE = 'EDIT_ROLE',
    DELETE_ROLE = 'DELETE_ROLE',
    VIEW_MASTER_DETAIL_MODEL = 'VIEW_MASTER_DETAIL_MODEL',
    EDIT_MASTER_DETAIL_MODEL = 'EDIT_MASTER_DETAIL_MODEL',
    CREATE_MASTER_DETAIL_MODEL = 'CREATE_MASTER_DETAIL_MODEL',
    DELETE_MASTER_DETAIL_MODEL = 'DELETE_MASTER_DETAIL_MODEL'
}

export const USER_PRIVILEGE_LABELS: Record<UserPrivileges, string> = {
    [UserPrivileges.CONTACT_LIST]: 'Consultation contact',
    [UserPrivileges.CONTACT_FORM]: 'Edition contact',
    [UserPrivileges.CONTACT_DELETE]: 'Suppression contact',
    [UserPrivileges.VIEW_USER]: 'Consultation utilisateurs',
    [UserPrivileges.CREATE_USER]: 'Création utilisateur',
    [UserPrivileges.EDIT_USER]: 'Modification utilisateur',
    [UserPrivileges.DELETE_USER]: 'Suppression utilisateur',
    [UserPrivileges.VIEW_ROLE]: 'Consultation rôles',
    [UserPrivileges.CREATE_ROLE]: 'Création rôle',
    [UserPrivileges.EDIT_ROLE]: 'Edition rôle',
    [UserPrivileges.DELETE_ROLE]: 'Suppression rôle',
    [UserPrivileges.VIEW_MASTER_DETAIL_MODEL]: 'Consultation Master Detail Model',
    [UserPrivileges.EDIT_MASTER_DETAIL_MODEL]: 'Edition Master Detail Model',
    [UserPrivileges.CREATE_MASTER_DETAIL_MODEL]: 'Création Master Detail Model',
    [UserPrivileges.DELETE_MASTER_DETAIL_MODEL]: 'Suppression Master Detail Model'
};

export const enum PrivilegeCategories {
    CONTACT = 'CONTACT',
    USER = 'USER',
    ROLE = 'ROLE'
}

export const PRIVILEGE_CATEGORY_LABELS = {
    [PrivilegeCategories.CONTACT]: 'Contact',
    [PrivilegeCategories.USER]: 'Utilisateur',
    [PrivilegeCategories.ROLE]: 'Rôle'
};

export const PRIVILEGE_ROUTE = 'privilege';
