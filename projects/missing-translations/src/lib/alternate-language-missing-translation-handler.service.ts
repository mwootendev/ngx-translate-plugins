import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';

import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export abstract class AlternateLanguagedMissingTranslationHandler extends MissingTranslationHandler {
  /**
   * Creates an instance of AlternateLanguagedMissingTranslationHandler.
   *
   * @memberof AlternateLanguagedMissingTranslationHandler
   */
  constructor() {
    super();
  }

  public abstract getAlternateLanguage(params: MissingTranslationHandlerParams): string;

  public handle(params: MissingTranslationHandlerParams): any {
    const translateService = params.translateService;
    const missingTranslationKey = params.key;
    const currentLanguage = translateService.currentLang;
    const alternateLanguage = this.getAlternateLanguage(params);

    if (currentLanguage !== alternateLanguage) {
      if (translateService.getLangs().indexOf(alternateLanguage) > 0) {
        return translateService.parser.interpolate(
          translateService.translations[alternateLanguage][missingTranslationKey],
          params.interpolateParams
        );
      } else {
        return translateService.getTranslation(alternateLanguage).pipe(
          map(translations =>
            translateService.parser.interpolate(
              translations[missingTranslationKey],
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
