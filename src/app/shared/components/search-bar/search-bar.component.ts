import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
    @Input() placeholder = 'Recherche';
    @Output() search: EventEmitter<string> = new EventEmitter<string>();
    searchTerm: string;
    onChange() {
        this.search.emit(this.searchTerm);
    }
}
