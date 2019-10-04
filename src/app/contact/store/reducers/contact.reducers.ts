import { Paginated } from 'src/app/shared/types/paginated.interface';
import { ContactCriteria } from '../../types/contact.criteria';
import { Contact } from '../../types/contact.interface';
import {
    ContactAction,
    ContactActionTypes,
    LoadContact,
    LoadContactFail,
    LoadContacts,
    LoadContactsFail,
    LoadContactsSuccess,
    LoadContactSuccess
} from '../actions/contact.actions';

export interface ContactState {
    contacts: Paginated<Contact>;
    contactsLoaded: boolean;
    contactsLoading: boolean;
    contactCriteria: ContactCriteria;
    contact: Contact | null;
    contactLoaded: boolean;
    contactLoading: boolean;
}

const initialState: ContactState = {
    contacts: { items: [], totalItems: 0 },
    contactsLoaded: false,
    contactsLoading: false,
    contactCriteria: { page: { page: 1, pageSize: 10 } },
    contact: undefined,
    contactLoaded: false,
    contactLoading: false
};

const loadContact = (state: ContactState, action: LoadContact): ContactState => ({
    ...state,
    contactLoaded: false,
    contactLoading: true
});

const loadContactFail = (state: ContactState, action: LoadContactFail): ContactState => ({
    ...state,
    contactLoaded: false,
    contactLoading: false
});

const loadContactSuccess = (state: ContactState, action: LoadContactSuccess): ContactState => ({
    ...state,
    contactLoaded: true,
    contactLoading: false,
    contact: action.payload
});

const loadContacts = (state: ContactState, action: LoadContacts): ContactState => ({
    ...state,
    contactsLoaded: false,
    contactsLoading: true,
    contactCriteria: action.payload
});

const loadContactsFail = (state: ContactState, action: LoadContactsFail): ContactState => ({
    ...state,
    contactsLoaded: false,
    contactsLoading: false
});

const loadContactsSuccess = (state: ContactState, action: LoadContactsSuccess): ContactState => ({
    ...state,
    contactsLoaded: true,
    contactsLoading: false,
    contacts: action.payload
});

export function contactReducer(
    state: ContactState = initialState,
    action: ContactAction
): ContactState {
    switch (action.type) {
        case ContactActionTypes.LOAD_CONTACT:
            return loadContact(state, action);
        case ContactActionTypes.LOAD_CONTACT_FAIL:
            return loadContactFail(state, action);
        case ContactActionTypes.LOAD_CONTACT_SUCCESS:
            return loadContactSuccess(state, action);
        case ContactActionTypes.LOAD_CONTACTS:
            return loadContacts(state, action);
        case ContactActionTypes.LOAD_CONTACTS_FAIL:
            return loadContactsFail(state, action);
        case ContactActionTypes.LOAD_C0NTACTS_SUCCESS:
            return loadContactsSuccess(state, action);
        default:
            return state;
    }
}
