import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { SharedModule } from '../shared/shared.module';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactRootComponent } from './containers/contact-root/contact-root.component';
import { ContactMockService } from './services/contact-mock.service';
import { ContactService } from './services/contact.service';
import { ContactRouterEffects } from './store/effects/contact-router.effects';
import { ContactEffects } from './store/effects/contact.effects';
import { contactReducer } from './store/reducers/contact.reducers';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ContactRoutingModule,
        SharedModule,
        StoreModule.forFeature('contact', contactReducer),
        EffectsModule.forFeature([ContactEffects, ContactRouterEffects])
    ],
    declarations: [
        ContactRootComponent,
        ContactListComponent,
        ContactDetailComponent,
        ContactFormComponent
    ],
    providers: [
        {
            provide: ContactService,
            useClass: environment.mock ? ContactMockService : ContactService
        }
    ]
})
export class ContactModule {}
