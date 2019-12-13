import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable()
export class FailoverMissingTranslationHandler implements MissingTranslationHandler {
  constructor(private _missingTranslationHandlers: MissingTranslationHandler[]) {}

  public handle(params: MissingTranslationHandlerParams): any {
    let translation = params.key;
    let handlerIndex = 0;
    while (
      (!translation || translation === params.key) &&
      handlerIndex < this._missingTranslationHandlers.length
    ) {
      translation = this._missingTranslationHandlers[handlerIndex].handle(params);
      handlerIndex++;
    }

    return translation || params.key;
  }
}
