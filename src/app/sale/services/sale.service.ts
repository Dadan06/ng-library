import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/product/types/product.interface';
import { ApiResponse } from 'src/app/shared/types/api-response.interface';
import { User } from 'src/app/user/types/user.interface';
import { environment } from 'src/environments/environment';
import { SaleItem } from '../types/sale-item.interface';
import { Sale } from '../types/sale.interface';

@Injectable()
export class SaleService {
    constructor(private http: HttpClient) {}

    createSale(user: User): Observable<Sale> {
        return this.http
            .post(`${environment.apiBaseUrl}/sale`, user)
            .pipe(map((response: ApiResponse) => response.data as Sale));
    }

    addProduct(saleId: string, product: Product): Observable<SaleItem> {
        return this.http
            .post(`${environment.apiBaseUrl}/sale/${saleId}/add-product`, product)
            .pipe(map((response: ApiResponse) => response.data as SaleItem));
    }

    deleteSaleItem(saleItem: SaleItem): Observable<SaleItem> {
        return this.http
            .put(`${environment.apiBaseUrl}/sale-item/${saleItem._id}/delete`, saleItem)
            .pipe(map((response: ApiResponse) => response.data as SaleItem));
    }
}
