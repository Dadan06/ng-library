import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-incrementor',
    templateUrl: './incrementor.component.html',
    styleUrls: ['./incrementor.component.scss']
})
export class IncrementorComponent {
    @Input() value = 0;

    @Output() increment: EventEmitter<void> = new EventEmitter();
    @Output() decrement: EventEmitter<void> = new EventEmitter();
}
