import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

/**
 * Returns a placeholder that can be used to write tests when `TranslateTestingModule.withPlaceholderTransactions()` is used.
 *
 * @param key The key that is to be translated.
 * @param params Optional interpolation params.
 *
 * @export
 */
export const placeholderTranslationFor = (key: string, params?: Object) => {
  return `Translation for '${key}'${!!params ? ` with parameters: ${serialized(params)}` : ''}`;
};

const serialized = (params: Object) =>
  JSON.stringify(
    Object.keys(params)
      .map((key) => [key, params[key]])
      .sort(([key], [otherKey]) => key.localeCompare(otherKey))
      .reduce((previous, [key, value]) => ({ ...previous, [key]: value }), {})
  );

export class PlaceholderGeneratingMissingTranslationHandler implements MissingTranslationHandler {
  handle({ key, interpolateParams }: MissingTranslationHandlerParams): any {
    return placeholderTranslationFor(key, interpolateParams);
  }
}
