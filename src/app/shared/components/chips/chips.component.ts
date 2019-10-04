import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-chips',
    templateUrl: './chips.component.html',
    styleUrls: ['./chips.component.scss']
})
export class ChipsComponent {
    @Input() label: string;
    @Input() count: number;
    @Output() toogle: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() delete: EventEmitter<void> = new EventEmitter();
    expanded = true;

    onToogleExpanded() {
        this.expanded = !this.expanded;
        this.toogle.emit(this.expanded);
    }

    onDelete(event: Event) {
        event.stopPropagation();
        this.delete.emit();
    }
}
