import { Injectable, Inject } from '@angular/core';

import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { getBaseLanguage } from './utilities';

@Injectable({
  providedIn: 'root'
})
export class LocalizedFallbackTranslateLoader implements TranslateLoader {

  constructor(@Inject(TranslateLoader) private _parentLoader: TranslateLoader) { }

  public getTranslation(lang: string): Observable<any> {
    console.log(this._parentLoader);
    return this._parentLoader
      .getTranslation(lang)
      .pipe(catchError((error) => {
        const baseLanguage = getBaseLanguage(lang);
        if (baseLanguage !== lang) {
          return this._parentLoader.getTranslation(baseLanguage);
        } else {
          throw error;
        }
      }))
      ;
  }
}
