import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/shared/types/api-response.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { flatten } from 'src/app/shared/utils/flatten';
import { environment } from 'src/environments/environment';
import { EMPTY_SUPPLIER_MODEL, SUPPLIER_API_ROUTE } from '../constants/supplier.constants';
import { SupplierCriteria } from '../types/supplier-criteria.interface';
import { Supplier } from '../types/supplier.interface';

@Injectable()
export class SupplierService {
    constructor(private http: HttpClient) {}

    loadSuppliers(criteria: SupplierCriteria): Observable<Paginated<Supplier>> {
        return this.http
            .get(`${environment.apiBaseUrl}/${SUPPLIER_API_ROUTE}`, {
                params: flatten(criteria)
            })
            .pipe(map((response: ApiResponse) => response.data as Paginated<Supplier>));
    }

    loadSupplier(supplierId: string): Observable<Supplier> {
        return this.http
            .get(`${environment.apiBaseUrl}/${SUPPLIER_API_ROUTE}/${supplierId}`)
            .pipe(map((response: ApiResponse) => response.data as Supplier));
    }

    supplierFactory(): Observable<Supplier> {
        return of(EMPTY_SUPPLIER_MODEL);
    }

    deleteSupplier(supplier: Supplier): Observable<void> {
        return this.http
            .delete(`${environment.apiBaseUrl}/${SUPPLIER_API_ROUTE}/${supplier._id}`)
            .pipe(map(() => null));
    }

    saveSupplier(supplier: Supplier): Observable<Supplier> {
        return supplier._id
            ? this.http
                  .put(`${environment.apiBaseUrl}/${SUPPLIER_API_ROUTE}/${supplier._id}`, supplier)
                  .pipe(map((response: ApiResponse) => response.data as Supplier))
            : this.http
                  .post(`${environment.apiBaseUrl}/${SUPPLIER_API_ROUTE}`, supplier)
                  .pipe(map((response: ApiResponse) => response.data as Supplier));
    }
}
