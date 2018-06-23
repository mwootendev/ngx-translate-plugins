import { Injectable } from '@angular/core';

import { MissingTranslationHandler } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizedMissingTranslationHandler implements MissingTranslationHandler {

  constructor() { }


}
