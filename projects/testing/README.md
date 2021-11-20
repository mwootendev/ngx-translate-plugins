# ngx-translate-testing

Unit testing utilities for the [ngx-translate](http//www.ngx-translate.com)  internationalization (i18n) library for Angular.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)

## Installation

Currently, `ngx-translate-testing` is compatible with Angular 6+ and `@ngx-translate/core` 10+. Prior versions of Angular and `ngx-translate` are not supported. See the version table below for more details.

| Angular | @ngx-translate/core | ngx-translate-testing |
|:-------:|:-------------------:|:---------------------:|
|  6.0.0  |        10.0.0       |         1.0.0         |
|  7.0.0  |        11.0.0       |         2.0.0         |
|  8.0.0  |        11.0.0       |         3.0.0         |
|  9.0.0  |        12.0.0       |         4.0.0         |
| 10.0.0  |        13.0.0       |         5.0.0         |
| 11.0.0  |        13.0.0       |         5.1.0         |
| 12.0.0  |        13.0.0       |         5.2.0         |
| 13.0.0  |        14.0.0       |         6.0.0         |

The `ngx-translate-testing` module needs to be installed as a test dependency using your favorite NPM client.

```sh
npm install ngx-translate-testing --save-dev
```
or
```sh
yarn add ngx-translate-testing --dev
```

## Usage

### TranslateTestingModule

The `TranslateTestingModule` class can provide all of the capabilities of the `ngx-translate` `TranslateModule` (translation directives, pipes,and services) and easily be configured with translations for your test cases.

The module can easily be imported into your test cases:

```ts
import { TranslateTestingModule } from 'ngx-translate-testing';
```

#### JavaScript Translation Objects

The first way to configure the testing module is with hard-coded JavaScript objects for translations. At the root of the object you
provide language codes, with any structures nested underneath representing the translations keys or values.

```ts
const ENGLISH_LANGUAGE = 'en';
const ENGLISH_TRANSLATIONS = {
  pleasantries: {
    greeting: 'Hello',
    appreciation: 'Thank You!'
  }
};

const SPANISH_LANGUAGE = 'es';
const SPANISH_TRANSLATIONS = {
  pleasantries: {
    greeting: 'Hola',
    appreciation: 'Gracias'
  }
};

const TRANSLATIONS = {
  [ENGLISH_LANGUAGE]: ENGLISH_TRANSLATIONS,
  [SPANISH_LANGUAGE]: SPANISH_TRANSLATIONS
};
```

The TranslateTestingModule is initialized using the static `withTranslations()` method. The method can either accept a complete
translations structure

```ts
TranslateTestingModule.withTranslations(TRANSLATIONS)
```

or the individual language translations separately

```ts
TranslateTestingModule.withTranslations(ENGLISH_LANGUAGE, ENGLISH_TRANSLATIONS)
```

The module also provides `withTranslations()` instance methods that can be chained to add additional languages or additional translations for a language (via a shallow merge).

```ts
TranslateTestingModule.withTranslations(ENGLISH_LANGUAGE, ENGLISH_TRANSLATIONS)
  .withTranslations(SPANISH_LANGUAGE, SPANISH_TRANSLATIONS)
  .withTranslations(ENGLISH_LANGUAGE, require('../../assets/i18n/en.json'))
```

#### Default Language

The TranslateTestingModule will set the default language to the first language it is provided. If `withTranslations()` is called with an explicit language (e.g. `withTranslations('en', ENGLISH)`) then the default language will be set to that language code. If a complete translations object is provided (e.g. `withTranslations({en: ENGLISH, es: SPANISH})`) then the first language key will be used.

The default language can be overridden using the `withDefaultLanguage()` instance method to explicitly define the default language.

```ts
TranslateTestingModule
  .withTranslations({en: ENGLISH, es: SPANISH})
  .withDefaultLanguage('es')
```

#### Custom Compiler

Be default, the `TranslateTestingModule` will use the `TranslateFakeCompiler` instance. If your translations use a custom compiler, such as the [ngx-translate-messageformat-compiler](https://github.com/lephyrus/ngx-translate-messageformat-compiler), you can specify the compiler with the `withCompiler()` instance method.

```ts
TranslateTestingModule
  .withTranslations('en', require('../../assets/i18n/en_msgfmt.json'))
  .withCompiler(new TranslateMessageFormatCompiler())
```

## License
Licensed under MIT

## Contributors

* Michael Wooten ([@mwootendev](https://github.com/mwootendev))
* Paulo Soares ([@7jpsan](https://github.com/7jpsan))
* Paul Iannello ([paul-kr](https://github.com/paul-kr))
* Arnaud Tiérant ([@atierant](https://github.com/atierant))
