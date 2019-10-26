import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client, ClientType } from '../../types/client.interface';

@Component({
    selector: 'app-client-list',
    templateUrl: './client-list.component.html',
    styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent {
    @Input() clients: Client[];
    @Input() currentClient: Client;
    @Input() editEnabled = true;
    @Input() deleteEnabled = true;
    @Output() view: EventEmitter<Client> = new EventEmitter<Client>();
    @Output() edit: EventEmitter<Client> = new EventEmitter<Client>();
    @Output() delete: EventEmitter<Client> = new EventEmitter<Client>();
    clientTypes = {
        [ClientType.PARTICULAR]: 'PARTICULIER',
        [ClientType.GROUP]: 'GROUPE'
    };
}
