import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// Other module imports
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideToastr } from 'ngx-toastr';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { rootReducer } from './store';
import { AuthenticationEffects } from './store/Authentication/authentication.effects';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { MenuEffects } from './store/menu/menu.effects';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BaseCreateEffects } from './store/base/base-create/base-create-page.effects';
import { BaseListPageEffects } from './store/base/base-liste/base-list-page.effects';
import { BaseUpdateEffects } from './store/base/base-update/base-update.effects';
import { BaseDeletePageEffects } from './store/base/base-delete/base-delete-page.effects';

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideStore(rootReducer),
    provideEffects(
      [
        AuthenticationEffects,
        MenuEffects,
        BaseListPageEffects,
        BaseCreateEffects,
        BaseUpdateEffects,
        BaseDeletePageEffects
      ]
    ),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      }),
    ),
    provideAnimations(),
    provideToastr(),
    { provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } },
    { provide: LocationStrategy, useClass: HashLocationStrategy }  
  ]
};

