import { Component, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'mew-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css']
})
export class LanguageSwitcherComponent implements OnDestroy {
  private _currentLanguage: BehaviorSubject<string>;
  private _currentLanguageSubscription: Subscription;

  constructor(private _translate: TranslateService) {
    this._currentLanguage = new BehaviorSubject(_translate.currentLang);
    this._currentLanguageSubscription = this._translate.onLangChange.subscribe(
      this._currentLanguage
    );
  }

  public get currentLanguage(): Observable<string> {
    return this._currentLanguage.asObservable();
  }

  public onLanguageSelected(languageCode: string) {
    this._translate.use(languageCode);
  }

  public get languages() {
    return [
      {
        code: 'en',
        name: 'English (Default)'
      },
      {
        code: 'en-ca',
        name: 'English (Canada)'
      },
      {
        code: 'en_GB',
        name: 'English (Great Britain)'
      },
      {
        code: 'en_AU',
        name: 'English (Australia)'
      },
      {
        code: 'es',
        name: 'Spanish (Default)'
      },
      {
        code: 'fr',
        name: 'French (Default)'
      },
      {
        code: 'fr-FR',
        name: 'French (France)'
      },
      {
        code: 'fr_CA',
        name: 'French (Canada)'
      }
    ];
  }

  public ngOnDestroy() {
    this._currentLanguageSubscription.unsubscribe();
  }
}
