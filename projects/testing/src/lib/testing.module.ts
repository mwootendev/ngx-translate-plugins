import { ModuleWithProviders, NgModule, Injector, Provider, APP_INITIALIZER } from '@angular/core';

import {
  DefaultMissingTranslationHandler,
  MissingTranslationHandler,
  TranslateDefaultParser,
  TranslateLoader,
  TranslateParser,
  TranslateStore,
  TranslateNoOpCompiler as TranslateFakeCompiler,
  TranslateService,
  TranslateCompiler,
  TranslateDirective,
  TranslatePipe
} from '@ngx-translate/core';

import { TestTranslateLoader } from './test-translate-loader.service';
import { LanguageTranslations, Translations } from './translations.model';

@NgModule({
    imports: [TranslateDirective, TranslatePipe],
    exports: [TranslateDirective, TranslatePipe]
})
export class TranslateTestingModule implements ModuleWithProviders<TranslateTestingModule> {
  private _translations: Translations = {};
  private _defaultLanguage: string;
  private _compiler: TranslateCompiler;
  private _parser: TranslateDefaultParser;

  public static withTranslations(
    language: string,
    translations: LanguageTranslations
  ): TranslateTestingModule;

  public static withTranslations(translations: Translations): TranslateTestingModule;

  public static withTranslations(
    languageOrTranslations: string | Translations,
    translations?: LanguageTranslations
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

  public get providers(): Provider[] {
    const providers: Provider[] = [
        TranslateStore,
        { provide: TranslateLoader, useFactory: () => new TestTranslateLoader(this._translations) },
        { provide: TranslateCompiler, useFactory: () => this._compiler || new TranslateFakeCompiler() },
        { provide: TranslateParser, useFactory: () => this._parser || new TranslateDefaultParser() },
        { provide: MissingTranslationHandler, useClass: DefaultMissingTranslationHandler },
        TranslateService,
        {
          provide: APP_INITIALIZER,
          useFactory: (translateService: TranslateService) => {
            return () => {
              if (this._defaultLanguage) {
                  translateService.setFallbackLang(this._defaultLanguage);
              }
            };
          },
          deps: [TranslateService],
          multi: true
        }
    ];

    return providers;
  }

  public withTranslations(translations: Translations): TranslateTestingModule;

  public withTranslations(
    language: string,
    translations: LanguageTranslations
  ): TranslateTestingModule;

  public withTranslations(
    languageOrTranslations: string | Translations,
    translations?: LanguageTranslations
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

  public withCompiler(compiler: TranslateCompiler): TranslateTestingModule {
    this._compiler = compiler;
    return this;
  }

  public withParser(parser: TranslateDefaultParser): TranslateTestingModule {
    this._parser = parser;
    return this;
  }

  public withDefaultLanguage(language: string): TranslateTestingModule {
    this._defaultLanguage = language || this._defaultLanguage;
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
