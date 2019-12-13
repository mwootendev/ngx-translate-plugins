import { MissingTranslationHandlerParams } from '@ngx-translate/core';

import { AlternateLanguagedMissingTranslationHandler } from './alternate-language-missing-translation-handler.service';

export class BrowserCultureLanguageMissingTranslationHandler extends AlternateLanguagedMissingTranslationHandler {
  constructor() {
    super();
  }

  public getAlternateLanguage(params: MissingTranslationHandlerParams): string {
    return params.translateService.getBrowserCultureLang();
  }
}
