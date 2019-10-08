import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/shared/types/api-response.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { flatten } from 'src/app/shared/utils/flatten';
import { SUPPLIER_API_ROUTE } from 'src/app/supplier/constants/supplier.constants';
import { Supplier } from 'src/app/supplier/types/supplier.interface';
import { environment } from 'src/environments/environment';
import { EMPTY_PRODUCT_MODEL, PRODUCT_API_ROUTE } from '../constants/product.constants';
import { ProductCriteria } from '../types/product-criteria.interface';
import { Product } from '../types/product.interface';

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) {}

    loadProducts(criteria: ProductCriteria): Observable<Paginated<Product>> {
        return this.http
            .get(`${environment.apiBaseUrl}/${PRODUCT_API_ROUTE}`, {
                params: flatten(criteria)
            })
            .pipe(map((response: ApiResponse) => response.data as Paginated<Product>));
    }

    loadProduct(masterDetailModelId: string): Observable<Product> {
        return this.http
            .get(`${environment.apiBaseUrl}/${PRODUCT_API_ROUTE}/${masterDetailModelId}`)
            .pipe(map((response: ApiResponse) => response.data as Product));
    }

    productFactory(): Observable<Product> {
        return of(EMPTY_PRODUCT_MODEL);
    }

    deleteProduct(masterDetailModel: Product): Observable<void> {
        return this.http
            .delete(`${environment.apiBaseUrl}/${PRODUCT_API_ROUTE}/${masterDetailModel._id}`)
            .pipe(map(() => null));
    }

    saveProduct(masterDetailModel: Product): Observable<Product> {
        return masterDetailModel._id
            ? this.http
                  .put(
                      `${environment.apiBaseUrl}/${PRODUCT_API_ROUTE}/${masterDetailModel._id}`,
                      masterDetailModel
                  )
                  .pipe(map((response: ApiResponse) => response.data as Product))
            : this.http
                  .post(`${environment.apiBaseUrl}/${PRODUCT_API_ROUTE}`, masterDetailModel)
                  .pipe(map((response: ApiResponse) => response.data as Product));
    }

    loadSuppliers(): Observable<Supplier[]> {
        return this.http
            .get(`${environment.apiBaseUrl}/${SUPPLIER_API_ROUTE}/all`)
            .pipe(map((response: ApiResponse) => response.data as Supplier[]));
    }
}
