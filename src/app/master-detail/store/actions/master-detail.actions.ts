import { Action } from '@ngrx/store';
import { MasterDetailCriteria } from '../../types/master-detail-criteria.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { MasterDetailModel } from '../../types/master-detail-model.interface';

export const enum MasterDetailActionTypes {
    LOAD_MASTER_DETAIL_MODELS = '[MasterDetail] Load MasterDetailModels',
    LOAD_MASTER_DETAIL_MODELS_FAIL = '[MasterDetail] Load MasterDetailModels Fail',
    LOAD_MASTER_DETAIL_MODELS_SUCCESS = '[MasterDetail] Load MasterDetailModels Success',
    LOAD_MASTER_DETAIL_MODEL = '[MasterDetail] Load MasterDetailModel',
    LOAD_MASTER_DETAIL_MODEL_FAIL = '[MasterDetail] Load MasterDetailModel Fail',
    LOAD_MASTER_DETAIL_MODEL_SUCCESS = '[MasterDetail] Load MasterDetailModel Success',
    DELETE_MASTER_DETAIL_MODEL = '[MasterDetail] Delete MasterDetailModel',
    DELETE_MASTER_DETAIL_MODEL_FAIL = '[MasterDetail] Delete MasterDetailModel Fail',
    DELETE_MASTER_DETAIL_MODEL_SUCCESS = '[MasterDetail] Delete MasterDetailModel Success',
    SAVE_MASTER_DETAIL_MODEL = '[MasterDetail] Save MasterDetailModel',
    SAVE_MASTER_DETAIL_MODEL_FAIL = '[MasterDetail] Save MasterDetailModel Fail',
    SAVE_MASTER_DETAIL_MODEL_SUCCESS = '[MasterDetail] Save MasterDetailModel Success'
}

export class LoadMasterDetailModels implements Action {
    readonly type = MasterDetailActionTypes.LOAD_MASTER_DETAIL_MODELS;
    constructor(public payload: MasterDetailCriteria) {}
}

export class LoadMasterDetailModelsSuccess implements Action {
    readonly type = MasterDetailActionTypes.LOAD_MASTER_DETAIL_MODELS_SUCCESS;
    constructor(public payload: Paginated<MasterDetailModel>) {}
}

export class LoadMasterDetailModelsFail implements Action {
    readonly type = MasterDetailActionTypes.LOAD_MASTER_DETAIL_MODELS_FAIL;
    constructor(public payload: Error) {}
}

export class LoadMasterDetailModel implements Action {
    readonly type = MasterDetailActionTypes.LOAD_MASTER_DETAIL_MODEL;
    constructor(public payload: string) {}
}

export class LoadMasterDetailModelSuccess implements Action {
    readonly type = MasterDetailActionTypes.LOAD_MASTER_DETAIL_MODEL_SUCCESS;
    constructor(public payload: MasterDetailModel) {}
}

export class LoadMasterDetailModelFail implements Action {
    readonly type = MasterDetailActionTypes.LOAD_MASTER_DETAIL_MODEL_FAIL;
    constructor(public payload: Error) {}
}

export class SaveMasterDetailModel implements Action {
    readonly type = MasterDetailActionTypes.SAVE_MASTER_DETAIL_MODEL;
    constructor(public payload: MasterDetailModel) {}
}

export class SaveMasterDetailModelFail implements Action {
    readonly type = MasterDetailActionTypes.SAVE_MASTER_DETAIL_MODEL_FAIL;
    constructor(public payload: Error) {}
}

export class SaveMasterDetailModelSuccess implements Action {
    readonly type = MasterDetailActionTypes.SAVE_MASTER_DETAIL_MODEL_SUCCESS;
    constructor(public payload: MasterDetailModel) {}
}

export class DeleteMasterDetailModel implements Action {
    readonly type = MasterDetailActionTypes.DELETE_MASTER_DETAIL_MODEL;
    constructor(public payload: MasterDetailModel) {}
}

export class DeleteMasterDetailModelFail implements Action {
    readonly type = MasterDetailActionTypes.DELETE_MASTER_DETAIL_MODEL_FAIL;
    constructor(public payload: Error) {}
}

export class DeleteMasterDetailModelSuccess implements Action {
    readonly type = MasterDetailActionTypes.DELETE_MASTER_DETAIL_MODEL_SUCCESS;
}

export type MasterDetailAction =
    | LoadMasterDetailModels
    | LoadMasterDetailModelsSuccess
    | LoadMasterDetailModelsFail
    | LoadMasterDetailModel
    | LoadMasterDetailModelSuccess
    | LoadMasterDetailModelFail
    | DeleteMasterDetailModel
    | DeleteMasterDetailModelFail
    | DeleteMasterDetailModelSuccess
    | SaveMasterDetailModel
    | SaveMasterDetailModelFail
    | SaveMasterDetailModelSuccess;
