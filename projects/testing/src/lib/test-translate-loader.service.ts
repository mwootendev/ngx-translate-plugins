import { TranslateLoader } from '@ngx-translate/core';

import { Observable, of as observableOf } from 'rxjs';

import { Translations, LanguageTranslations } from './translations.model';

/**
 * The TestTranslateLoader class provides a simple loader that loads translations
 * from a {Translations} object, which maps language codes to translations.
 *
 * @example
 * const loader = new TestTranslateLoader({
 *   en: {
 *     greeting: 'Hello'
 *   },
 *   es: {
 *     greeting: 'Hola'
 *   }
 * } as Translations);
 */
export class TestTranslateLoader extends TranslateLoader {
  constructor(private _translations: Translations = {}) {
    super();
  }

  /**
   * Returns an {Observable} of translations for the specified language. If the
   * language is not recognized, an empty translations object will be returned.
   *
   * @param language the language for which the translations should be retrieved.
   * @returns the translations for the specified
   *          language or an empty set of translations if the language is not recognized.
   */
  public getTranslation(language: string): Observable<LanguageTranslations> {
    return observableOf(this._translations[language] || {});
  }
}
