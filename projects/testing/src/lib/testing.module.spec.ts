import { TranslateService, TranslateCompiler, TranslateParser } from '@ngx-translate/core';
import { TranslateTestingModule } from './testing.module';
import { waitForAsync, TestBed } from '@angular/core/testing';

const ENGLISH_LANGUAGE = 'en';
const SPANISH_LANGUAGE = 'es';
const GREETING_KEY = 'greeting';
const ENGLISH_TRANSLATIONS: Record<string, string> = { [GREETING_KEY]: 'Hello' };
const SPANISH_TRANSLATIONS: Record<string, string> = { [GREETING_KEY]: 'Hola' };
const TRANSLATIONS: Record<string, Record<string, string>> = {
  [ENGLISH_LANGUAGE]: ENGLISH_TRANSLATIONS,
  [SPANISH_LANGUAGE]: SPANISH_TRANSLATIONS
};

describe('TranslateTestingModule', () => {
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
          expect(providers.length).toBeGreaterThan(0);

          let hasTranslateService = false;
          for (let p of providers as any[]) {
            if (p === TranslateService || p.provide === TranslateService) hasTranslateService = true;
          }
          expect(hasTranslateService).toBeTruthy();
        });

        describe('provided TranslateService', () => {
          let translateService: TranslateService;

          beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [translateModule]
            });
            translateService = TestBed.inject(TranslateService);
          });

          it('should set the default language to the one provided', () => {
            expect(translateService.fallbackLang()).toBe(ENGLISH_LANGUAGE);
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
          expect(providers.length).toBeGreaterThan(0);

          let hasTranslateService = false;
          for (let p of providers as any[]) {
            if (p === TranslateService || p.provide === TranslateService) hasTranslateService = true;
          }
          expect(hasTranslateService).toBeTruthy();
        });

        describe('provided TranslateService', () => {
          let translateService: TranslateService;

          beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [translateModule]
            });
            translateService = TestBed.inject(TranslateService);
            translateService.use(ENGLISH_LANGUAGE);
          });

          afterEach(() => {
            translateService.use(ENGLISH_LANGUAGE);
          });

          it('should set the default language to the FIRST language translations provided', () => {
            expect(translateService.fallbackLang()).toBe(ENGLISH_LANGUAGE);
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
          expect(providers.length).toBeGreaterThan(0);

          let hasTranslateService = false;
          for (let p of providers as any[]) {
            if (p === TranslateService || p.provide === TranslateService) hasTranslateService = true;
          }
          expect(hasTranslateService).toBeTruthy();
        });

        describe('provided TranslateService', () => {
          let translateService: TranslateService;

          beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [translateModule]
            });
            translateService = TestBed.inject(TranslateService);
          });

          it('should set the default language to the one provided', () => {
            expect(translateService.fallbackLang()).toBe(ENGLISH_LANGUAGE);
          });

          it('should initialize the translations for the language', () => {
            expect(translateService.instant(GREETING_KEY)).toEqual(
              TRANSLATIONS[ENGLISH_LANGUAGE][GREETING_KEY]
            );
          });
        });

        describe('with additional translations', () => {
          it(
            'should merge the translations for the language',
            waitForAsync(() => {
              const FAREWELL_KEY = 'farewell';
              const ADDITIONAL_ENGLISH_TRANSLATIONS = {
                [FAREWELL_KEY]: 'Goodbye'
              };
              translateModule.withTranslations(ENGLISH_LANGUAGE, ADDITIONAL_ENGLISH_TRANSLATIONS);

              TestBed.configureTestingModule({
                imports: [translateModule]
              });
              let translateService = TestBed.inject(TranslateService);

              translateService.use(ENGLISH_LANGUAGE);

              const translations: any = translateService.getTranslations(ENGLISH_LANGUAGE);
              expect(translations).toBeTruthy();
              expect(translations[GREETING_KEY]).toEqual(
                TRANSLATIONS[ENGLISH_LANGUAGE][GREETING_KEY]
              );
              expect(translations[FAREWELL_KEY]).toEqual(
                ADDITIONAL_ENGLISH_TRANSLATIONS[FAREWELL_KEY]
              );
            })
          );
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
          expect(providers.length).toBeGreaterThan(0);

          let hasTranslateService = false;
          for (let p of providers as any[]) {
            if (p === TranslateService || p.provide === TranslateService) hasTranslateService = true;
          }
          expect(hasTranslateService).toBeTruthy();
        });

        describe('provided TranslateService', () => {
          let translateService: TranslateService;

          beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [translateModule]
            });
            translateService = TestBed.inject(TranslateService);
            translateService.use(ENGLISH_LANGUAGE);
          });

          afterEach(() => {
            translateService.use(ENGLISH_LANGUAGE);
          });

          it('should set the default language to the FIRST language translations provided', () => {
            expect(translateService.fallbackLang()).toBe(ENGLISH_LANGUAGE);
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
          null as any
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
          TestBed.configureTestingModule({
              imports: [translateModule]
          });
          translateService = TestBed.inject(TranslateService);
        });

        it('should override the default language', () => {
          expect(translateService.fallbackLang()).toBe(SPANISH_LANGUAGE);
        });

        it('should use the translations for the overridden language', () => {
          expect(translateService.instant(GREETING_KEY)).toEqual(
            TRANSLATIONS[SPANISH_LANGUAGE][GREETING_KEY]
          );
        });
      });

      it('will retain a configured language if a null one is provided', () => {
        translateModule.withDefaultLanguage(null as any);
        TestBed.configureTestingModule({
              imports: [translateModule]
          });
        let translateService = TestBed.inject(TranslateService);
        expect(translateService.fallbackLang()).toEqual(SPANISH_LANGUAGE);
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

        TestBed.configureTestingModule({
              imports: [translateModule]
          });
        const compiler = TestBed.inject(TranslateCompiler);
        expect(compiler).toEqual(translateCompiler);
      });
    });

    describe('withParser()', () => {
      it('should be a function', () => {
        expect(translateModule.withParser).toBeTruthy();
        expect(typeof translateModule.withParser).toEqual('function');
      });

      it('should override the parser for the provided TranslateService instance', () => {
        const translateParser = jasmine.createSpyObj('TranslateParser', ['getValue']);
        translateModule.withParser(translateParser);

        TestBed.configureTestingModule({
              imports: [translateModule]
          });
        const parser = TestBed.inject(TranslateParser);
        expect(parser).toEqual(translateParser);
      });
    });
  });
});
