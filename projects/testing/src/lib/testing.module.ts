import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  FakeMissingTranslationHandler,
  TranslateDefaultParser,
  TranslateFakeCompiler,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';

import { TestTranslateLoader } from './test-translate-loader.service';
import { LanguageTranslations, Translations } from './translations.model';

@NgModule({
  imports: [
    TranslateModule
  ],
  exports: [
    TranslateModule
  ]
})
export class TranslateTestingModule implements ModuleWithProviders {
  private _translations: Translations = {};

  public static withTranslations(translations: Translations): TranslateTestingModule {
    return new TranslateTestingModule().withTranslations(translations);
  }

  public get ngModule() {
    return TranslateTestingModule;
  }

  public get providers() {
    return [{
      provide: TranslateService,
      useValue: new TranslateService(
        null,
        new TestTranslateLoader(this._translations),
        new TranslateFakeCompiler(),
        new TranslateDefaultParser(),
        new FakeMissingTranslationHandler(),
        true,
        true
      )
    }];
  }

  public withTranslations(translations: Translations): TranslateTestingModule;
  public withTranslations(language: string, translations: LanguageTranslations);
  public withTranslations(languageOrTranslations: string | Translations, translations?: Translations): TranslateTestingModule {
    if (typeof languageOrTranslations === 'string' && translations) {
      this.addTranslations(languageOrTranslations, translations);
    } else if (languageOrTranslations) {
      Object.keys(languageOrTranslations).forEach(language => this.addTranslations(language, languageOrTranslations[language]));
    }
    return this;
  }

  private addTranslations(language: string, translations: LanguageTranslations) {
    if (this._translations[language]) {
      this._translations[language] = { ...(this._translations[language]), ...translations };
    } else {
      this._translations[language] = translations;
    }
  }

 }
