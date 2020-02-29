import { FormArray, FormGroup } from '@angular/forms';

export const getFormArray = (form: FormGroup, formArrayName: string): FormArray => form && (form.get(formArrayName) as FormArray);

export const removeInFormArray = (form: FormGroup, formArrayName: string, index: number) =>
    getFormArray(form, formArrayName).removeAt(index);

export const addInFormArray = (form: FormGroup, newForm: FormGroup, formArrayName: string) =>
    getFormArray(form, formArrayName).push(newForm);

export const markFormAsTouchedAndDirty = (form: FormGroup) =>
    Object.keys(form.controls).forEach(key => {
        const currentControl = form.controls[key] as FormGroup;
        if (currentControl.controls) {
            markFormAsTouchedAndDirty(currentControl);
        }
        currentControl.markAsDirty();
        currentControl.markAsTouched();
    });

export const markFormArrayAsTouchedAndDirty = (formArrayName: string, form: FormGroup) =>
    getFormArray(form, formArrayName).controls.forEach((c: FormGroup) => {
        markFormAsTouchedAndDirty(c);
    });

export const disableFormArray = (formArrayName: string, form: FormGroup) =>
    getFormArray(form, formArrayName).controls.forEach(c => c.disable());

export const enableFormArray = (formArrayName: string, form: FormGroup) =>
    getFormArray(form, formArrayName).controls.forEach(c => c.enable());

export const resetFormArrayAt = (form: FormGroup, formArrayName: string, index: number) =>
    getFormArray(form, formArrayName)
        .at(index)
        .reset();
