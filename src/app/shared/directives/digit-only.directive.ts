import { Directive, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appDigitOnly]'
})
export class DigitOnlyDirective {
    @Input() disabledDigits: number[] = [];

    private digits = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0',
        'Backspace',
        'Delete',
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight'
    ];

    @HostListener('keydown', ['$event'])
    onKeyDown(e: KeyboardEvent) {
        if (this.digits.indexOf(e.key) === -1 || this.disabledDigits.indexOf(+e.key) >= 0) {
            e.preventDefault();
        }
    }
}
