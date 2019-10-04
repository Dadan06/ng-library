import { FormGroup } from '@angular/forms';

export const markFormAsTouchedAndDirty = (form: FormGroup) =>
    Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsDirty();
        form.controls[key].markAsTouched();
    });
