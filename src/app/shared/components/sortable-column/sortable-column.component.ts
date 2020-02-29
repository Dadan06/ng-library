import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Sort, SortDirection } from '../../types/sort.interface';

const OPPOSED_DIRECTION: Record<SortDirection, SortDirection> = {
    [SortDirection.asc]: SortDirection.desc,
    [SortDirection.desc]: SortDirection.asc
};

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[app-sortable-column]',
    templateUrl: './sortable-column.component.html',
    styleUrls: ['./sortable-column.component.scss']
})
export class SortableColumnComponent {
    // tslint:disable-next-line:no-input-rename
    @Input('app-sortable-column')
    columnName: string;
    hover = false;
    @Input() set sortDirections(sortDirections: SortDirection) {
        this.sortDirection = sortDirections && this.columnName && sortDirections[this.columnName];
    }
    sortDirection: SortDirection;
    lastSortDirection = SortDirection.asc;
    @Input() set initialDirection(initialDirection: SortDirection) {
        this.sortDirection = initialDirection;
        this.lastSortDirection = initialDirection;
    }
    @Output() sort: EventEmitter<Sort> = new EventEmitter<Sort>();

    @HostListener('click')
    onClick() {
        this.sortDirection = !this.sortDirection
            ? OPPOSED_DIRECTION[this.lastSortDirection]
            : OPPOSED_DIRECTION[this.sortDirection];
        this.lastSortDirection = this.sortDirection;
        this.sort.emit({ by: this.columnName, direction: this.sortDirection });
    }

    @HostListener('mouseenter')
    onMouseEnter() {
        this.hover = true;
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.hover = false;
    }
}
