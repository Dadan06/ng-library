import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../types/contact.interface';
import {
    ContactActionTypes,
    LoadContact,
    LoadContactFail,
    LoadContacts,
    LoadContactsFail,
    LoadContactsSuccess,
    LoadContactSuccess
} from '../actions/contact.actions';

@Injectable()
export class ContactEffects {
    constructor(private action$: Actions, private contactService: ContactService) {}

    @Effect()
    loadContact$ = this.action$.pipe(
        ofType(ContactActionTypes.LOAD_CONTACT),
        switchMap((action: LoadContact) =>
            this.contactService.loadContact(action.payload).pipe(
                map((response: Contact) => new LoadContactSuccess(response)),
                catchError(error => of(new LoadContactFail(error)))
            )
        )
    );

    @Effect()
    loadContacts$ = this.action$.pipe(
        ofType(ContactActionTypes.LOAD_CONTACTS),
        switchMap((action: LoadContacts) =>
            this.contactService.loadContacts(action.payload).pipe(
                map((response: Paginated<Contact>) => new LoadContactsSuccess(response)),
                catchError(error => of(new LoadContactsFail(error)))
            )
        )
    );
}
