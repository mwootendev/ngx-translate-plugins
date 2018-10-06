import { TestBed, inject, async } from '@angular/core/testing';
import { TranslateLoader } from '@ngx-translate/core';

import { of as observableOf, throwError as observableThrowError } from 'rxjs';

import { LocalizedFallbackTranslateLoader } from './localized-fallback-translate-loader.service';

describe('LocalizedFallbackTranslateLoader', () => {
  const BASE_LANGUAGE_CODE = 'en';
  const LOCALIZED_LANGUAGE_CODE = `${BASE_LANGUAGE_CODE}-au`;
  const UNLOCALIZED_LANGUAGE_CODE = `${BASE_LANGUAGE_CODE}-GB`;
  const UNKNOWN_LANGUAGE_CODE = 'es';
  const UNKNOWN_LOCALIZATION_CODE = `${UNKNOWN_LANGUAGE_CODE}-ES`;
  const BASE_TRANSLATIONS = { greeting: 'Hello' };
  const LOCALIZED_TRANSLATIONS = { greeting: 'G\'day' };
  const NO_TRANSLATIONS_ERROR = 'No translations';

  const mockTranslateLoader = jasmine.createSpyObj('TranslateLoader', ['getTranslation']);
  let localizedTranslateLoader;

  mockTranslateLoader.getTranslation.and.callFake(
    (languageCode) => {
      switch (languageCode) {
        case LOCALIZED_LANGUAGE_CODE:
          return observableOf(LOCALIZED_TRANSLATIONS);
        case BASE_LANGUAGE_CODE:
          return observableOf(BASE_TRANSLATIONS);
        default:
          return observableThrowError(NO_TRANSLATIONS_ERROR);
      }
    }
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TranslateLoader, useValue: mockTranslateLoader },
        LocalizedFallbackTranslateLoader
      ]
    });
  });

  beforeEach(inject([LocalizedFallbackTranslateLoader], (translateLoader: LocalizedFallbackTranslateLoader) => {
    localizedTranslateLoader = translateLoader;
    mockTranslateLoader.getTranslation.calls.reset();
  }));

  it('should exist', () => {
    expect(localizedTranslateLoader).toBeTruthy();
  });

  describe('getTranslation()', () => {

    it('should be a function', () => {
      expect(localizedTranslateLoader.getTranslation).toBeTruthy();
      expect(typeof localizedTranslateLoader.getTranslation).toEqual('function');
    });

    it('should return the localized translations from the parent translate loader if they are present', async(() => {
      localizedTranslateLoader.getTranslation(LOCALIZED_LANGUAGE_CODE)
        .toPromise()
        .then((translations) => expect(translations).toEqual(LOCALIZED_TRANSLATIONS));
    }));

    it('should return the base language translations from the parent translate loader', async(() => {
      localizedTranslateLoader.getTranslation(UNLOCALIZED_LANGUAGE_CODE)
        .toPromise()
        .then((translations) => expect(translations).toEqual(BASE_TRANSLATIONS));
    }));

    it('should not retry retrieving the translations for an unknown base language', async(() => {
      localizedTranslateLoader.getTranslation(UNKNOWN_LANGUAGE_CODE)
        .toPromise()
        .then(fail)
        .catch((error) => {
          expect(error).toEqual(NO_TRANSLATIONS_ERROR);
          expect(mockTranslateLoader.getTranslation).toHaveBeenCalledWith(UNKNOWN_LANGUAGE_CODE);
          expect(mockTranslateLoader.getTranslation.calls.count()).toBe(1);
        });
    }));

    it('should propagate the error for an unknown language and localizaton', async(() => {
      localizedTranslateLoader.getTranslation(UNKNOWN_LOCALIZATION_CODE)
        .toPromise()
        .then(fail)
        .catch((error) => {
          expect(error).toEqual(NO_TRANSLATIONS_ERROR);
          expect(mockTranslateLoader.getTranslation).toHaveBeenCalledWith(UNKNOWN_LOCALIZATION_CODE);
          expect(mockTranslateLoader.getTranslation).toHaveBeenCalledWith(UNKNOWN_LANGUAGE_CODE);
          expect(mockTranslateLoader.getTranslation.calls.count()).toBe(2);
        });
    }));

  });
});
