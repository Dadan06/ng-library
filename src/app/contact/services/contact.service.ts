import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/shared/types/api-response.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { flatten } from 'src/app/shared/utils/flatten';
import { environment } from 'src/environments/environment';
import { ContactCriteria } from '../types/contact.criteria';
import { Contact } from '../types/contact.interface';
import { ContactServiceInterface } from './contact-service.interface';

const NOT_IMPLEMENTED = 'Not implemented';

@Injectable()
export class ContactService implements ContactServiceInterface {
    constructor(private http: HttpClient) {}

    loadContacts(criteria: ContactCriteria): Observable<Paginated<Contact>> {
        return this.http
            .get(`${environment.apiBaseUrl}/contact`, { params: flatten(criteria) })
            .pipe(map((response: ApiResponse) => response.data as Paginated<Contact>));
    }

    loadContact(contact: Contact): Observable<Contact> {
        return this.http
            .get(`${environment.apiBaseUrl}/contact/${contact.id}`, { params: null })
            .pipe(map((response: ApiResponse) => response.data as Contact));
    }

    addContact(contact): Observable<Contact> {
        return this.http
            .post(`${environment.apiBaseUrl}/contact`, contact)
            .pipe(map((response: ApiResponse) => response.data as Contact));
    }

    updateContact(contact): Observable<Contact> {
        return this.http
            .put(`${environment.apiBaseUrl}/contact/${contact.id}`, contact)
            .pipe(map((response: ApiResponse) => response.data as Contact));
    }

    deleteContact(contact): Observable<boolean> {
        return this.http
            .delete(`${environment.apiBaseUrl}/contact/${contact.id}`)
            .pipe(
                map((response: ApiResponse) => response.message === 'Contact successfully deleted')
            );
    }
}
