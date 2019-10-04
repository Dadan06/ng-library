import { MasterDetailCriteria } from '../types/master-detail-criteria.interface';
import { MasterDetailModel } from '../types/master-detail-model.interface';

export const MASTER_DETAIL_DEFAULT_CRITERIA: MasterDetailCriteria = {
    page: { page: 1, pageSize: 15 },
    search: ''
};

export const EMPTY_MASTER_DETAIL_MODEL: MasterDetailModel = {
    _id: null,
    prop1: '',
    prop2: '',
    prop3: '',
    prop4: ''
};

export const MASTER_DETAIL_API_ROUTE = 'master-detail';

export const MASTER_DETAIL_BASE_ROUTE = '/root/home/master-detail';
