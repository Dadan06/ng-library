import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Incrementation, IncrementationMode } from '../../types/incrementation.interface';

@Component({
    selector: 'app-incrementor',
    templateUrl: './incrementor.component.html',
    styleUrls: ['./incrementor.component.scss']
})
export class IncrementorComponent {
    @Input() value;

    @Output() changeValue: EventEmitter<Incrementation> = new EventEmitter();

    digits = [1, 10, 50, 100, 500, 1000];
    factor = 1;

    onChangeSelection(event) {
        this.factor = +event.target.value;
    }

    onIncrement() {
        this.value += this.factor;
        this.changeValue.emit({ value: this.value, mode: IncrementationMode.INCREMENT });
    }

    onDecrement() {
        this.value -= this.factor;
        this.changeValue.emit({ value: this.value, mode: IncrementationMode.DECREMENT });
    }
}
