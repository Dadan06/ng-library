import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

type ValidationErrorType = 'required' | 'email' | 'min' | 'max' | 'minlength' | 'maxlength';

const VALIDATION_ERROR_LABELS: Record<ValidationErrorType, string> = {
    required: 'Champ  requis',
    email: 'Email invalide',
    min: 'Trop petit',
    max: 'Trop grand',
    minlength: 'Trop court',
    maxlength: 'Tros long'
};

@Component({
    selector: 'app-validation-error',
    templateUrl: './validation-error.component.html',
    styleUrls: ['./validation-error.component.scss']
})
export class ValidationErrorComponent {
    errorLabels: Record<ValidationErrorType, string> = VALIDATION_ERROR_LABELS;
    @Input() control: AbstractControl;
    @Input() customErrorLabels?: Record<string, string>;
}
