/**
* DevExtreme (esm/__internal/core/ai_integration/commands/execute.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { BaseCommand } from '../../../core/ai_integration/commands/base';
export class ExecuteCommand extends BaseCommand {
  getTemplateName() {
    return 'execute';
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
