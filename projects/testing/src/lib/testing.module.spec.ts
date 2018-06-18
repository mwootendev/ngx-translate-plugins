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

  describe('withTranslations()', () => {
    beforeEach(() => {
      translateModule = new TranslateTestingModule();
    });

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
