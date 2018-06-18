import { DebugElement } from '@angular/core';
import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TranslateTestingModule } from '@ngx-translate/testing';

import { AppComponent } from './app.component';
import { TranslateService } from '@ngx-translate/core';

describe('AppComponent', () => {
  const ENGLISH_LANGUAGE = 'en';
  const SPANISH_LANGUAGE = 'es';
  const ENGLISH_TRANSLATIONS = require('../assets/i18n/en.json');
  const SPANISH_TRANSLATIONS = require('../assets/i18n/es.json');

  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule.withTranslations(
          ENGLISH_LANGUAGE,
          ENGLISH_TRANSLATIONS
        ).withTranslations(SPANISH_LANGUAGE, SPANISH_TRANSLATIONS)
      ],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    const app = debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  describe('with default English translations', () => {
    it('should render the directive translation', async(() => {
      const element = debugElement.query(By.css('#directive-translation'));
      expect(element).toBeTruthy();
      expect(element.nativeNode.textContent).toEqual(ENGLISH_TRANSLATIONS.phrases.greeting);
    }));

    it('should render the pipe translation', async(() => {
      const element = debugElement.query(By.css('#pipe-translation'));
      expect(element).toBeTruthy();
      expect(element.nativeNode.textContent).toEqual(ENGLISH_TRANSLATIONS.phrases.farewell);
    }));

    it('should render the service translation', async(() => {
      const element = debugElement.query(By.css('#service-translation'));
      expect(element).toBeTruthy();
      expect(element.nativeNode.textContent).toEqual(ENGLISH_TRANSLATIONS.phrases.please);
    }));
  });

  describe('with Spanish translations', () => {
    beforeEach(inject([TranslateService], (translateService: TranslateService) => {
      translateService.use(SPANISH_LANGUAGE);
      fixture.detectChanges();
    }));

    it('should render the directive translation', async(() => {
      const element = debugElement.query(By.css('#directive-translation'));
      expect(element).toBeTruthy();
      expect(element.nativeNode.textContent).toEqual(SPANISH_TRANSLATIONS.phrases.greeting);
    }));

    it('should render the pipe translation', async(() => {
      const element = debugElement.query(By.css('#pipe-translation'));
      expect(element).toBeTruthy();
      expect(element.nativeNode.textContent).toEqual(SPANISH_TRANSLATIONS.phrases.farewell);
    }));

    it('should render the service translation', async(() => {
      fixture.detectChanges();
      const element = debugElement.query(By.css('#service-translation'));
      expect(element).toBeTruthy();
      expect(element.nativeNode.textContent).toEqual(SPANISH_TRANSLATIONS.phrases.please);
    }));
  });
});
