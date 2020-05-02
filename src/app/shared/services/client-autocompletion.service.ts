import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Client } from 'src/app/client/types/client.interface';
import { AUTOCOMPLETION_DEFAULT_PAGE } from '../constants/autocompletion.constant';
import {
    LoadClientsForAutocompletion,
    LoadMoreClientsForAutocompletion
} from '../store/actions/shared.actions';
import { SharedState } from '../store/reducers/shared.reducers';
import {
    getAutocompletionClients,
    getAutocompletionLoading
} from '../store/selectors/shared.selectors';
import { AutocompletionService } from '../types/autocompletion-service.interface';

@Injectable()
export class ClientAutocompletionService implements AutocompletionService<Client> {
    constructor(private sharedStore: Store<SharedState>) {}
    items$ = this.sharedStore.pipe(select(getAutocompletionClients));
    loading$ = this.sharedStore.pipe(select(getAutocompletionLoading));
    load = criteria =>
        this.sharedStore.dispatch(
            new LoadClientsForAutocompletion({ ...criteria, page: AUTOCOMPLETION_DEFAULT_PAGE })
        );
    loadMore = () => this.sharedStore.dispatch(new LoadMoreClientsForAutocompletion());
}
