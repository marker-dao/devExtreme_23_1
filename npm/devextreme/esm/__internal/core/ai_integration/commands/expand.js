/**
* DevExtreme (esm/__internal/core/ai_integration/commands/expand.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { BaseCommand } from '../../../core/ai_integration/commands/base';
export class ExpandCommand extends BaseCommand {
  getTemplateName() {
    return 'expand';
  }
  buildPromptData(params) {
    return {
      user: {
        text: params.text
      }
    };
  }
  parseResult(response) {
    return response;
  }
}
