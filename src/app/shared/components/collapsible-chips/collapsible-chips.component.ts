import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterItem } from '../../types/filter-updates.interface';

export interface Chips {
    name: string;
    items: FilterItem[];
}

@Component({
    selector: 'app-collapsible-chips',
    templateUrl: './collapsible-chips.component.html',
    styleUrls: ['./collapsible-chips.component.scss']
})
export class CollapsibleChipsComponent {
    @Input() chips: Chips;
    @Input() filterCategoryLabels: Record<string, string>;
    @Input() filterItemLabels: Record<string, Object>;
    @Output() delete: EventEmitter<void> = new EventEmitter();
    @Output() select: EventEmitter<string[] | null> = new EventEmitter<string[] | null>();

    expanded = true;

    get totalCount() {
        return ((this.chips && this.chips.items) || []).reduce((m, o) => m + (o.count || 0), 0);
    }

    onToogleExpand(expanded: boolean) {
        this.expanded = expanded;
    }

    onDelete() {
        this.delete.emit();
    }

    onSelect(filterItems: FilterItem[]) {
        const itemNames: string[] = filterItems.map(i => i.name);
        this.select.emit(itemNames.length ? itemNames : null);
    }
}
