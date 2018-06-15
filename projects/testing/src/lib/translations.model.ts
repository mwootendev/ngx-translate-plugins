export declare type LanguageTranslation = string | { [translationKey: string]: LanguageTranslation };

export interface LanguageTranslations {
  [translationKey: string]: LanguageTranslation;
}

export interface Translations {
  [language: string]: LanguageTranslations;
}
