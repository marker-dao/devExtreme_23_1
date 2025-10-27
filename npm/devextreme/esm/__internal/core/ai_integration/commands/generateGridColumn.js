/**
* DevExtreme (esm/__internal/core/ai_integration/commands/generateGridColumn.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { BaseCommand } from '../../../core/ai_integration/commands/base';
export class GenerateGridColumnCommand extends BaseCommand {
  getTemplateName() {
    return 'generateGridColumn';
  }
  buildPromptData(params) {
    const dataDescription = this.generateDataDescription(params.data);
    return {
      user: {
        text: params.text,
        data: dataDescription
      }
    };
  }
  parseResult(response) {
    if (typeof response === 'string') {
      return {
        data: JSON.parse(response),
        additionalInfo: undefined
      };
    }
    const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
    return {
      data,
      additionalInfo: response.additionalInfo
    };
  }
  generateDataDescription(data) {
    const result = JSON.stringify(data);
    return result;
  }
}
