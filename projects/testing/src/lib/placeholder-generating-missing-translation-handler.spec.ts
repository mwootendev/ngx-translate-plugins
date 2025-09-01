import {
  PlaceholderGeneratingMissingTranslationHandler,
  placeholderTranslationFor,
} from './placeholder-generating-missing-translation-handler';
import { TranslateService } from '@ngx-translate/core';

const key = Math.random().toString(36).substring(7);

describe('PlaceholderGeneratingMissingTranslationHandler', () => {
  const unusedTranslateService = null as unknown as TranslateService;
  let handler: PlaceholderGeneratingMissingTranslationHandler;

  beforeEach(() => {
    handler = new PlaceholderGeneratingMissingTranslationHandler();
  });

  it('should use the function exposed from the library', () => {
    expect(handler.handle({ key, translateService: unusedTranslateService })).toBe(
      placeholderTranslationFor(key)
    );

    expect(
      handler.handle({
        key: 'a key with {{param}}',
        translateService: unusedTranslateService,
        interpolateParams: { param: 'foobar' },
      })
    ).toEqual(placeholderTranslationFor('a key with {{param}}', { param: 'foobar' }));
  });
});

describe('placeholderTranslationFor(key) function', () => {
  it('should provide a human readable placeholder', () => {
    expect(placeholderTranslationFor('some key')).toEqual(`Translation for 'some key'`);
  });

  it('should include params in the placeholder', () => {
    expect(placeholderTranslationFor('some key with {{param}}', { param: 'foobar' })).toBe(
      `Translation for 'some key with {{param}}' with parameters: {"param":"foobar"}`
    );
  });

  it('should return the same placeholder no matter in what order the parameters are given', () => {
    expect(
      placeholderTranslationFor('key with {param1} and {param2}', { param1: 'foo', param2: 'bar' })
    ).toEqual(
      placeholderTranslationFor('key with {param1} and {param2}', { param2: 'bar', param1: 'foo' })
    );
  });
});
