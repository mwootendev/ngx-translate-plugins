import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { LocalizedMissingTranslationHandler } from './localized-missing-translation-handler.service';


@NgModule({
  imports: [TranslateModule],
  declarations: [],
  exports: [],
  providers: [LocalizedMissingTranslationHandler]
})
export class L10nModule { }
