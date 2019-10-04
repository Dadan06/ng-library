import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-input-number',
    templateUrl: './input-number.component.html',
    styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent implements OnInit {
    @Input() value: number;
    @Input() step: number;
    @Input() min: number;
    @Input() max: number;

    @Output()
    increment: EventEmitter<number> = new EventEmitter<number>();
    @Output()
    decrement: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
        /**/
    }

    ngOnInit() {
        /**/
    }

    onIncrement(): void {
        if (this.value < this.max) {
            this.value += this.step;
            this.increment.emit(this.value);
        }
    }

    onDecrement(): void {
        if (this.value > this.min) {
            this.value -= this.step;
            this.decrement.emit(this.value);
        }
    }
}
