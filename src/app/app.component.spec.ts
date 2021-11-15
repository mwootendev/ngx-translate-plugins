import { DebugElement } from '@angular/core';
import { TestBed, inject, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TranslateTestingModule } from 'ngx-translate-testing';

import { AppComponent } from './app.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';

describe('AppComponent', () => {
  const ENGLISH_LANGUAGE = 'en';
  const SPANISH_LANGUAGE = 'es';
  const ENGLISH_TRANSLATIONS = require('../assets/i18n/en.json');
  const SPANISH_TRANSLATIONS = require('../assets/i18n/es.json');

  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          TranslateTestingModule.withTranslations(ENGLISH_LANGUAGE, ENGLISH_TRANSLATIONS)
            .withTranslations(SPANISH_LANGUAGE, SPANISH_TRANSLATIONS)
            .withCompiler(new TranslateMessageFormatCompiler())
        ],
        declarations: [AppComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it(
    'should create the app',
    waitForAsync(() => {
      const app = debugElement.componentInstance;
      expect(app).toBeTruthy();
    })
  );

  describe('with default English translations', () => {
    it(
      'should render the directive translation',
      waitForAsync(() => {
        const element = debugElement.query(By.css('#directive-translation'));
        expect(element).toBeTruthy();
        expect(element.nativeNode.textContent).toEqual(ENGLISH_TRANSLATIONS.phrases.greeting);
      })
    );

    it(
      'should render the pipe translation',
      waitForAsync(() => {
        const element = debugElement.query(By.css('#pipe-translation'));
        expect(element).toBeTruthy();
        expect(element.nativeNode.textContent).toEqual(ENGLISH_TRANSLATIONS.phrases.farewell);
      })
    );

    it(
      'should render the service translation',
      waitForAsync(() => {
        const element = debugElement.query(By.css('#service-translation'));
        expect(element).toBeTruthy();
        expect(element.nativeNode.textContent).toEqual(ENGLISH_TRANSLATIONS.phrases.please);
      })
    );

    it(
      'should render the thanks translation for plural values',
      waitForAsync(() => {
        const element = debugElement.query(By.css('#thanks-plural-female-translation'));
        expect(element).toBeTruthy();
        expect(element.nativeNode.textContent).toEqual('Thank you, my friends.');
      })
    );

    it(
      'should render the thanks translation for a single value',
      waitForAsync(() => {
        const element = debugElement.query(By.css('#thanks-singular-male-translation'));
        expect(element).toBeTruthy();
        expect(element.nativeNode.textContent).toEqual('Thank you, my friend.');
      })
    );
  });

  describe('with Spanish translations', () => {
    beforeEach(inject([TranslateService], (translateService: TranslateService) => {
      translateService.use(SPANISH_LANGUAGE);
      fixture.detectChanges();
    }));

    it(
      'should render the directive translation',
      waitForAsync(() => {
        const element = debugElement.query(By.css('#directive-translation'));
        expect(element).toBeTruthy();
        expect(element.nativeNode.textContent).toEqual(SPANISH_TRANSLATIONS.phrases.greeting);
      })
    );

    it(
      'should render the pipe translation',
      waitForAsync(() => {
        const element = debugElement.query(By.css('#pipe-translation'));
        expect(element).toBeTruthy();
        expect(element.nativeNode.textContent).toEqual(SPANISH_TRANSLATIONS.phrases.farewell);
      })
    );

    it(
      'should render the service translation',
      waitForAsync(() => {
        const element = debugElement.query(By.css('#service-translation'));
        expect(element).toBeTruthy();
        expect(element.nativeNode.textContent).toEqual(SPANISH_TRANSLATIONS.phrases.please);
      })
    );

    it(
      'should render the thanks translation for plural values',
      waitForAsync(() => {
        const element = debugElement.query(By.css('#thanks-plural-female-translation'));
        expect(element).toBeTruthy();
        expect(element.nativeNode.textContent).toEqual('Gracias, mi amigas.');
      })
    );

    it(
      'should render the thanks translation for a single value',
      waitForAsync(() => {
        const element = debugElement.query(By.css('#thanks-singular-male-translation'));
        expect(element).toBeTruthy();
        expect(element.nativeNode.textContent).toEqual('Gracias, mi amigo.');
      })
    );
  });
});
