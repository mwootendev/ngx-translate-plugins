import { TestBed, async, inject } from '@angular/core/testing';
import { TranslateTestingModule } from '../public_api';
import { TranslateService } from '@ngx-translate/core';

describe('TranslateTestingModule', () => {
  const GREETING_KEY = 'greeting';
  const ENGLISH_LANGUAGE = 'en';
  const ENGLISH_TRANSLATIONS = {
    [GREETING_KEY]: 'Hello'
  };
  const SPANISH_LANGUAGE = 'es';
  const SPANISH_TRANSLATIONS = {
    [GREETING_KEY]: 'Hola'
  };
  const TRANSLATIONS = {
    [ENGLISH_LANGUAGE]: ENGLISH_TRANSLATIONS,
    [SPANISH_LANGUAGE]: SPANISH_TRANSLATIONS
  };
  let translateModule: TranslateTestingModule;

  describe('static construction', () => {
    describe('withTranslations()', () => {
      describe('with language and translations', () => {
        beforeEach(() => {
          translateModule = TranslateTestingModule.withTranslations(
            ENGLISH_LANGUAGE,
            ENGLISH_TRANSLATIONS
          );
        });

        it('should initialize the translate module', () => {
          expect(translateModule).toBeTruthy();
          expect(translateModule instanceof TranslateTestingModule).toBeTruthy();
          expect(translateModule.ngModule).toEqual(TranslateTestingModule);
        });

        it('should provide a TranslateService', () => {
          const providers = translateModule.providers;

          expect(providers).toBeTruthy();
          expect(providers.length).toBe(1);

          expect(providers[0].provide).toEqual(TranslateService);
          expect(providers[0].useValue instanceof TranslateService).toBeTruthy();
        });

        describe('provided TranslateService', () => {
          let translateService: TranslateService;

          beforeEach(() => {
            translateService = translateModule.providers[0].useValue;
          });

          it('should set the default language to the one provided', () => {
            expect(translateService.defaultLang).toBe(ENGLISH_LANGUAGE);
          });

          it('should initialize the translations for the language', () => {
            expect(translateService.instant(GREETING_KEY)).toEqual(
              TRANSLATIONS[ENGLISH_LANGUAGE][GREETING_KEY]
            );
          });
        });
      });

      describe('with translations structure', () => {
        beforeEach(() => {
          translateModule = TranslateTestingModule.withTranslations(TRANSLATIONS);
        });

        it('should initialize the translate module', () => {
          expect(translateModule).toBeTruthy();
          expect(translateModule instanceof TranslateTestingModule).toBeTruthy();
          expect(translateModule.ngModule).toEqual(TranslateTestingModule);
        });

        it('should provide a TranslateService', () => {
          const providers = translateModule.providers;

          expect(providers).toBeTruthy();
          expect(providers.length).toBe(1);

          expect(providers[0].provide).toEqual(TranslateService);
          expect(providers[0].useValue instanceof TranslateService).toBeTruthy();
        });

        describe('provided TranslateService', () => {
          let translateService: TranslateService;

          beforeEach(() => {
            translateService = translateModule.providers[0].useValue;
            translateService.use(ENGLISH_LANGUAGE);
          });

          afterEach(() => {
            translateService.use(ENGLISH_LANGUAGE);
          });

          it('should set the default language to the FIRST language translations provided', () => {
            expect(translateService.defaultLang).toBe(ENGLISH_LANGUAGE);
          });

          it('should initialize the translations', () => {
            expect(translateService.instant(GREETING_KEY)).toEqual(
              TRANSLATIONS[ENGLISH_LANGUAGE][GREETING_KEY]
            );
            translateService.use(SPANISH_LANGUAGE);
            expect(translateService.instant(GREETING_KEY)).toEqual(
              TRANSLATIONS[SPANISH_LANGUAGE][GREETING_KEY]
            );
          });
        });
      });
    });
  });

  describe('instance methods', () => {
    beforeEach(() => {
      translateModule = new TranslateTestingModule();
    });

    describe('ngModule', () => {
      it('should exist', () => {
        expect(translateModule.ngModule).toBeTruthy();
      });

      it('should return a reference to the TranslateTestingModule', () => {
        expect(translateModule.ngModule).toEqual(TranslateTestingModule);
      });
    });

    describe('withTranslations()', () => {
      describe('with language and translations', () => {
        beforeEach(() => {
          translateModule = TranslateTestingModule.withTranslations(
            ENGLISH_LANGUAGE,
            ENGLISH_TRANSLATIONS
          );
        });

        it('should initialize the translate module', () => {
          expect(translateModule).toBeTruthy();
          expect(translateModule instanceof TranslateTestingModule).toBeTruthy();
          expect(translateModule.ngModule).toEqual(TranslateTestingModule);
        });

        it('should provide a TranslateService', () => {
          const providers = translateModule.providers;

          expect(providers).toBeTruthy();
          expect(providers.length).toBe(1);

          expect(providers[0].provide).toEqual(TranslateService);
          expect(providers[0].useValue instanceof TranslateService).toBeTruthy();
        });

        describe('provided TranslateService', () => {
          let translateService: TranslateService;

          beforeEach(() => {
            translateService = translateModule.providers[0].useValue;
          });

          it('should set the default language to the one provided', () => {
            expect(translateService.defaultLang).toBe(ENGLISH_LANGUAGE);
          });

          it('should initialize the translations for the language', () => {
            expect(translateService.instant(GREETING_KEY)).toEqual(
              TRANSLATIONS[ENGLISH_LANGUAGE][GREETING_KEY]
            );
          });
        });

        describe('with additional translations', () => {
          it('should merge the translations for the language', async(() => {
            const FAREWELL_KEY = 'farewell';
            const ADDITIONAL_ENGLISH_TRANSLATIONS = {
              [FAREWELL_KEY]: 'Goodbye'
            };
            translateModule.withTranslations(ENGLISH_LANGUAGE, ADDITIONAL_ENGLISH_TRANSLATIONS);
            const translateService = translateModule.providers[0].useValue;
            translateService
              .getTranslation(ENGLISH_LANGUAGE)
              .toPromise()
              .then(translations => {
                expect(translations).toBeTruthy();
                expect(translations[GREETING_KEY]).toEqual(
                  TRANSLATIONS[ENGLISH_LANGUAGE][GREETING_KEY]
                );
                expect(translations[FAREWELL_KEY]).toEqual(
                  ADDITIONAL_ENGLISH_TRANSLATIONS[FAREWELL_KEY]
                );
              });
          }));
        });
      });

      describe('with translations structure', () => {
        beforeEach(() => {
          translateModule = TranslateTestingModule.withTranslations(TRANSLATIONS);
        });

        it('should initialize the translate module', () => {
          expect(translateModule).toBeTruthy();
          expect(translateModule instanceof TranslateTestingModule).toBeTruthy();
          expect(translateModule.ngModule).toEqual(TranslateTestingModule);
        });

        it('should provide a TranslateService', () => {
          const providers = translateModule.providers;

          expect(providers).toBeTruthy();
          expect(providers.length).toBe(1);

          expect(providers[0].provide).toEqual(TranslateService);
          expect(providers[0].useValue instanceof TranslateService).toBeTruthy();
        });

        describe('provided TranslateService', () => {
          let translateService: TranslateService;

          beforeEach(() => {
            translateService = translateModule.providers[0].useValue;
            translateService.use(ENGLISH_LANGUAGE);
          });

          afterEach(() => {
            translateService.use(ENGLISH_LANGUAGE);
          });

          it('should set the default language to the FIRST language translations provided', () => {
            expect(translateService.defaultLang).toBe(ENGLISH_LANGUAGE);
          });

          it('should initialize the translations', () => {
            expect(translateService.instant(GREETING_KEY)).toEqual(
              TRANSLATIONS[ENGLISH_LANGUAGE][GREETING_KEY]
            );
            translateService.use(SPANISH_LANGUAGE);
            expect(translateService.instant(GREETING_KEY)).toEqual(
              TRANSLATIONS[SPANISH_LANGUAGE][GREETING_KEY]
            );
          });
        });
      });

      it('should have no effect if the translations are null', () => {
        translateModule = TranslateTestingModule.withTranslations(TRANSLATIONS).withTranslations(
          null
        );
        expect(translateModule).toBeTruthy();
      });
    });

    describe('withDefaultLanguage()', () => {
      beforeEach(() => {
        translateModule = TranslateTestingModule.withTranslations(TRANSLATIONS).withDefaultLanguage(
          SPANISH_LANGUAGE
        );
      });

      describe('provided TranslateService', () => {
        let translateService: TranslateService;

        beforeEach(() => {
          translateService = translateModule.providers[0].useValue;
        });

        it('should override the default language', () => {
          expect(translateService.defaultLang).toBe(SPANISH_LANGUAGE);
        });

        it('should use the translations for the overridden language', () => {
          expect(translateService.instant(GREETING_KEY)).toEqual(
            TRANSLATIONS[SPANISH_LANGUAGE][GREETING_KEY]
          );
        });
      });

      it('will retain a configured language if a null one is provided', () => {
        translateModule.withDefaultLanguage(null);
        const translateService = translateModule.providers[0].useValue;
        expect(translateService.defaultLang).toEqual(SPANISH_LANGUAGE);
      });
    });

    describe('withCompiler()', () => {
      it('should be a function', () => {
        expect(translateModule.withCompiler).toBeTruthy();
        expect(typeof translateModule.withCompiler).toEqual('function');
      });

      it('should override the compiler for the provided TranslateService instance', () => {
        const translateCompiler = jasmine.createSpyObj('TranslateCompiler', [
          'compile',
          'compileTranslations'
        ]);
        translateModule.withCompiler(translateCompiler);

        expect(translateModule.providers).toBeTruthy();
        expect(translateModule.providers.length).toBe(1);

        const translateService = translateModule.providers[0].useValue;
        expect(translateService.compiler).toEqual(translateCompiler);
      });
    });
  });
});
