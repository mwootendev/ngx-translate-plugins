/**
 * Returns the base language if the provided language code includes localization. The language
 * code localization is expected to be delimited by a - or _ character. A null language code
 * will result in a null value.
 *
 * @export
 * @param {string} languageCode the language code that may contain a delimited localization.
 * @returns the base location code for a delimited localized language,
 *          the original language code if not localized, or null if the provided code is null.
 */
export function getBaseLanguage(languageCode: string) {
  const LOCALIZATION_SEPARATORS = /[-_]/;
  const localizationSeparator = languageCode && languageCode.match(LOCALIZATION_SEPARATORS);
  if (localizationSeparator) {
    return languageCode.substring(0, localizationSeparator.index);
  }

  return languageCode;
}
