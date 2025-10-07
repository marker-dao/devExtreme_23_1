/**
* DevExtreme (esm/__internal/core/ai_integration/commands/translate.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { BaseCommand } from '../../../core/ai_integration/commands/base';
export class TranslateCommand extends BaseCommand {
  getTemplateName() {
    return 'translate';
  }
  buildPromptData(params) {
    return {
      system: {
        lang: params.lang
      },
      user: {
        text: params.text
      }
    };
  }
  parseResult(response) {
    return response;
  }
}
