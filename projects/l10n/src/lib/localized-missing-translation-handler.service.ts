import { Injectable } from '@angular/core';

import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { getBaseLanguage } from './utilities';

@Injectable({
  providedIn: 'root'
})
export class LocalizedMissingTranslationHandler extends MissingTranslationHandler {

  constructor() {
    super();
   }

  public handle(params: MissingTranslationHandlerParams): any {
    const translateService = params.translateService;
    const currentLanguage = translateService.currentLang;
    const baseLanguage = getBaseLanguage(translateService.currentLang);

    if (baseLanguage !== currentLanguage) {
      // Try to find translation in base language
      // if (translateService.getLangs().includes(baseLanguage)) {
        return translateService.getParsedResult(translateService.translations[baseLanguage], params.key, params.interpolateParams);
      // } else {
        // try loading language
      // }
    }
  }
}
