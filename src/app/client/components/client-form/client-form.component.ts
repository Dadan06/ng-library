import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormAsTouchedAndDirty } from 'src/app/shared/utils/form.utils';
import { Client, ClientType } from '../../types/client.interface';

@Component({
    selector: 'app-client-form',
    templateUrl: './client-form.component.html',
    styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent {
    @Input() isEditing: boolean;
    @Input() set client(client: Client) {
        if (client) {
            this.form = this.initForm(client);
            this.isEditing ? this.form.enable() : this.form.disable();
            setTimeout(() => this.isEditing && this.setFocusOnFirstInput());
        }
    }
    @Input() editEnabled = true;

    @Output() edit: EventEmitter<Client> = new EventEmitter<Client>();
    @Output() save: EventEmitter<Client> = new EventEmitter<Client>();
    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
    @Output() close: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild('first') firstInput: ElementRef;

    form: FormGroup;
    clientTypes = [
        { value: ClientType.PARTICULAR, label: 'PARTICULIER' },
        { value: ClientType.GROUP, label: 'GROUPE' }
    ];

    constructor(private formBuilder: FormBuilder) {}

    onSubmit(form: FormGroup) {
        this.form.valid ? this.save.emit(form.value) : this.showErrors();
    }

    private setFocusOnFirstInput() {
        this.firstInput.nativeElement.focus();
    }

    private showErrors() {
        markFormAsTouchedAndDirty(this.form);
    }

    private initForm(client: Client): FormGroup {
        return this.formBuilder.group({
            _id: [client._id],
            name: [client.name, Validators.required],
            email: [client.email, Validators.email],
            remark: [client.remark],
            address: [client.address, Validators.required],
            contact: [client.contact, Validators.required],
            type: [client.type, Validators.required]
        });
    }
}
