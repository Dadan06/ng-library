import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ModalComponent } from 'angular-custom-modal';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/types/page.interface';
import { LoadContact, LoadContacts } from '../../store/actions/contact.actions';
import { ContactState } from '../../store/reducers/contact.reducers';
import {
    getContact,
    getContactLoading,
    getContacts,
    getContactsLoading,
    getContactsTotalItems
} from '../../store/selectors/contact.selectors';
import { ContactCriteria } from '../../types/contact.criteria';
import { Contact } from '../../types/contact.interface';

@Component({
    selector: 'app-contact-root',
    templateUrl: './contact-root.component.html',
    styleUrls: ['./contact-root.component.scss']
})
export class ContactRootComponent implements OnInit {
    contacts$: Observable<Contact[]>;
    contactsLoading$: Observable<boolean>;
    contactsTotalItems$: Observable<number>;
    contact$: Observable<Contact>;
    contactLoading$: Observable<boolean>;
    contactCriteria: ContactCriteria = { page: { page: 1, pageSize: 10 } };
    @ViewChild('errorModal') errorModal: ModalComponent;

    constructor(private store: Store<ContactState>) {}

    ngOnInit() {
        this.contacts$ = this.store.pipe(select(getContacts));
        this.contactsLoading$ = this.store.pipe(select(getContactsLoading));
        this.contactsTotalItems$ = this.store.pipe(select(getContactsTotalItems));
        this.contact$ = this.store.pipe(select(getContact));
        this.contactLoading$ = this.store.pipe(select(getContactLoading));
    }

    onSelect(contact: Contact) {
        this.store.dispatch(new LoadContact(contact));
    }

    onPaginate(page: Page) {
        this.contactCriteria.page = page;
        this.store.dispatch(new LoadContacts({ ...this.contactCriteria }));
    }

    showPopupModal() {
        this.errorModal.open();
    }
}
