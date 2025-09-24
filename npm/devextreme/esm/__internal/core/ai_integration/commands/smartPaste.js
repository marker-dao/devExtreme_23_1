/**
* DevExtreme (esm/__internal/core/ai_integration/commands/smartPaste.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { BaseCommand } from '../../../core/ai_integration/commands/base';
export class SmartPasteCommand extends BaseCommand {
  getTemplateName() {
    return 'smartPaste';
  }
  buildPromptData(params) {
    const fieldsInstructions = this.generateFieldsInstructions(params.fields);
    return {
      user: {
        text: params.text,
        fields: fieldsInstructions
      }
    };
  }
  parseResult(response) {
    const result = [];
    response.split(';;;').forEach(data => {
      if (!data) {
        return;
      }
      const [name, ...rawValues] = data.split(':::');
      const values = rawValues.map(value => value.trim());
      const value = values.length <= 1 ? values[0] : values;
      if (value) {
        result.push({
          name,
          value
        });
      }
    });
    return result;
  }
  generateFieldsInstructions(fields) {
    const fieldData = fields.map(field => {
      const instruction = field.instruction ?? '';
      return `fieldName: ${field.name}, format: ${field.format}${instruction ? `, instruction: ${instruction}` : ''}`;
    });
    return fieldData.join(';;;');
  }
}
