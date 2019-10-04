import { Observable } from 'rxjs';
import { MasterDetailCriteria } from '../types/master-detail-criteria.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { MasterDetailModel } from '../types/master-detail-model.interface';

export interface MasterDetailServiceInterface {
    loadMasterDetailModels(criteria: MasterDetailCriteria): Observable<Paginated<MasterDetailModel>>;
    loadMasterDetailModel(masterDetailModelId: string): Observable<MasterDetailModel>;
    masterDetailModelFactory(): Observable<MasterDetailModel>;
    deleteMasterDetailModel(masterDetailModel: MasterDetailModel): Observable<void>;
    saveMasterDetailModel(masterDetailModel: MasterDetailModel): Observable<MasterDetailModel>;
}
