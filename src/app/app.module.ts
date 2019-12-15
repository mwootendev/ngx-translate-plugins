import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import {
  TranslateLoader,
  TranslateModule,
  TranslateCompiler,
  MissingTranslationHandler,
  FakeMissingTranslationHandler
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';

import { FailoverMissingTranslationHandler, DefaultLanguagedMissingTranslationHandler, LanguageMissingTranslationHandler } from 'ngx-translate-missing-translations';

import { AppComponent } from './app.component';

import { LanguageSwitcherComponent } from './language-switcher.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent, LanguageSwitcherComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      },
      useDefaultLang: false,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useValue: new FailoverMissingTranslationHandler([
          new LanguageMissingTranslationHandler('es'),
          new DefaultLanguagedMissingTranslationHandler()
        ])
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
