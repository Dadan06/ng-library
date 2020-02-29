import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    ViewChild
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormAsTouchedAndDirty } from 'src/app/shared/utils/form.utils';
import {
    PrivilegeCategories,
    PRIVILEGE_CATEGORY_LABELS,
    USER_PRIVILEGE_LABELS
} from '../../constants/privilege.constants';
import { RoleService } from '../../services/role.service';
import { Privilege } from '../../types/privilege.interface';
import { Role } from '../../types/role.interface';

@Component({
    selector: 'app-role-form',
    templateUrl: './role-form.component.html',
    styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnChanges {
    @Input() role: Role;
    @Input() isEditing: boolean;
    @Input() editEnabled = true;
    @Input() privileges: Privilege[];

    @Output() save: EventEmitter<Role> = new EventEmitter();
    @Output() edit: EventEmitter<Role> = new EventEmitter();
    @Output() cancel: EventEmitter<void> = new EventEmitter();

    categoryLabels = PRIVILEGE_CATEGORY_LABELS;
    userPrivilegeLabels = USER_PRIVILEGE_LABELS;

    form: FormGroup;

    @ViewChild('first') first: ElementRef;

    constructor(private formBuilder: FormBuilder, private roleService: RoleService) {}

    get categories() {
        return Object.keys(this.getFormGroup('privileges').controls);
    }

    ngOnChanges(): void {
        if (this.role && this.privileges) {
            this.form = this.initForm(this.role, this.privileges);
            this.isEditing ? this.form.enable() : this.form.disable();
            this.first && this.first.nativeElement.focus();
            this.setAsyncValidators();
        }
    }

    getCategoryPrivileges(category: string) {
        return (this.getFormGroup('privileges').get(category) as FormGroup).controls;
    }

    showErrors() {
        markFormAsTouchedAndDirty(this.form);
    }

    onSubmit() {
        this.form.valid
            ? this.save.emit({
                  ...this.form.value,
                  privileges: this.getFlattenPrivileges(this.form.value.privileges)
              })
            : this.showErrors();
    }

    private setAsyncValidators() {
        this.form.get('name').setAsyncValidators(this.checkDuplicate.bind(this));
        this.form.get('name').updateValueAndValidity();
    }

    private getFormGroup(group: string) {
        return this.form.get(group) as FormGroup;
    }

    private getFlattenPrivileges(
        privileges: Record<PrivilegeCategories, Privilege[]>
    ): Privilege[] {
        return Object.values(privileges)
            .reduce((a, c) => [...a, ...c], [])
            .filter(p => p.active)
            .map(({ active, ...rest }) => rest);
    }

    private initForm(role: Role, privileges: Privilege[]): FormGroup {
        return this.formBuilder.group({
            _id: [role._id || null],
            name: [role.name, Validators.required],
            privileges: this.initPrivileges(privileges)
        });
    }

    private initPrivileges(privileges: Privilege[]) {
        return this.formBuilder.group(
            privileges.reduce((acc, obj) => {
                const key = obj.category;
                if (!acc[key]) {
                    acc[key] = this.formBuilder.array([]);
                }
                acc[key].push(this.initPrivilege(obj, this.role.privileges));
                return acc;
            }, {})
        );
    }

    private initPrivilege(privilege: Privilege, currentRolePrivileges: Privilege[]): FormGroup {
        const privilegeIds = currentRolePrivileges.map(p => p._id);
        return this.formBuilder.group({
            _id: [privilege._id],
            name: [privilege.name, Validators.required],
            active: [privilegeIds.includes(privilege._id)],
            category: [privilege.category]
        });
    }

    private checkDuplicate(control: AbstractControl) {
        return this.roleService.checkDuplicate({ ...this.form.value, name: control.value });
    }
}
