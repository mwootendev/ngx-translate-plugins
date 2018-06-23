

export function getBaseLanguage(languageCode: string) {
  const LOCALIZATION_SEPARATORS = /[-_]/;
  const localizationSeparator = languageCode && languageCode.match(LOCALIZATION_SEPARATORS);
  if (localizationSeparator) {
    return languageCode.substring(0, localizationSeparator.index);
  }

  return languageCode;
}
