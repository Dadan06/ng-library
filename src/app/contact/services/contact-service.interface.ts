import { Observable } from 'rxjs';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { ContactCriteria } from '../types/contact.criteria';
import { Contact } from '../types/contact.interface';

export interface ContactServiceInterface {
    loadContacts(criteria: ContactCriteria): Observable<Paginated<Contact>>;
    loadContact(contact: Contact): Observable<Contact>;
}
