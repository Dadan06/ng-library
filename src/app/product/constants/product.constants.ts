import { ProductCriteria } from '../types/product-criteria.interface';
import { Product } from '../types/product.interface';

export const PRODUCT_DEFAULT_CRITERIA: ProductCriteria = {
    page: { page: 1, pageSize: 15 },
    search: ''
};

export const EMPTY_PRODUCT_MODEL: Product = {
    _id: null,
    name: null,
    costPrice: 0,
    sellingPrice: 0,
    quantity: 0,
    supplier: null
};

export const PRODUCT_API_ROUTE = 'product';

export const PRODUCT_BASE_ROUTE = '/root/home/product';
