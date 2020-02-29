import { MemoizedSelector, select, Store } from '@ngrx/store';
import { ModalComponent } from 'angular-custom-modal';
import { filter, skip } from 'rxjs/operators';

export const subscribeModal = (
    // tslint:disable-next-line:no-any
    store: Store<any>,
    selector: MemoizedSelector<object, boolean>,
    compareWith: boolean,
    modal: ModalComponent
) =>
    store
        .pipe(
            select(selector),
            skip(1),
            filter(res => res === compareWith)
        )
        .subscribe(() => modal.open());
