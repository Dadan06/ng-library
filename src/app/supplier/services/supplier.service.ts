import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/shared/types/api-response.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { flatten } from 'src/app/shared/utils/flatten';
import { environment } from 'src/environments/environment';
import { EMPTY_SUPPLIER_MODEL, SUPPLIER_API_ROUTE } from '../constants/supplierl.constants';
import { SupplierCriteria } from '../types/supplier-criteria.interface';
import { Supplier } from '../types/supplier.interface';
import { SupplierServiceInterface } from './supplier-service.interface';

@Injectable()
export class SupplierService implements SupplierServiceInterface {
    constructor(private http: HttpClient) {}

    loadSuppliers(criteria: SupplierCriteria): Observable<Paginated<Supplier>> {
        return this.http
            .get(`${environment.apiBaseUrl}/${SUPPLIER_API_ROUTE}`, {
                params: flatten(criteria)
            })
            .pipe(map((response: ApiResponse) => response.data as Paginated<Supplier>));
    }

    loadSupplier(masterDetailModelId: string): Observable<Supplier> {
        return this.http
            .get(`${environment.apiBaseUrl}/${SUPPLIER_API_ROUTE}/${masterDetailModelId}`)
            .pipe(map((response: ApiResponse) => response.data as Supplier));
    }

    supplierFactory(): Observable<Supplier> {
        return of(EMPTY_SUPPLIER_MODEL);
    }

    deleteSupplier(masterDetailModel: Supplier): Observable<void> {
        return this.http
            .delete(`${environment.apiBaseUrl}/${SUPPLIER_API_ROUTE}/${masterDetailModel._id}`)
            .pipe(map(() => null));
    }

    saveSupplier(masterDetailModel: Supplier): Observable<Supplier> {
        return masterDetailModel._id
            ? this.http
                  .put(
                      `${environment.apiBaseUrl}/${SUPPLIER_API_ROUTE}/${masterDetailModel._id}`,
                      masterDetailModel
                  )
                  .pipe(map((response: ApiResponse) => response.data as Supplier))
            : this.http
                  .post(`${environment.apiBaseUrl}/${SUPPLIER_API_ROUTE}`, masterDetailModel)
                  .pipe(map((response: ApiResponse) => response.data as Supplier));
    }
}
