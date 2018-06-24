import { TestBed, inject } from '@angular/core/testing';

import { LocalizedFallbackTranslateLoader } from './localized-fallback-translate-loader.service';

describe('LocalizedFallbackTranslateLoader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalizedFallbackTranslateLoader]
    });
  });

  it('should be created', inject([LocalizedFallbackTranslateLoader], (service: LocalizedFallbackTranslateLoader) => {
    expect(service).toBeTruthy();
  }));
});
