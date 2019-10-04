import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../types/contact.interface';

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {
    @Input() contacts: Contact[];
    @Output() select: EventEmitter<Contact> = new EventEmitter<Contact>();
}
