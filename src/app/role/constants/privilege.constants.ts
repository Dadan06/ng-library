export const enum UserPrivileges {
    VIEW_USER = 'VIEW_USER',
    CREATE_USER = 'CREATE_USER',
    EDIT_USER = 'EDIT_USER',
    DELETE_USER = 'DELETE_USER',
    VIEW_ROLE = 'VIEW_ROLE',
    CREATE_ROLE = 'CREATE_ROLE',
    EDIT_ROLE = 'EDIT_ROLE',
    DELETE_ROLE = 'DELETE_ROLE',
    VIEW_PRODUCT = 'VIEW_PRODUCT',
    CREATE_PRODUCT = 'CREATE_PRODUCT',
    EDIT_PRODUCT = 'EDIT_PRODUCT',
    DELETE_PRODUCT = 'DELETE_PRODUCT',
    VIEW_SUPPLIER = 'VIEW_SUPPLIER',
    CREATE_SUPPLIER = 'CREATE_SUPPLIER',
    EDIT_SUPPLIER = 'EDIT_SUPPLIER',
    DELETE_SUPPLIER = 'DELETE_SUPPLIER',
    VIEW_SALES = 'VIEW_SALES',
    CREATE_SALE = 'CREATE_SALE',
    SALE_MONITORING = 'SALE_MONITORING',
    VIEW_CLIENT = 'VIEW_CLIENT',
    CREATE_CLIENT = 'CREATE_CLIENT',
    EDIT_CLIENT = 'EDIT_CLIENT',
    DELETE_CLIENT = 'DELETE_CLIENT',
    VIEW_CONSIGNATIONS = 'VIEW_CONSIGNATIONS',
    EDIT_CONSIGNATION = 'EDIT_CONSIGNATION'
}

export const USER_PRIVILEGE_LABELS: Record<UserPrivileges, string> = {
    [UserPrivileges.VIEW_USER]: 'Consultation utilisateurs',
    [UserPrivileges.CREATE_USER]: 'Création utilisateur',
    [UserPrivileges.EDIT_USER]: 'Edition utilisateur',
    [UserPrivileges.DELETE_USER]: 'Suppression utilisateur',
    [UserPrivileges.VIEW_ROLE]: 'Consultation rôles',
    [UserPrivileges.CREATE_ROLE]: 'Création rôle',
    [UserPrivileges.EDIT_ROLE]: 'Edition rôle',
    [UserPrivileges.DELETE_ROLE]: 'Suppression rôle',
    [UserPrivileges.VIEW_PRODUCT]: 'Consultation produits',
    [UserPrivileges.CREATE_PRODUCT]: 'Création produit',
    [UserPrivileges.EDIT_PRODUCT]: 'Edition produit',
    [UserPrivileges.DELETE_PRODUCT]: 'Suppression produit',
    [UserPrivileges.VIEW_SUPPLIER]: 'Consultation fournisseurs',
    [UserPrivileges.CREATE_SUPPLIER]: 'Création fournisseur',
    [UserPrivileges.EDIT_SUPPLIER]: 'Edition fournisseur',
    [UserPrivileges.DELETE_SUPPLIER]: 'Suppression fournisseur',
    [UserPrivileges.VIEW_SALES]: 'Consultation ventes',
    [UserPrivileges.CREATE_SALE]: 'Création vente',
    [UserPrivileges.SALE_MONITORING]: 'Suivi vente',
    [UserPrivileges.VIEW_CLIENT]: 'Consultation clients',
    [UserPrivileges.CREATE_CLIENT]: 'Création client',
    [UserPrivileges.EDIT_CLIENT]: 'Edition client',
    [UserPrivileges.DELETE_CLIENT]: 'Suppression client',
    [UserPrivileges.VIEW_CONSIGNATIONS]: 'Consultation consignations',
    [UserPrivileges.EDIT_CONSIGNATION]: 'Edition consignation'
};

export const enum PrivilegeCategories {
    CONTACT = 'CONTACT',
    USER = 'USER',
    ROLE = 'ROLE',
    PRODUCT = 'PRODUCT',
    SUPPLIER = 'SUPPLIER',
    SALE = 'SALE',
    CLIENT = 'CLIENT'
}

export const PRIVILEGE_CATEGORY_LABELS = {
    [PrivilegeCategories.CONTACT]: 'Contact',
    [PrivilegeCategories.USER]: 'Utilisateur',
    [PrivilegeCategories.ROLE]: 'Rôle',
    [PrivilegeCategories.PRODUCT]: 'Produit',
    [PrivilegeCategories.SUPPLIER]: 'Fournisseur',
    [PrivilegeCategories.SALE]: 'Vente',
    [PrivilegeCategories.CLIENT]: 'Client'
};

export const PRIVILEGE_ROUTE = 'privilege';
