import {mergeApplicationConfig, ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import {provideRouter} from "@angular/router";
import {routes} from "./app.routes";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {provideHttpClient} from "@angular/common/http";
import {AuthGuard} from "./guard/auth.guard";

const serverConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideServerRendering(),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(),
    AuthGuard
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
