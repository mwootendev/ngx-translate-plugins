import { TestBed, inject } from '@angular/core/testing';

import { LocalizedMissingTranslationHandler } from './localized-missing-translation-handler.service';

describe('LocalizedMissingTranslationHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalizedMissingTranslationHandler]
    });
  });

  it('should be created', inject([LocalizedMissingTranslationHandler], (service: LocalizedMissingTranslationHandler) => {
    expect(service).toBeTruthy();
  }));
});
