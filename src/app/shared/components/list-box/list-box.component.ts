import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FilterItem } from '../../types/filter-updates.interface';

@Component({
    selector: 'app-list-box',
    templateUrl: './list-box.component.html',
    styleUrls: ['./list-box.component.scss']
})
export class ListBoxComponent {
    @Input() set items(items: FilterItem[]) {
        if (items && items.length) {
            this.form = this.initForm(items);
            this.form.get('items').valueChanges.subscribe(this.onChanges.bind(this));
        }
    }
    @Input() labels: Record<string, string>;
    @Output() select: EventEmitter<FilterItem[]> = new EventEmitter<FilterItem[]>();

    form: FormGroup;

    private selections: Record<string, boolean> = {};

    constructor(private formBuilder: FormBuilder) {}

    getFormArray(formArrayName: string): FormArray {
        return this.form && (this.form.get(formArrayName) as FormArray);
    }

    filter(controls: FormControl[]) {
        return controls.filter(c =>
            this.form.value.search
                ? ((this.labels && this.labels[c.value.name]) || c.value.name)
                      .toLowerCase()
                      .indexOf(this.form.value.search.toLowerCase()) >= 0
                : true
        );
    }

    private onChanges() {
        setTimeout(() => {
            const selectedItems: FilterItem[] = this.form.value.items.filter(i => i.selected);
            this.selections = Object.assign(
                {},
                ...selectedItems.map(({ name }) => ({ [name]: true }))
            );
            this.select.emit(selectedItems);
        });
    }

    private initForm(items: FilterItem[]): FormGroup {
        return this.formBuilder.group({
            search: [''],
            items: this.formBuilder.array(items.map(this.initFormArrayItem.bind(this)))
        });
    }

    private initFormArrayItem({ name, count, selected }: FilterItem) {
        return this.formBuilder.group({
            name: [name],
            selected: [selected || !!this.selections[name]],
            count: [count]
        });
    }
}
