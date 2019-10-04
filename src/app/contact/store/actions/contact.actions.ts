import { Action } from '@ngrx/store';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { ContactCriteria } from '../../types/contact.criteria';
import { Contact } from '../../types/contact.interface';

export const enum ContactActionTypes {
    LOAD_CONTACT = '[Contact] Load Contact',
    LOAD_CONTACT_FAIL = '[Contact] Load Contact Fail',
    LOAD_CONTACT_SUCCESS = '[Contact] Load Contact Success',
    LOAD_CONTACTS = '[Contact] Load Contacts',
    LOAD_CONTACTS_FAIL = '[Contact] Load Contacts Fail',
    LOAD_C0NTACTS_SUCCESS = '[Contact] Load Contacts Success'
}

export class LoadContact implements Action {
    readonly type = ContactActionTypes.LOAD_CONTACT;
    constructor(public payload: Contact) {}
}

export class LoadContactFail implements Action {
    readonly type = ContactActionTypes.LOAD_CONTACT_FAIL;
    constructor(public payload: Error) {}
}

export class LoadContactSuccess implements Action {
    readonly type = ContactActionTypes.LOAD_CONTACT_SUCCESS;
    constructor(public payload: Contact) {}
}

export class LoadContacts implements Action {
    readonly type = ContactActionTypes.LOAD_CONTACTS;
    constructor(public payload: ContactCriteria) {}
}

export class LoadContactsFail implements Action {
    readonly type = ContactActionTypes.LOAD_CONTACTS_FAIL;
    constructor(public payload: Error) {}
}

export class LoadContactsSuccess implements Action {
    readonly type = ContactActionTypes.LOAD_C0NTACTS_SUCCESS;
    constructor(public payload: Paginated<Contact>) {}
}

export type ContactAction =
    | LoadContacts
    | LoadContactsFail
    | LoadContactsSuccess
    | LoadContact
    | LoadContactFail
    | LoadContactSuccess;
