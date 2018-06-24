import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { LocalizedFallbackTranslateLoader } from './localized-fallback-translate-loader.service';
import { LocalizedMissingTranslationHandler } from './localized-missing-translation-handler.service';


@NgModule({
  imports: [TranslateModule],
  providers: [
    LocalizedFallbackTranslateLoader,
    LocalizedMissingTranslationHandler
  ]
})
export class L10nModule { }
