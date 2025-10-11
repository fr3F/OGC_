// import { enableProdMode } from '@angular/core';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { environment } from './environments/environment';

// if (environment.production) {
//   enableProdMode();
// }
// enableProdMode();
// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));


import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { enableProdMode, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { initFirebaseBackend } from './app/authUtils';
import { FakeBackendInterceptor } from './app/core/helpers/fake-backend';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { JwtInterceptor } from './app/core/helpers/jwt.interceptor';
import { ErrorInterceptor } from './app/core/helpers/error.interceptor';
// Enable production mode if in production environment
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';//  Enregistre les données locales pour le français
registerLocaleData(localeFr);
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


if (environment.production) {
  enableProdMode();
}

if (environment.defaultauth === 'firebase') {
  initFirebaseBackend(environment.firebaseConfig);
} else {
  FakeBackendInterceptor;
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'fr' },

    ...appConfig.providers,
        // Import conditionnel des DevTools avec importProvidersFrom
    ...(!environment.production ? [
      importProvidersFrom(StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: environment.production,
      }))
    ] : []),
  ]
})
.catch((err) => console.error('Error during bootstrapping the application:', err));

