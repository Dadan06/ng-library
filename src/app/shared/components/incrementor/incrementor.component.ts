import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-incrementor',
    templateUrl: './incrementor.component.html',
    styleUrls: ['./incrementor.component.scss']
})
export class IncrementorComponent {
    @Input() value = 1;
    @Input() disabled = false;

    @Output() increment: EventEmitter<void> = new EventEmitter();
    @Output() decrement: EventEmitter<void> = new EventEmitter();

    currentValues = [this.value];
    private digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    onKeyUp(event: KeyboardEvent) {
        if (event.key === 'Backspace') {
            this.currentValues.pop();
        }
        if (this.digits.indexOf(event.key) > -1) {
            this.currentValues.push(+event.key);
            this.changeValue.emit(+this.currentValues.join(''));
        }
    }
}
