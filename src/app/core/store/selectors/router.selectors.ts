import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppRouterState } from '../reducers/router.reducers';

export const getRouterState = createFeatureSelector<RouterReducerState<AppRouterState>>('router');

export const getUrl = createSelector<AppRouterState, RouterReducerState<AppRouterState>, string>(
    getRouterState,
    router => router.state.url
);
