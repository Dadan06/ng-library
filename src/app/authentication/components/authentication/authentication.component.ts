import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    private initForm(): FormGroup {
        return this.formBuilder.group({
            login: ['admin@dreamslab.fr', [Validators.required, Validators.email]],
            password: ['adminadmin', Validators.required]
        });
    }
}
