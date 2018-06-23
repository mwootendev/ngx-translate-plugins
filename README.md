# ngx-translate-plugins

The `ngx-translate-plugins` application is designed to serve as a demo application and test bed for plugins related to the 
[ngx-translate](http://www.ngx-translate.com) internationalization (i18n) library.

## Subprojects

### @ngx-translate/testing

The [@ngx-translate/testing](projects/testing/README.md) library provides utilities for unit testing with translations.

## Development

Development of the demo application and the libraries is handled through NPM scripts. 

### Demo Application

Run `yarn run start:app` or `npm run start:app` for a development server with the demo application. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Running Unit Tests

Unit tests for the demo application can be run using `yarn run test:app` or `npm run test:app`. If you would like a coverage 
report printed after the test cases execute, use the `yarn run coverage:app` or `npm run coverage:app` scripts.

Unit tests for the `@ngx-translate/testing` library can be run using `yarn run test:lib` or `npm run test:lib`. For library code coverage, the `yarn run coverage:lib` or `npm run coverage:lib` scripts are also available.
