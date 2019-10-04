import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { paginate } from 'src/app/shared/utils/paginate';
import { CONTACTS_MOCK } from '../models/contacts.mock';
import { ContactCriteria } from '../types/contact.criteria';
import { Contact } from '../types/contact.interface';
import { ContactServiceInterface } from './contact-service.interface';

@Injectable()
export class ContactMockService implements ContactServiceInterface {
    loadContacts(criteria: ContactCriteria): Observable<Paginated<Contact>> {
        return of({
            items: paginate<Contact>(CONTACTS_MOCK, criteria.page),
            totalItems: CONTACTS_MOCK.length
        }).pipe(delay(1500));
    }

    loadContact(contact: Contact): Observable<Contact> {
        return of(CONTACTS_MOCK.find(ct => ct.id === contact.id)).pipe(delay(1500));
    }
}
