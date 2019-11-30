import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sale } from 'src/app/sale/types/sale.interface';
import { ApiResponse } from 'src/app/shared/types/api-response.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { flatten } from 'src/app/shared/utils/flatten';
import { environment } from 'src/environments/environment';
import { SALE_MONITORING_API_ROUTE } from '../constants/sale-monitoring.constant';
import { SaleCriteria } from '../types/sale-criteria.interface';

@Injectable()
export class SaleMonitoringService {
    constructor(private http: HttpClient) {}

    loadSales(criteria: SaleCriteria): Observable<Paginated<Sale>> {
        return this.http
            .get(`${environment.apiBaseUrl}/${SALE_MONITORING_API_ROUTE}`, {
                params: flatten(criteria)
            })
            .pipe(map((response: ApiResponse) => response.data as Paginated<Sale>));
    }
}
