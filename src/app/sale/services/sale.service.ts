import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/shared/types/api-response.interface';
import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { flatten } from 'src/app/shared/utils/flatten';
import { environment } from 'src/environments/environment';
import { PAYMENT_API_ROUTE, SALE_API_ROUTE, SALE_ITEM_API_ROUTE } from '../constants/sale.constant';
import { SaleItem } from '../types/sale-item.interface';
import { Payment, Sale } from '../types/sale.interface';

@Injectable()
export class SaleService {
    constructor(private http: HttpClient) {}

    saveSale(sale: Sale): Observable<Payment> {
        return this.http
            .post(`${environment.apiBaseUrl}/${SALE_API_ROUTE}/save`, sale)
            .pipe(map((response: ApiResponse) => response.data as Payment));
    }

    loadConsignations(criteria: ListCriteria): Observable<Paginated<Payment>> {
        return this.http
            .get(`${environment.apiBaseUrl}/${PAYMENT_API_ROUTE}/consignation`, {
                params: flatten(criteria)
            })
            .pipe(map((response: ApiResponse) => response.data as Paginated<Payment>));
    }

    loadConsignationItem(saleItemId: string): Observable<SaleItem> {
        return this.http
            .get(`${environment.apiBaseUrl}/${SALE_ITEM_API_ROUTE}/${saleItemId}`)
            .pipe(map((response: ApiResponse) => response.data as SaleItem));
    }

    saveConsignationItem(saleItem: SaleItem): Observable<SaleItem> {
        return this.http
            .put(`${environment.apiBaseUrl}/${SALE_ITEM_API_ROUTE}/${saleItem._id}`, saleItem)
            .pipe(map((response: ApiResponse) => response.data as SaleItem));
    }

    exportPdf(payment: Payment): Observable<string> {
        return this.http
            .get(`${environment.apiBaseUrl}/pdf/payment/${payment._id}`)
            .pipe(map((response: ApiResponse) => (response.data as unknown) as string));
    }
}
