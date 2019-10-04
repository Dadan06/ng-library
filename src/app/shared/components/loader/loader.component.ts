import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
    // tslint:disable-next-line:no-input-rename
    @Input('width') spinnerWidth = 50;
    // tslint:disable-next-line:no-input-rename
    @Input('height') spinnerHeight = 50;
    @Input() isLoading = true;
    @Input() fullWidth = false;
    @Input() message: string;
}
