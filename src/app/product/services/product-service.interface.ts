import { Observable } from 'rxjs';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { ProductCriteria } from '../types/product-criteria.interface';
import { Product } from '../types/product.interface';

export interface ProductServiceInterface {
    loadProducts(criteria: ProductCriteria): Observable<Paginated<Product>>;
    loadProduct(supplierModelId: string): Observable<Product>;
    productFactory(): Observable<Product>;
    deleteProduct(supplierModel: Product): Observable<void>;
    saveProduct(supplierModel: Product): Observable<Product>;
}
