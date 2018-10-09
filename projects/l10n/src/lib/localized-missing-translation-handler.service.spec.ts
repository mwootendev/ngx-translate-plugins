import { TestBed, inject } from '@angular/core/testing';

import { MissingTranslationHandlerParams, TranslateService } from '@ngx-translate/core';

import { LocalizedMissingTranslationHandler } from './localized-missing-translation-handler.service';

describe('LocalizedMissingTranslationHandlerService', () => {
  const BASE_LANGUAGE_CODE = 'en';
  const LOCALIZED_LANGUAGE_CODE = `${BASE_LANGUAGE_CODE}-au`;
  const TRANSLATION_KEY = 'missing.translation';

  const missingTranslateParams: MissingTranslationHandlerParams = {
    key: TRANSLATION_KEY,
    translateService: null
  };

  let localizedMissingTranslationHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalizedMissingTranslationHandler]
    });
  });

  beforeEach(inject([LocalizedMissingTranslationHandler], (service: LocalizedMissingTranslationHandler) => {
    localizedMissingTranslationHandler = service;
    missingTranslateParams.translateService = {} as TranslateService;
  }));

  it('should exist', () => {
    expect(localizedMissingTranslationHandler).toBeTruthy();
  });

  describe('handle()', () => {

    it('should be a function', () => {
      expect(localizedMissingTranslationHandler.handle).toBeTruthy();
      expect(typeof localizedMissingTranslationHandler.handle).toBe('function');
    });

    it('should return the original translation key for a base language', () => {
      missingTranslateParams.translateService.currentLang = BASE_LANGUAGE_CODE;
      expect(localizedMissingTranslationHandler.handle(missingTranslateParams)).toEqual(TRANSLATION_KEY);
    });

  });

});
