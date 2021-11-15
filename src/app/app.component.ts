import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'mew-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  please: Observable<string>;

  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');

    this.please = translate.stream('phrases.please');
  }
}
