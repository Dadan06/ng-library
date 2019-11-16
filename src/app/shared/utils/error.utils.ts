import { HttpErrorResponse } from '@angular/common/http';
import { MemoizedSelector, select, Store } from '@ngrx/store';

export const getErrorFrom = (
    // tslint:disable-next-line:no-any
    store: Store<any>,
    selector: MemoizedSelector<object, HttpErrorResponse>
) => {
    let err = '';
    store.pipe(select(selector)).subscribe(error => {
        if (error !== undefined) {
            err = error.error.message;
        }
    });
    return err;
};
