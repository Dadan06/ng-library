import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { Go } from 'src/app/core/store/actions/router.actions';
import { MASTER_DETAIL_BASE_ROUTE } from '../../constants/master-detail.constants';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { MasterDetailModel } from '../../types/master-detail-model.interface';
import { MasterDetailService } from '../../services/master-detail.service';
import {
    DeleteMasterDetailModel,
    DeleteMasterDetailModelFail,
    DeleteMasterDetailModelSuccess,
    LoadMasterDetailModel,
    LoadMasterDetailModelFail,
    LoadMasterDetailModels,
    LoadMasterDetailModelsFail,
    LoadMasterDetailModelsSuccess,
    LoadMasterDetailModelSuccess,
    MasterDetailActionTypes,
    SaveMasterDetailModel,
    SaveMasterDetailModelFail,
    SaveMasterDetailModelSuccess
} from '../actions/master-detail.actions';
import { MasterDetailState } from '../reducers/master-detail.reducers';
import { getMasterDetailCriteria } from '../selectors/master-detail.selectors';

@Injectable()
export class MasterDetailEffects {
    constructor(
        private action$: Actions,
        private masterDetailService: MasterDetailService,
        private store: Store<MasterDetailState>
    ) {}

    @Effect()
    loadMasterDetailModels$ = this.action$.pipe(
        ofType(MasterDetailActionTypes.LOAD_MASTER_DETAIL_MODELS),
        switchMap(
            (action: LoadMasterDetailModels): Observable<Paginated<MasterDetailModel>> =>
                this.masterDetailService.loadMasterDetailModels(action.payload)
        ),
        map((response: Paginated<MasterDetailModel>) => new LoadMasterDetailModelsSuccess(response)),
        catchError(error => of(new LoadMasterDetailModelsFail(error)))
    );

    @Effect()
    loadMasterDetailModel$ = this.action$.pipe(
        ofType(MasterDetailActionTypes.LOAD_MASTER_DETAIL_MODEL),
        switchMap(
            (action: LoadMasterDetailModel): Observable<MasterDetailModel> =>
                this.masterDetailService.loadMasterDetailModel(action.payload)
        ),
        map((response: MasterDetailModel) => new LoadMasterDetailModelSuccess(response)),
        catchError(error => of(new LoadMasterDetailModelFail(error)))
    );

    @Effect()
    saveMasterDetailModel$ = this.action$.pipe(
        ofType(MasterDetailActionTypes.SAVE_MASTER_DETAIL_MODEL),
        switchMap(
            (action: SaveMasterDetailModel): Observable<MasterDetailModel> =>
                this.masterDetailService.saveMasterDetailModel(action.payload)
        ),
        map((response: MasterDetailModel) => new SaveMasterDetailModelSuccess(response)),
        catchError(error => of(new SaveMasterDetailModelFail(error)))
    );

    @Effect()
    saveMasterDetailModelSuccess$ = this.action$.pipe(
        ofType(MasterDetailActionTypes.SAVE_MASTER_DETAIL_MODEL_SUCCESS),
        withLatestFrom(this.store.pipe(select(getMasterDetailCriteria))),
        map(([action, criteria]) => new LoadMasterDetailModels(criteria))
    );

    @Effect()
    deleteMasterDetailModel$ = this.action$.pipe(
        ofType(MasterDetailActionTypes.DELETE_MASTER_DETAIL_MODEL),
        switchMap(
            (action: DeleteMasterDetailModel): Observable<void> =>
                this.masterDetailService.deleteMasterDetailModel(action.payload)
        ),
        mergeMap(() => [
            new DeleteMasterDetailModelSuccess(),
            new Go({
                path: [`${MASTER_DETAIL_BASE_ROUTE}`]
            })
        ]),
        catchError(error => of(new DeleteMasterDetailModelFail(error)))
    );

    @Effect()
    deleteMasterDetailModelSuccess$ = this.action$.pipe(
        ofType(MasterDetailActionTypes.DELETE_MASTER_DETAIL_MODEL_SUCCESS),
        withLatestFrom(this.store.pipe(select(getMasterDetailCriteria))),
        map(([action, criteria]) => new LoadMasterDetailModels(criteria))
    );
}
