import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/shared/types/api-response.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { flatten } from 'src/app/shared/utils/flatten';
import { environment } from 'src/environments/environment';
import { CLIENT_API_ROUTE, EMPTY_CLIENT_MODEL } from '../constants/client.constants';
import { ClientCriteria } from '../types/client-criteria.interface';
import { Client } from '../types/client.interface';

@Injectable()
export class ClientService {
    constructor(private http: HttpClient) {}

    loadClients(criteria: ClientCriteria): Observable<Paginated<Client>> {
        return this.http
            .get(`${environment.apiBaseUrl}/${CLIENT_API_ROUTE}`, {
                params: flatten(criteria)
            })
            .pipe(map((response: ApiResponse) => response.data as Paginated<Client>));
    }

    loadClient(clientId: string): Observable<Client> {
        return this.http
            .get(`${environment.apiBaseUrl}/${CLIENT_API_ROUTE}/${clientId}`)
            .pipe(map((response: ApiResponse) => response.data as Client));
    }

    clientFactory(): Observable<Client> {
        return of(EMPTY_CLIENT_MODEL);
    }

    deleteClient(client: Client): Observable<void> {
        return this.http
            .delete(`${environment.apiBaseUrl}/${CLIENT_API_ROUTE}/${client._id}`)
            .pipe(map(() => null));
    }

    saveClient(client: Client): Observable<Client> {
        return client._id
            ? this.http
                  .put(`${environment.apiBaseUrl}/${CLIENT_API_ROUTE}/${client._id}`, client)
                  .pipe(map((response: ApiResponse) => response.data as Client))
            : this.http
                  .post(`${environment.apiBaseUrl}/${CLIENT_API_ROUTE}`, client)
                  .pipe(map((response: ApiResponse) => response.data as Client));
    }
}
