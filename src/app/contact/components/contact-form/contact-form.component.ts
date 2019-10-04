import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormAsTouchedAndDirty } from 'src/app/shared/utils/form.utils';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
    form: FormGroup;
    customErrorLabels: Record<string, string> = {
        // tslint:disable-next-line:no-hardcoded-credentials
        passwordsMustMatch: 'Mots de passe non-identiques',
        required: 'Confirmation obligatoire' // Overwrite default error message for required
    };

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.form = this.initForm();
    }

    showErrors() {
        markFormAsTouchedAndDirty(this.form);
    }

    private initForm(): FormGroup {
        return this.formBuilder.group(
            {
                firstname: ['', Validators.required],
                lastname: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                address: ['', Validators.required],
                password: ['', [Validators.required, Validators.minLength(10)]],
                passwordConfirmation: ['', Validators.required]
            },
            {
                validator: this.confirmPasswordValidator()
            }
        );
    }

    private confirmPasswordValidator = () => (formGroup: FormGroup) => {
        const passwordControl = formGroup.controls.password;
        const passwordConfirmationControl = formGroup.controls.passwordConfirmation;

        if (
            passwordConfirmationControl.errors &&
            !passwordConfirmationControl.errors.passwordsMustMatch
        ) {
            // Return if another validator has already found an error on the matchingControl
            return;
        }

        // Set error on matchingControl if validation fails:
        passwordConfirmationControl.setErrors(
            passwordControl.value !== passwordConfirmationControl.value
                ? { passwordsMustMatch: true }
                : null
        );
    };
}
