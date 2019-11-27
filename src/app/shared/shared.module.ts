import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ModalModule } from 'angular-custom-modal';
import { ClientService } from '../client/services/client.service';
import { ChipsComponent } from './components/chips/chips.component';
import { CollapsibleChipsComponent } from './components/collapsible-chips/collapsible-chips.component';
import { InputNumberComponent } from './components/input-number/input-number.component';
import { ListBoxFilterComponent } from './components/list-box-filter/list-box-filter.component';
import { ListBoxComponent } from './components/list-box/list-box.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PeriodFilterComponent } from './components/period-filter/period-filter.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ValidationErrorComponent } from './components/validation-error/validation-error.component';
import { DigitOnlyDirective } from './directives/digit-only.directive';
import { SharedEffects } from './store/effects/shared.effects';
import { sharedReducer } from './store/reducers/shared.reducers';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule,
        NgSelectModule,
        StoreModule.forFeature('shared', sharedReducer),
        EffectsModule.forFeature([SharedEffects])
    ],
    declarations: [
        LoaderComponent,
        PaginationComponent,
        ValidationErrorComponent,
        ChipsComponent,
        CollapsibleChipsComponent,
        ListBoxComponent,
        ListBoxFilterComponent,
        SearchBarComponent,
        InputNumberComponent,
        PeriodFilterComponent,
        DigitOnlyDirective
    ],
    exports: [
        CommonModule,
        FormsModule,
        LoaderComponent,
        PaginationComponent,
        ModalModule,
        ValidationErrorComponent,
        ChipsComponent,
        CollapsibleChipsComponent,
        ListBoxComponent,
        ListBoxFilterComponent,
        SearchBarComponent,
        InputNumberComponent,
        PeriodFilterComponent,
        DigitOnlyDirective
    ],
    providers: [ClientService]
})
export class SharedModule {}
