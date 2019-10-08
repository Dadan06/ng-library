import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormAsTouchedAndDirty } from 'src/app/shared/utils/form.utils';
import { Credentials } from '../../types/credentials.interface';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
    form: FormGroup;
    @Output() logIn: EventEmitter<Credentials> = new EventEmitter<Credentials>();
    @Input() loginErrorMessage: string;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.form = this.initForm();
    }

    onSubmit() {
        this.form.valid ? this.logIn.emit(this.form.value) : markFormAsTouchedAndDirty(this.form);
    }

    private initForm(): FormGroup {
        return this.formBuilder.group({
            login: [null, Validators.required],
            password: [null, Validators.required]
        });
    }
}
