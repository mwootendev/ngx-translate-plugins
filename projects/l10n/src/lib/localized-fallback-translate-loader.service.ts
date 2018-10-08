import { Injectable } from '@angular/core';

import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { getBaseLanguage } from './utilities';

/**
 * The LocalizedFallbackTranslateLoader class provides a {TranslateLoader} implementation
 * that will attempt to load translations for the base language for a localized language code.
 * For instance, en-CA would attempt to load en-CA and then fallback to loading en if that
 * is not available.
 *
 * It is assumed that the localization is separated from the base language using either a
 * dash ('-') or underscore ('_') character.
 *
 * @export
 */
@Injectable({
  providedIn: 'root'
})
export class LocalizedFallbackTranslateLoader implements TranslateLoader {
  
  /**
   * Creates an instance of LocalizedFallbackTranslateLoader.
   *
   * @param _parentLoader the parent loader used to actually load translations.
   * @memberof LocalizedFallbackTranslateLoader
   */
  constructor(private _parentLoader: TranslateLoader) {}

  /**
   * Attempts to load the translations for the provided language code. If the translations are not available
   * and the language code includes localization, the translations for the base language will attempt to be
   * loaded.
   *
   * @param lang the language code for which the translations should be retrieved.
   * @returns an Observable of the translations for the requested language,
   *          or the base language of a localized language, or an error if no translations are available for either case.
   * @memberof LocalizedFallbackTranslateLoader
   */
  public getTranslation(lang: string): Observable<any> {
    console.log(this._parentLoader);
    return this._parentLoader.getTranslation(lang).pipe(
      catchError(error => {
        const baseLanguage = getBaseLanguage(lang);
        if (baseLanguage !== lang) {
          return this._parentLoader.getTranslation(baseLanguage);
        } else {
          throw error;
        }
      })
    );
  }
}
