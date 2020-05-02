import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Supplier } from 'src/app/supplier/types/supplier.interface';
import { AUTOCOMPLETION_DEFAULT_PAGE } from '../constants/autocompletion.constant';
import {
    LoadMoreSuppliersForAutocompletion,
    LoadSuppliersForAutocompletion
} from '../store/actions/shared.actions';
import { SharedState } from '../store/reducers/shared.reducers';
import {
    getAutocompletionLoading,
    getAutocompletionSuppliers
} from '../store/selectors/shared.selectors';
import { AutocompletionService } from '../types/autocompletion-service.interface';

@Injectable()
export class SupplierAutocompletionService implements AutocompletionService<Supplier> {
    constructor(private sharedStore: Store<SharedState>) {}
    items$ = this.sharedStore.pipe(select(getAutocompletionSuppliers));
    loading$ = this.sharedStore.pipe(select(getAutocompletionLoading));
    load = criteria =>
        this.sharedStore.dispatch(
            new LoadSuppliersForAutocompletion({ ...criteria, page: AUTOCOMPLETION_DEFAULT_PAGE })
        );
    loadMore = () => this.sharedStore.dispatch(new LoadMoreSuppliersForAutocompletion());
}
