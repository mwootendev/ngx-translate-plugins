import { Injectable } from '@angular/core';

import { MissingTranslationHandlerParams } from '@ngx-translate/core';
import { AlternateLanguagedMissingTranslationHandler } from './alternate-language-missing-translation-handler.service';

@Injectable()
export class DefaultLanguagedMissingTranslationHandler extends AlternateLanguagedMissingTranslationHandler {
  /**
   * Creates an instance of DefaultLanguagedMissingTranslationHandler.
   *
   * @memberof DefaultLanguagedMissingTranslationHandler
   */
  constructor() {
    super();
  }

  public getAlternateLanguage(params: MissingTranslationHandlerParams): string {
    return params.translateService.defaultLang;
  }
}
