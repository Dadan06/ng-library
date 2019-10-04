import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { RouterEffects } from './store/effects/router.effects';
import { CustomRouterStateSerializer } from './store/reducers/router.reducers';

@NgModule({
    imports: [CommonModule, EffectsModule.forRoot([RouterEffects]), StoreRouterConnectingModule],
    declarations: [],
    providers: [{ provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }]
})
/**
 * Module which collects numerous, auxiliary, single-use classes (components, ...)
 * and singleton service whose instance will be shared throughout the application
 */
export class CoreModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: CoreModule
    ) {
        this.throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }

    /**
     * Prevent reimport of core module
     * @param parentModule Module parent
     * @param moduleName String wich represent the module's name
     */
    private throwIfAlreadyLoaded(parentModule: CoreModule, moduleName: string) {
        if (parentModule) {
            throw new Error(
                `${moduleName} has already been loaded. Import Core modules in the AppModule only.`
            );
        }
    }
}
