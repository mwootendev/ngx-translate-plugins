import { MissingTranslationHandlerParams } from '@ngx-translate/core';

import { AlternateLanguagedMissingTranslationHandler } from './alternate-language-missing-translation-handler.service';

export class LanguageMissingTranslationHandler extends AlternateLanguagedMissingTranslationHandler {
  constructor(private _language: string) {
    super();
  }

  public getAlternateLanguage(params: MissingTranslationHandlerParams): string {
    return this._language;
  }
}
