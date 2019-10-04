import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/shared/types/api-response.interface';
import { MasterDetailCriteria } from '../types/master-detail-criteria.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { flatten } from 'src/app/shared/utils/flatten';
import { environment } from 'src/environments/environment';
import { MasterDetailModel } from '../types/master-detail-model.interface';
import { MasterDetailServiceInterface } from './master-detail-service.interface';
import { EMPTY_MASTER_DETAIL_MODEL, MASTER_DETAIL_API_ROUTE } from '../constants/master-detail.constants';

@Injectable()
export class MasterDetailService implements MasterDetailServiceInterface {
    constructor(private http: HttpClient) {}

    loadMasterDetailModels(criteria: MasterDetailCriteria): Observable<Paginated<MasterDetailModel>> {
        return this.http
            .get(`${environment.apiBaseUrl}/${MASTER_DETAIL_API_ROUTE}`, { params: flatten(criteria) })
            .pipe(map((response: ApiResponse) => response.data as Paginated<MasterDetailModel>));
    }

    loadMasterDetailModel(masterDetailModelId: string): Observable<MasterDetailModel> {
        return this.http
            .get(`${environment.apiBaseUrl}/${MASTER_DETAIL_API_ROUTE}/${masterDetailModelId}`)
            .pipe(map((response: ApiResponse) => response.data as MasterDetailModel));
    }

    masterDetailModelFactory(): Observable<MasterDetailModel> {
        return of(EMPTY_MASTER_DETAIL_MODEL);
    }

    deleteMasterDetailModel(masterDetailModel: MasterDetailModel): Observable<void> {
        return this.http
            .delete(`${environment.apiBaseUrl}/${MASTER_DETAIL_API_ROUTE}/${masterDetailModel._id}`)
            .pipe(map(() => null));
    }

    saveMasterDetailModel(masterDetailModel: MasterDetailModel): Observable<MasterDetailModel> {
        return masterDetailModel._id
            ? this.http
                  .put(`${environment.apiBaseUrl}/${MASTER_DETAIL_API_ROUTE}/${masterDetailModel._id}`, masterDetailModel)
                  .pipe(map((response: ApiResponse) => response.data as MasterDetailModel))
            : this.http
                  .post(`${environment.apiBaseUrl}/${MASTER_DETAIL_API_ROUTE}`, masterDetailModel)
                  .pipe(map((response: ApiResponse) => response.data as MasterDetailModel));
    }
}
