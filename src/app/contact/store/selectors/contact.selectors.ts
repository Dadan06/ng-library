import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { ContactCriteria } from '../../types/contact.criteria';
import { Contact } from '../../types/contact.interface';
import { ContactState } from '../reducers/contact.reducers';

export const getContactState = createFeatureSelector<ContactState>('contact');

export const getPaginatedContacts = createSelector<ContactState, ContactState, Paginated<Contact>>(
    getContactState,
    (state: ContactState) => state.contacts
);

export const getContacts = createSelector<ContactState, Paginated<Contact>, Contact[]>(
    getPaginatedContacts,
    (paginatedContact: Paginated<Contact>) => paginatedContact.items
);

export const getContactsTotalItems = createSelector<ContactState, Paginated<Contact>, number>(
    getPaginatedContacts,
    (paginatedContact: Paginated<Contact>) => paginatedContact.totalItems
);

export const getContactsLoading = createSelector<ContactState, ContactState, boolean>(
    getContactState,
    (state: ContactState) => state.contactsLoading
);

export const getContactsLoaded = createSelector<ContactState, ContactState, boolean>(
    getContactState,
    (state: ContactState) => state.contactsLoaded
);

export const getContactCriteria = createSelector<ContactState, ContactState, ContactCriteria>(
    getContactState,
    (state: ContactState) => state.contactCriteria
);

export const getContact = createSelector<ContactState, ContactState, Contact>(
    getContactState,
    (state: ContactState) => state.contact
);

export const getContactLoading = createSelector<ContactState, ContactState, boolean>(
    getContactState,
    (state: ContactState) => state.contactLoading
);
