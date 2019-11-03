import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import {
  TranslateLoader,
  TranslateModule,
  TranslateCompiler,
  MissingTranslationHandler
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';

import { AppComponent } from './app.component';
import {
  LocalizedFallbackTranslateLoader,
  LocalizedMissingTranslationHandler
} from 'ngx-translate-l10n';
import { LanguageSwitcherComponent } from './language-switcher.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new LocalizedFallbackTranslateLoader(new TranslateHttpLoader(http));
}

@NgModule({
  declarations: [AppComponent, LanguageSwitcherComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      // compiler: {
      //   provide: TranslateCompiler,
      //   useClass: TranslateMessageFormatCompiler
      // },
      useDefaultLang: false,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useValue: new LocalizedMissingTranslationHandler()
      }
    })
  ],
  providers: [
    {
      provide: MissingTranslationHandler,
      useClass: LocalizedMissingTranslationHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
