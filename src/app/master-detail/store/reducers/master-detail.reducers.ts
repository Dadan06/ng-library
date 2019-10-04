import { MasterDetailCriteria } from '../../types/master-detail-criteria.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { MasterDetailModel } from '../../types/master-detail-model.interface';
import { MASTER_DETAIL_DEFAULT_CRITERIA } from '../../constants/master-detail.constants';
import {
    LoadMasterDetailModel,
    LoadMasterDetailModelFail,
    LoadMasterDetailModels,
    LoadMasterDetailModelsFail,
    LoadMasterDetailModelsSuccess,
    LoadMasterDetailModelSuccess,
    MasterDetailAction,
    MasterDetailActionTypes,
    SaveMasterDetailModel,
    SaveMasterDetailModelFail,
    SaveMasterDetailModelSuccess,
    DeleteMasterDetailModel,
    DeleteMasterDetailModelFail,
    DeleteMasterDetailModelSuccess
} from '../actions/master-detail.actions';

export interface MasterDetailState {
    masterDetailModels: Paginated<MasterDetailModel>;
    masterDetailModelsLoaded: boolean;
    masterDetailModelsLoading: boolean;
    masterDetailModelCriteria: MasterDetailCriteria;
    masterDetailModel: MasterDetailModel;
    masterDetailModelLoaded: boolean;
    masterDetailModelLoading: boolean;
    masterDetailModelSaved: boolean;
    masterDetailModelSaving: boolean;
    masterDetailModelDeleting: boolean;
    masterDetailModelDeleted: boolean;
}

const initialState: MasterDetailState = {
    masterDetailModels: { items: [], totalItems: 0 },
    masterDetailModelsLoaded: false,
    masterDetailModelsLoading: false,
    masterDetailModelCriteria: MASTER_DETAIL_DEFAULT_CRITERIA,
    masterDetailModel: undefined,
    masterDetailModelLoaded: false,
    masterDetailModelLoading: false,
    masterDetailModelSaving: false,
    masterDetailModelSaved: false,
    masterDetailModelDeleting: false,
    masterDetailModelDeleted: false
};

const loadMasterDetailModels = (state: MasterDetailState, action: LoadMasterDetailModels): MasterDetailState => ({
    ...state,
    masterDetailModelsLoading: true,
    masterDetailModelsLoaded: false,
    masterDetailModelCriteria: action.payload
});

const loadMasterDetailModelsFail = (state: MasterDetailState, action: LoadMasterDetailModelsFail): MasterDetailState => ({
    ...state,
    masterDetailModelsLoading: false,
    masterDetailModelsLoaded: false
});

const loadMasterDetailModelsSuccess = (state: MasterDetailState, action: LoadMasterDetailModelsSuccess): MasterDetailState => ({
    ...state,
    masterDetailModelsLoading: false,
    masterDetailModelsLoaded: true,
    masterDetailModels: action.payload
});

const loadMasterDetailModel = (state: MasterDetailState, action: LoadMasterDetailModel): MasterDetailState => ({
    ...state,
    masterDetailModelLoading: true,
    masterDetailModelLoaded: false
});

const loadMasterDetailModelFail = (state: MasterDetailState, action: LoadMasterDetailModelFail): MasterDetailState => ({
    ...state,
    masterDetailModelLoading: false,
    masterDetailModelLoaded: false
});

const loadMasterDetailModelSuccess = (state: MasterDetailState, action: LoadMasterDetailModelSuccess): MasterDetailState => ({
    ...state,
    masterDetailModelLoading: false,
    masterDetailModelLoaded: true,
    masterDetailModel: action.payload
});

const saveMasterDetailModel = (state: MasterDetailState, action: SaveMasterDetailModel): MasterDetailState => ({
    ...state,
    masterDetailModelSaving: true,
    masterDetailModelSaved: false
});

const saveMasterDetailModelFail = (state: MasterDetailState, action: SaveMasterDetailModelFail): MasterDetailState => ({
    ...state,
    masterDetailModelSaving: false,
    masterDetailModelSaved: false
});

const saveMasterDetailModelSuccess = (state: MasterDetailState, action: SaveMasterDetailModelSuccess): MasterDetailState => ({
    ...state,
    masterDetailModelSaving: false,
    masterDetailModelSaved: true
});

const deleteMasterDetailModel = (state: MasterDetailState, action: DeleteMasterDetailModel): MasterDetailState => ({
    ...state,
    masterDetailModelDeleting: true,
    masterDetailModelDeleted: false
});

const deleteMasterDetailModelFail = (state: MasterDetailState, action: DeleteMasterDetailModelFail): MasterDetailState => ({
    ...state,
    masterDetailModelDeleting: false,
    masterDetailModelSaved: false
});

const deleteMasterDetailModelSuccess = (state: MasterDetailState, action: DeleteMasterDetailModelSuccess): MasterDetailState => ({
    ...state,
    masterDetailModelDeleting: false,
    masterDetailModelDeleted: true
});

// tslint:disable-next-line:cyclomatic-complexity
export function masterDetailReducer(
    state: MasterDetailState = initialState,
    action: MasterDetailAction
): MasterDetailState {
    switch (action.type) {
        case MasterDetailActionTypes.LOAD_MASTER_DETAIL_MODELS:
            return loadMasterDetailModels(state, action);
        case MasterDetailActionTypes.LOAD_MASTER_DETAIL_MODELS_FAIL:
            return loadMasterDetailModelsFail(state, action);
        case MasterDetailActionTypes.LOAD_MASTER_DETAIL_MODELS_SUCCESS:
            return loadMasterDetailModelsSuccess(state, action);
        case MasterDetailActionTypes.LOAD_MASTER_DETAIL_MODEL:
            return loadMasterDetailModel(state, action);
        case MasterDetailActionTypes.LOAD_MASTER_DETAIL_MODEL_FAIL:
            return loadMasterDetailModelFail(state, action);
        case MasterDetailActionTypes.LOAD_MASTER_DETAIL_MODEL_SUCCESS:
            return loadMasterDetailModelSuccess(state, action);
        case MasterDetailActionTypes.SAVE_MASTER_DETAIL_MODEL:
            return saveMasterDetailModel(state, action);
        case MasterDetailActionTypes.SAVE_MASTER_DETAIL_MODEL_FAIL:
            return saveMasterDetailModelFail(state, action);
        case MasterDetailActionTypes.SAVE_MASTER_DETAIL_MODEL_SUCCESS:
            return saveMasterDetailModelSuccess(state, action);
        case MasterDetailActionTypes.DELETE_MASTER_DETAIL_MODEL:
            return deleteMasterDetailModel(state, action);
        case MasterDetailActionTypes.DELETE_MASTER_DETAIL_MODEL_FAIL:
            return deleteMasterDetailModelFail(state, action);
        case MasterDetailActionTypes.DELETE_MASTER_DETAIL_MODEL_SUCCESS:
            return deleteMasterDetailModelSuccess(state, action);
        default:
            return state;
    }
}
