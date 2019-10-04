import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MasterDetailCriteria } from '../types/master-detail-criteria.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { paginate } from 'src/app/shared/utils/paginate';
import { MasterDetailModel } from '../types/master-detail-model.interface';
import { MASTER_DETAIL_MODELS_MOCK } from '../models/master-detail.mock';
import { MasterDetailServiceInterface } from './master-detail-service.interface';
import { EMPTY_MASTER_DETAIL_MODEL } from '../constants/master-detail.constants';

@Injectable()
export class MasterDetailMockService implements MasterDetailServiceInterface {
    loadMasterDetailModels(criteria: MasterDetailCriteria): Observable<Paginated<MasterDetailModel>> {
        return of({
            items: paginate(MASTER_DETAIL_MODELS_MOCK, criteria.page),
            totalItems: MASTER_DETAIL_MODELS_MOCK.length
        }).pipe(delay(1500));
    }

    loadMasterDetailModel(masterDetailModelId: string): Observable<MasterDetailModel> {
        return of(MASTER_DETAIL_MODELS_MOCK.find(p => p._id === masterDetailModelId));
    }

    masterDetailModelFactory(): Observable<MasterDetailModel> {
        return of(EMPTY_MASTER_DETAIL_MODEL);
    }

    deleteMasterDetailModel(masterDetailModel: MasterDetailModel): Observable<void> {
        return of(null);
    }

    saveMasterDetailModel(masterDetailModel: MasterDetailModel): Observable<MasterDetailModel> {
        return of(masterDetailModel);
    }
}
