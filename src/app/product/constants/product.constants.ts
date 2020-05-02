import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { SortDirection } from 'src/app/shared/types/sort.interface';
import { Product, Type } from '../types/product.interface';

export const PRODUCT_DEFAULT_CRITERIA: ListCriteria = {
    page: { page: 1, pageSize: 15 },
    search: '',
    sort: { by: 'name', direction: SortDirection.asc }
};

export const EMPTY_PRODUCT_MODEL: Product = {
    _id: null,
    name: null,
    costPrice: 0,
    sellingPrice: 0,
    quantity: 0,
    type: Type.DATED,
    supplier: null
};

export const PRODUCT_API_ROUTE = 'product';

export const PRODUCT_BASE_ROUTE = '/root/home/product';

export const TYPE_LABELS = {
    [Type.DATED]: 'Daté',
    [Type.UNDATED]: 'Non daté'
};
