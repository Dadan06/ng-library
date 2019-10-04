import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { getUserPrivileges } from 'src/app/authentication/store/selectors/authentication.selectors';
import { UserPrivileges } from 'src/app/role/constants/privilege.constants';
import { Privilege } from 'src/app/role/types/privilege.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { AppRouterState } from '../../../core/store/reducers/router.reducers';
import { getRouterState } from '../../../core/store/selectors/router.selectors';
import { MasterDetailModel } from '../../types/master-detail-model.interface';
import { MasterDetailState } from '../reducers/master-detail.reducers';

export const getMasterDetailState = createFeatureSelector<MasterDetailState>('master-detail');

export const getPaginatedMasterDetailModels = createSelector(
    getMasterDetailState,
    (state: MasterDetailState) => state.masterDetailModels
);

export const getMasterDetailModels = createSelector(
    getPaginatedMasterDetailModels,
    (paginatedMasterDetailModels: Paginated<MasterDetailModel>) => paginatedMasterDetailModels.items
);

export const getMasterDetailModelsTotalItems = createSelector(
    getPaginatedMasterDetailModels,
    (paginatedMasterDetailModels: Paginated<MasterDetailModel>) =>
        paginatedMasterDetailModels.totalItems
);

export const getMasterDetailCriteria = createSelector(
    getMasterDetailState,
    (state: MasterDetailState) => state.masterDetailModelCriteria
);

export const getMasterDetailModelsLoading = createSelector<
    MasterDetailState,
    MasterDetailState,
    boolean
>(
    getMasterDetailState,
    (state: MasterDetailState) => state.masterDetailModelsLoading
);

export const getMasterDetailModel = createSelector(
    getMasterDetailState,
    (state: MasterDetailState) => state.masterDetailModel
);

export const getMasterDetailModelLoading = createSelector<
    MasterDetailState,
    MasterDetailState,
    boolean
>(
    getMasterDetailState,
    (state: MasterDetailState) => state.masterDetailModelLoading
);

export const getMasterDetailModelSaving = createSelector<
    MasterDetailState,
    MasterDetailState,
    boolean
>(
    getMasterDetailState,
    (state: MasterDetailState) => state.masterDetailModelSaving
);

export const getMasterDetailModelSaved = createSelector<
    MasterDetailState,
    MasterDetailState,
    boolean
>(
    getMasterDetailState,
    (state: MasterDetailState) => state.masterDetailModelSaved
);

export const getMasterDetailModelEditEnabled = createSelector<
    AuthenticationState,
    Privilege[],
    boolean
>(
    getUserPrivileges,
    (privileges: Privilege[]) =>
        privileges.some(p => p.name === UserPrivileges.EDIT_MASTER_DETAIL_MODEL)
);

export const getMasterDetailModelDeleteEnabled = createSelector<
    AuthenticationState,
    Privilege[],
    boolean
>(
    getUserPrivileges,
    (privileges: Privilege[]) =>
        privileges.some(p => p.name === UserPrivileges.DELETE_MASTER_DETAIL_MODEL)
);

export const getMasterDetailModelCreateEnabled = createSelector<
    AuthenticationState,
    Privilege[],
    boolean
>(
    getUserPrivileges,
    (privileges: Privilege[]) =>
        privileges.some(p => p.name === UserPrivileges.CREATE_MASTER_DETAIL_MODEL)
);

export const getMasterDetailModelEditing = createSelector<
    MasterDetailState,
    RouterReducerState<AppRouterState>,
    boolean
>(
    getRouterState,
    router =>
        router.state.url.includes('master-detail/edit') ||
        router.state.url.includes('master-detail/new')
);
