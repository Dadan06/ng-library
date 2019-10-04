import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    Validators
} from '@angular/forms';
import { Role } from 'src/app/role/types/role.interface';
import { markFormAsTouchedAndDirty } from 'src/app/shared/utils/form.utils';
import { User } from '../../types/user.interface';

const PASSWORD_MIN_LENGTH = 4;

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
    @Input() isEditing: boolean;
    @Input() set user(user: User) {
        if (user) {
            this.form = this.initForm(user);
            if (this.isEditing) {
                this.form.enable();
                this.form.get('lastname').disable();
                this.form.get('firstname').disable();
            } else {
                this.form.disable();
            }
            setTimeout(() => this.isEditing && this.setFocusOnFirstInput());
        }
    }
    @Input() editEnabled = true;
    @Input() roles: Role[];

    @Output() edit: EventEmitter<User> = new EventEmitter<User>();
    @Output() save: EventEmitter<User> = new EventEmitter<User>();
    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

    form: FormGroup;
    @ViewChild('first') firstInput: ElementRef;

    constructor(private formBuilder: FormBuilder) {}

    onSubmit(form: FormGroup) {
        this.form.valid
            ? this.save.emit({
                  ...form.value
              })
            : this.showErrors();
    }

    private setFocusOnFirstInput() {
        this.firstInput.nativeElement.focus();
    }

    private showErrors() {
        markFormAsTouchedAndDirty(this.form);
    }

    private initForm(user: User): FormGroup {
        return this.formBuilder.group(
            {
                _id: [user._id || null],
                firstname: [user.firstname, Validators.required],
                lastname: [user.lastname, Validators.required],
                login: [user.login, Validators.required],
                role: [user.role, Validators.required],
                password: [
                    null,
                    user._id
                        ? this.editionPasswordValidator
                        : Validators.compose([
                              Validators.required,
                              Validators.minLength(PASSWORD_MIN_LENGTH)
                          ])
                ],
                confirmPassword: [
                    null,
                    user._id
                        ? this.editionPasswordValidator
                        : Validators.compose([
                              Validators.required,
                              Validators.minLength(PASSWORD_MIN_LENGTH)
                          ])
                ]
            },
            {
                validator: this.confirmPasswordValidator('password', 'confirmPassword')
            }
        );
    }

    private confirmPasswordValidator = (passwordKey: string, confirmPasswordKey: string) => (
        formGroup: FormGroup
    ) => {
        const passwordControl = formGroup.controls[passwordKey];
        const confirmPasswordControl = formGroup.controls[confirmPasswordKey];

        if (confirmPasswordControl.errors && !confirmPasswordControl.errors.mustMatch) {
            return;
        }

        confirmPasswordControl.setErrors(
            passwordControl.value !== confirmPasswordControl.value ? { mustMatch: true } : null
        );
    };

    private editionPasswordValidator = (control: AbstractControl): ValidationErrors =>
        !control.value
            ? null
            : control.value.trim().length >= PASSWORD_MIN_LENGTH
            ? null
            : { minLength: { value: control.value } };
}
