import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

import { TranslateCompiler, provideTranslateService, TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { TranslateHttpLoader, provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TranslatePipe,
    TranslateDirective
  ],
  providers: [
    provideHttpClient(),
    provideTranslateService({
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }
    }),
    provideTranslateHttpLoader()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
