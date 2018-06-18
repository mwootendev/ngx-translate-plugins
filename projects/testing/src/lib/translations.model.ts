export declare type LanguageTranslation = string | { [translationKey: string]: LanguageTranslation };

/**
 * LanguageTranslations represents a mapping between a translation key and the translation for that key
 * or to nested translation keys.
 *
 * @export
 * @interface LanguageTranslations
 */
export interface LanguageTranslations {
  [translationKey: string]: LanguageTranslation;
}

/**
 * Translations represents a mapping between a language and the translations for that language.
 *
 * @export
 * @interface Translations
 */
export interface Translations {
  [language: string]: LanguageTranslations;
}
