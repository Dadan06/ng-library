import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FilterItem, FilterUpdates, ListBoxFilter } from '../../types/filter-updates.interface';
import { Chips } from '../collapsible-chips/collapsible-chips.component';

@Component({
    selector: 'app-list-box-filter',
    templateUrl: './list-box-filter.component.html',
    styleUrls: ['./list-box-filter.component.scss']
})
export class ListBoxFilterComponent implements OnChanges {
    @Input() filterUpdates: FilterUpdates;
    @Input() filterCategoryLabels: Record<string, string>;
    @Input() filterItemLabels: Record<string, Object>;
    @Output() filter: EventEmitter<ListBoxFilter> = new EventEmitter<ListBoxFilter>();
    @Input() defaultFilters: string[] = [];
    @Input() initialFilterValue: ListBoxFilter;

    chips: Chips[] = [];
    innactiveFilters: string[];
    ngSelectModel = null;
    private filterValue: ListBoxFilter;

    ngOnChanges(changes: SimpleChanges) {
        if (!changes.filterUpdates.previousValue && changes.filterUpdates.currentValue) {
            this.innactiveFilters = Object.keys(this.filterUpdates);
            this.initialFilterValue && this.setInitialFilterValue();
            this.filterValue = Object.assign(
                {},
                ...Object.keys(this.filterUpdates).map(key => ({ [key]: null }))
            );
            this.sortFilterCategories(this.innactiveFilters, this.filterCategoryLabels);
        } else if (changes.filterUpdates && changes.filterUpdates.currentValue) {
            this.updateFilterItemsCount();
        }
    }

    addFilter(filterCategory: string) {
        this.chips.push({
            name: filterCategory,
            items: this.filterUpdates[filterCategory]
        });
        this.innactiveFilters = this.innactiveFilters.filter(f => f !== filterCategory);
    }

    onDelete(filterCategory: string) {
        this.ngSelectModel = null;
        this.chips = this.chips.filter(c => c.name !== filterCategory);
        this.innactiveFilters = [...this.innactiveFilters, filterCategory];
        this.sortFilterCategories(this.innactiveFilters, this.filterCategoryLabels);
        this.filterValue[filterCategory] = null;
        this.filter.emit({ ...this.filterValue });
    }

    onSelect(filterCategory: string, values: string[]) {
        this.filterValue[filterCategory] = values;
        this.filter.emit({ ...this.filterValue });
    }

    private setInitialFilterValue() {
        this.chips = Object.entries(this.initialFilterValue)
            .filter(([filterCategory, activatedFilters]) => Array.isArray(activatedFilters))
            .map(([filterCategory]) => {
                this.innactiveFilters = this.innactiveFilters.filter(f => f !== filterCategory);
                return {
                    name: filterCategory,
                    items: this.filterItemsWithInitializedSelection(
                        filterCategory,
                        this.filterUpdates[filterCategory],
                        this.initialFilterValue
                    )
                };
            });
    }

    private filterItemsWithInitializedSelection(
        filterCategory: string,
        items: FilterItem[],
        filterValue: ListBoxFilter
    ): FilterItem[] {
        return items.map(i => ({
            ...i,
            selected: (filterValue[filterCategory] || []).includes(i.name)
        }));
    }

    private updateFilterItemsCount() {
        this.chips.forEach(chipsItem => (chipsItem.items = this.filterUpdates[chipsItem.name]));
    }

    private sortFilterCategories(filterCategories: string[], labels: Record<string, string>) {
        filterCategories.sort((a, b) => (labels[a] > labels[b] ? 1 : -1));
    }
}
