import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  FakeMissingTranslationHandler,
  TranslateDefaultParser,
  TranslateFakeCompiler,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';

import { TestTranslateLoader } from './test-translate-loader.service';
import { LanguageTranslations, Translations } from './translations.model';

/**
 * The TranslateTestingModule provides the {TranslateModule} as well as a
 * {TranslateService} configured to return translations specific for the
 * test environment.
 *
 * @export
 * @class TranslateTestingModule
 * @implements {ModuleWithProviders}
 */
@NgModule({
  imports: [TranslateModule],
  exports: [TranslateModule]
})
export class TranslateTestingModule implements ModuleWithProviders {
  private _translations: Translations = {};

  private _defaultLanguage: string;

  /**
   * Creates a new instance of the {TranslateTestingModule} with translations for the specified language.
   *
   * @example
   *
   * const ENGLISH_TRANSLATIONS = { greeting: 'Hello' };
   * const translateModule = TranslateTestingModule.withTranslations('en', ENGLISH_TRANSLATIONS);
   *
   * @example
   *
   * TranslateTestingModule.withTranslations('en', require('../../assets/i18n/en.json'));
   *
   * @static
   * @param {string} language the language for the translations.
   * @param {Translations} translations the translations to be used in the tests.
   * @returns {TranslateTestingModule} the new instance that can be used to chain additional configuration.
   * @memberof TranslateTestingModule
   */
  public static withTranslations(
    language: string,
    translations: LanguageTranslations
  ): TranslateTestingModule;

  /**
   * Creates a new instance of the {TranslateTestingModule} with the provided translations.
   *
   * @example
   *
   * const TRANSLATIONS = { en: { greeting: 'Hello' }, es: { greeting: 'Hola' } };
   * const translateModule = TranslateTestingModule.withTranslations(TRANSLATIONS);
   *
   * @example
   *
   * TranslateTestingModule.withTranslations(require('./test.i18n.json'));
   *
   * @static
   * @param {Translations} the language translations the translations to be used in the tests.
   * @returns {TranslateTestingModule} the new instance that can be used to chain additional configuration.
   * @memberof TranslateTestingModule
   */
  public static withTranslations(translations: Translations): TranslateTestingModule;

  public static withTranslations(
    languageOrTranslations: string | Translations,
    translations?: Translations
  ): TranslateTestingModule {
    const translateTestingModule = new TranslateTestingModule();

    if (typeof languageOrTranslations === 'string') {
      return translateTestingModule.withTranslations(<string>languageOrTranslations, translations);
    }

    return translateTestingModule.withTranslations(languageOrTranslations);
  }

  public get ngModule() {
    return TranslateTestingModule;
  }

  public get providers() {
    const translateService = new TranslateService(
      null,
      new TestTranslateLoader(this._translations),
      new TranslateFakeCompiler(),
      new TranslateDefaultParser(),
      new FakeMissingTranslationHandler(),
      true,
      true
    );

    if (this._defaultLanguage) {
      translateService.setDefaultLang(this._defaultLanguage);
    }

    return [
      {
        provide: TranslateService,
        useValue: translateService
      }
    ];
  }

  /**
   * Updates the {TranslateTestingModule} instance with additional translations. The
   * translations will be shallowly merged with any existing translations.
   *
   * @example
   *
   * const ENGLISH_TRANSLATIONS = { en: { greeting: 'Hello' } };
   * const SPANISH_TRANSLATIONS = { en: { greeting: 'Hola' } };
   * const translateModule = TranslateTestingModule.withTranslations(ENGLISH_TRANSLATIONS)
   *   .withTranslations(SPANISH_TRANSLATIONS);
   *
   * @param {Translations} translations the additional translations to add to the testing service.
   * @returns {TranslateTestingModule} the instance that can be used to chain additional configuration.
   * @memberof TranslateTestingModule
   */
  public withTranslations(translations: Translations): TranslateTestingModule;

  /**
   * Updates the {TranslateTestingModule} instance with additional translations for a
   * specified language. The translations will be shallowly merged with any existing translations.
   *
   * @example
   *
   * const ENGLISH_TRANSLATIONS = { greeting: 'Hello' };
   * const SPANISH_TRANSLATIONS = { greeting: 'Hola' };
   * const translateModule = TranslateTestingModule.withTranslations('en', ENGLISH_TRANSLATIONS)
   *   .withTranslations('es', SPANISH_TRANSLATIONS);
   *
   * @example
   *
   * TranslateTestingModule.withTranslations('en', require('../../assets/i18n/en.json'))
   *   .withTranslations('es', require('../../assets/i18n/es.json'));
   *
   * @param {string} language the language for which the new translations are being added.
   * @param {LanguageTranslations} translations the translations for the specified language.
   * @memberof TranslateTestingModule
   */
  public withTranslations(language: string, translations: LanguageTranslations);

  public withTranslations(
    languageOrTranslations: string | Translations,
    translations?: Translations
  ): TranslateTestingModule {
    if (typeof languageOrTranslations === 'string' && translations) {
      this.addTranslations(languageOrTranslations, translations);
      this._defaultLanguage = languageOrTranslations;
    } else if (languageOrTranslations) {
      Object.keys(languageOrTranslations).forEach(language =>
        this.addTranslations(language, languageOrTranslations[language])
      );
    }
    return this;
  }

  private addTranslations(language: string, translations: LanguageTranslations) {
    if (!this._defaultLanguage) {
      this._defaultLanguage = language;
    }

    if (this._translations[language]) {
      this._translations[language] = {
        ...this._translations[language],
        ...translations
      };
    } else {
      this._translations[language] = translations;
    }
  }
}
