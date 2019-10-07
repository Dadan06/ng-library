import { Store } from '@ngrx/store';
import { Go } from 'src/app/core/store/actions/router.actions';

export const go = (store: Store<object>, path: string[]) => {
    store.dispatch(new Go({ path }));
};
