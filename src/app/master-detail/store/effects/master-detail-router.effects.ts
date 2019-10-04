import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AppRouterState } from 'src/app/core/store/reducers/router.reducers';
import { MasterDetailService } from '../../services/master-detail.service';
import { MasterDetailModel } from '../../types/master-detail-model.interface';
import { LoadMasterDetailModel, LoadMasterDetailModels, LoadMasterDetailModelSuccess } from '../actions/master-detail.actions';
import { MasterDetailState } from '../reducers/master-detail.reducers';
import { getMasterDetailCriteria, getMasterDetailModels } from '../selectors/master-detail.selectors';

@Injectable()
export class MasterDetailRouterEffects {
    constructor(
        private action$: Actions,
        private store: Store<MasterDetailState>,
        private masterDetailService: MasterDetailService
    ) {}

    private mapToRouterStateUrl = (action): AppRouterState => action.payload.routerState;

    @Effect()
    masterDetailRoute$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(state => state.url.includes('master-detail')),
        withLatestFrom(
            this.store.pipe(select(getMasterDetailModels)),
            this.store.pipe(select(getMasterDetailCriteria))
        ),
        filter(([routerState, masterDetailModels]) => masterDetailModels.length === 0),
        map(([routerState, masterDetailModels, masterDetailModelCriteria]) => new LoadMasterDetailModels(masterDetailModelCriteria))
    );

    @Effect()
    masterDetailFormRoute$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(
            state => state.url.includes('master-detail/detail') || state.url.includes('master-detail/edit')
        ),
        map(routerState => new LoadMasterDetailModel(routerState.params.masterDetailModelId))
    );

    @Effect()
    masterDetailNewRoute$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(state => state.url.includes('master-detail/new')),
        switchMap(() =>
            this.masterDetailService
                .masterDetailModelFactory()
                .pipe(map((response: MasterDetailModel) => new LoadMasterDetailModelSuccess(response)))
        )
    );
}
