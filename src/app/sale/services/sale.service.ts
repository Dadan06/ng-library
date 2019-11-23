import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/product/types/product.interface';
import { ApiResponse } from 'src/app/shared/types/api-response.interface';
import { User } from 'src/app/user/types/user.interface';
import { environment } from 'src/environments/environment';
import { SALE_API_ROUTE, SALE_ITEM_API_ROUTE } from '../constants/sale.constant';
import { SaleItem } from '../types/sale-item.interface';
import { Sale } from '../types/sale.interface';

@Injectable()
export class SaleService {
    constructor(private http: HttpClient) {}

    createSale(user: User): Observable<Sale> {
        return this.http
            .post(`${environment.apiBaseUrl}/${SALE_API_ROUTE}`, user)
            .pipe(map((response: ApiResponse) => response.data as Sale));
    }

    addProduct(saleId: string, product: Product): Observable<SaleItem> {
        return this.http
            .post(`${environment.apiBaseUrl}/${SALE_API_ROUTE}/${saleId}/add-product`, product)
            .pipe(map((response: ApiResponse) => response.data as SaleItem));
    }

    deleteSaleItem(saleItem: SaleItem): Observable<SaleItem> {
        return this.http
            .put(
                `${environment.apiBaseUrl}/${SALE_ITEM_API_ROUTE}/${saleItem._id}/delete`,
                saleItem
            )
            .pipe(map((response: ApiResponse) => response.data as SaleItem));
    }

    cancelSale(saleId: string): Observable<void> {
        return this.http
            .post(`${environment.apiBaseUrl}/${SALE_API_ROUTE}/${saleId}/cancel`, {})
            .pipe(map(() => null));
    }

    changeQty(saleItem: SaleItem): Observable<SaleItem> {
        return this.http
            .post(`${environment.apiBaseUrl}/${SALE_ITEM_API_ROUTE}/change-qty`, saleItem)
            .pipe(map((response: ApiResponse) => response.data as SaleItem));
    }

    saveSale(sale: Sale): Observable<void> {
        return this.http
            .post(`${environment.apiBaseUrl}/${SALE_API_ROUTE}/save`, sale)
            .pipe(map(() => null));
    }
}
