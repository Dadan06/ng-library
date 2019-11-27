// @ts-ignore
import * as cloneDeep from 'lodash/cloneDeep';
import { PeriodFilter } from '../types/period-filter.interface';

const PERIOD_FILTER_LOCAL_STORAGE_KEY = 'period-filter';

const getSavedPeriodFilter = (): PeriodFilter | null => {
    const { from = null, to = null } =
        JSON.parse(localStorage.getItem(PERIOD_FILTER_LOCAL_STORAGE_KEY)) || {};
    return from && to && { from, to };
};

export const clearSavedPeriodFilter = () =>
    localStorage.removeItem(PERIOD_FILTER_LOCAL_STORAGE_KEY);

export const savePeriodFilter = (periodFilter: PeriodFilter): void =>
    localStorage.setItem(PERIOD_FILTER_LOCAL_STORAGE_KEY, JSON.stringify(periodFilter));

export const getCriteriaFromLocalStorageIfAny = defaultCriteria => {
    const savedPeriodFilter = getSavedPeriodFilter();
    if (savedPeriodFilter) {
        const criteria = cloneDeep(defaultCriteria);
        return {
            ...criteria,
            filter: { ...criteria.filter, ...savedPeriodFilter }
        };
    }
    return cloneDeep(defaultCriteria);
};
