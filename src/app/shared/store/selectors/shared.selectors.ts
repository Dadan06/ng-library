import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from '../reducers/shared.reducers';

export const getSharedState = createFeatureSelector<SharedState>('shared');

export const getClients = createSelector(getSharedState, (state: SharedState) => state.clients);
