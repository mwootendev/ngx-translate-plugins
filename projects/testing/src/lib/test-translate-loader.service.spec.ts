import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { Translations } from './translations.model';
import { TestTranslateLoader } from './test-translate-loader.service';

describe('TestTranslateLoader', () => {
  const ENGLISH_LANGUAGE = 'en';
  const SPANISH_LANGUAGE = 'es';

  const GREETING = 'greeting';
  const GREETING_ENGLISH = 'Hello';
  const GREETING_SPANISH = 'Hola';

  const THANK_YOU = 'thanks';
  const THANK_YOU_ENGLISH = 'Thank you!';
  const THANK_YOU_SPANISH = '¡Gracias!';

  const TRANSLATIONS: Translations = {
    [ENGLISH_LANGUAGE]: {
      [GREETING]: GREETING_ENGLISH,
      [THANK_YOU]: THANK_YOU_ENGLISH
    },
    [SPANISH_LANGUAGE]: {
      [GREETING]: GREETING_SPANISH,
      [THANK_YOU]: THANK_YOU_SPANISH
    }
  };

  let translateLoader: TestTranslateLoader;

  describe('constructor', () => {
    it('should create without translations', () => {
      translateLoader = new TestTranslateLoader();
      expect(translateLoader).toBeTruthy();
    });

    it('should create with translations', () => {
      translateLoader = new TestTranslateLoader(TRANSLATIONS);
      expect(translateLoader).toBeTruthy();
    });
  });

  describe('getTranslation()', () => {
    beforeAll(() => {
      translateLoader = new TestTranslateLoader(TRANSLATIONS);
    });

    it('should be a function', () => {
      expect(translateLoader.getTranslation).toBeTruthy();
      expect(typeof translateLoader.getTranslation).toEqual('function');
    });

    it('should return the English translations', done => {
      translateLoader.getTranslation(ENGLISH_LANGUAGE).subscribe(englishTranslations => {
        expect(englishTranslations).toEqual(TRANSLATIONS[ENGLISH_LANGUAGE]);
        done();
      });
    });

    it('should return the Spanish translations', done => {
      translateLoader.getTranslation(SPANISH_LANGUAGE).subscribe(spanishTranslations => {
        expect(spanishTranslations).toEqual(TRANSLATIONS[SPANISH_LANGUAGE]);
        done();
      });
    });

    it('should return an empty set of translations for an unknown language', done => {
      translateLoader.getTranslation('fr').subscribe(unknownTranslations => {
        expect(unknownTranslations).toEqual({});
        done();
      });
    });
  });
});
