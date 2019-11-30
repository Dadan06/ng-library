import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PeriodFilter } from '../../types/period-filter.interface';
import { getDateAsString, getTimeAsString } from '../../utils/date.utils';

@Component({
    selector: 'app-period-filter',
    templateUrl: './period-filter.component.html',
    styleUrls: ['./period-filter.component.scss']
})
export class PeriodFilterComponent implements OnInit {
    @Output() filter: EventEmitter<PeriodFilter> = new EventEmitter<PeriodFilter>();

    @Input() set periodFilter(periodFilter: PeriodFilter) {
        periodFilter && (this.form = this.initForm(periodFilter));
    }

    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.form.valueChanges.subscribe(this.onFormChanges.bind(this));
    }

    private onFormChanges() {
        setTimeout(() => {
            const { beginDate, beginTime, endDate, endTime } = this.form.value;
            const from = `${beginDate} ${beginTime}`;
            const to = `${endDate} ${endTime}`;
            if (isNaN(new Date(from).getTime()) || isNaN(new Date(to).getTime())) {
                return;
            }
            const periodFilter: PeriodFilter = { from, to };
            this.filter.emit(periodFilter);
        });
    }

    private initForm(periodFilter: PeriodFilter) {
        return this.formBuilder.group({
            beginDate: [getDateAsString(new Date(periodFilter.from))],
            beginTime: [getTimeAsString(new Date(periodFilter.from))],
            endDate: [getDateAsString(new Date(periodFilter.to))],
            endTime: [getTimeAsString(new Date(periodFilter.to))]
        });
    }
}
