import { TranslateLoader } from '@ngx-translate/core';

import { Observable, of as observableOf } from 'rxjs';

import { Translations, LanguageTranslations } from './translations.model';

export class TestTranslateLoader extends TranslateLoader {
  constructor(private _translations: Translations) {
    super();
  }

  public getTranslation(language: string): Observable<LanguageTranslations> {
    return observableOf(this._translations[language] || {});
  }
}
