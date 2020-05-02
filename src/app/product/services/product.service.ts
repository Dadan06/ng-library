import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/shared/types/api-response.interface';
import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { flatten } from 'src/app/shared/utils/flatten';
import { SUPPLIER_API_ROUTE } from 'src/app/supplier/constants/supplier.constants';
import { Supplier } from 'src/app/supplier/types/supplier.interface';
import { environment } from 'src/environments/environment';
import { EMPTY_PRODUCT_MODEL, PRODUCT_API_ROUTE } from '../constants/product.constants';
import { Product } from '../types/product.interface';

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) {}

    loadProducts(criteria: ListCriteria): Observable<Paginated<Product>> {
        return this.http
            .get(`${environment.apiBaseUrl}/${PRODUCT_API_ROUTE}`, {
                params: flatten(criteria)
            })
            .pipe(map((response: ApiResponse) => response.data as Paginated<Product>));
    }

    loadProduct(productId: string): Observable<Product> {
        return this.http
            .get(`${environment.apiBaseUrl}/${PRODUCT_API_ROUTE}/${productId}`)
            .pipe(map((response: ApiResponse) => response.data as Product));
    }

    productFactory(): Observable<Product> {
        return of(EMPTY_PRODUCT_MODEL);
    }

    deleteProduct(product: Product): Observable<void> {
        return this.http
            .delete(`${environment.apiBaseUrl}/${PRODUCT_API_ROUTE}/${product._id}`)
            .pipe(map(() => null));
    }

    saveProduct(product: Product): Observable<Product> {
        return product._id
            ? this.http
                  .put(`${environment.apiBaseUrl}/${PRODUCT_API_ROUTE}/${product._id}`, product)
                  .pipe(map((response: ApiResponse) => response.data as Product))
            : this.http
                  .post(`${environment.apiBaseUrl}/${PRODUCT_API_ROUTE}`, {
                      ...product,
                      _id: undefined
                  })
                  .pipe(map((response: ApiResponse) => response.data as Product));
    }

    loadSuppliers(): Observable<Supplier[]> {
        return this.http
            .get(`${environment.apiBaseUrl}/${SUPPLIER_API_ROUTE}/all`)
            .pipe(map((response: ApiResponse) => response.data as Supplier[]));
    }

    checkDuplicate(product: Product): Observable<object | null> {
        return this.http
            .post(`${environment.apiBaseUrl}/${PRODUCT_API_ROUTE}/check-duplicate`, product)
            .pipe(
                map((response: ApiResponse) => (response.data as unknown) as boolean),
                map(hasDuplicate => (hasDuplicate ? { duplicateEntry: true } : null))
            );
    }
}
