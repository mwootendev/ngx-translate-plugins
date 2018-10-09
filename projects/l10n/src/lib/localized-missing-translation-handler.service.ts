import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';

import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { getBaseLanguage } from './utilities';

@Injectable({
  providedIn: 'root'
})
export class LocalizedMissingTranslationHandler extends MissingTranslationHandler {

  /**
   * Creates an instance of LocalizedMissingTranslationHandler.
   *
   * @memberof LocalizedMissingTranslationHandler
   */
  constructor() {
    super();
  }

  public handle(params: MissingTranslationHandlerParams): any {
    const translateService = params.translateService;
    const missingTranslationKey = params.key;
    const currentLanguage = translateService.currentLang;
    const baseLanguage = getBaseLanguage(translateService.currentLang);

    if (baseLanguage !== currentLanguage) {
      if (translateService.getLangs().includes(baseLanguage)) {
        return translateService.getParsedResult(
          translateService.translations[baseLanguage],
          missingTranslationKey,
          params.interpolateParams
        );
      } else {
        return translateService
          .getTranslation(baseLanguage)
          .pipe(
            map(translations =>
              translateService.getParsedResult(
                translations,
                missingTranslationKey,
                params.interpolateParams
              )
            ),
            catchError(() => missingTranslationKey)
          );
      }
    } else {
      return missingTranslationKey;
    }
  }
}
