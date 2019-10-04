import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authenticationReducer } from './authentication/store/reducers/authentication.reducers';
import { tokenGetter } from './authentication/utils/token-getter';
import { CoreModule } from './core/core.module';
import { appRouterReducer } from './core/store/reducers/router.reducers';

// tslint:disable-next-line:no-any
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
        keys: [{ authentication: ['user', 'userLoggedIn', 'token'] }],
        rehydrate: true
    })(reducer);
}

// A kind of redux middleware which prevents state mutation during development:
// tslint:disable-next-line:no-any
export const metaReducers: MetaReducer<any>[] = !environment.production
    ? [localStorageSyncReducer, storeFreeze]
    : [localStorageSyncReducer];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        StoreModule.forRoot(appRouterReducer, { metaReducers }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter,
                whitelistedDomains: environment.jwtWhitelistedDomains,
                blacklistedRoutes: environment.blacklistedRoutes
            }
        }),
        /**
         * Put authentication state in AppModule instead of AuthenticationModule to ensure authentication
         * state rehydratation when we are in another lazzy loaded module and the page is reloaded:
         */
        StoreModule.forFeature('authentication', authenticationReducer)
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
