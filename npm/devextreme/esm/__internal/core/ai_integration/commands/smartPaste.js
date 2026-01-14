/**
* DevExtreme (esm/__internal/core/ai_integration/commands/smartPaste.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Color from '../../../../color';
import errors from '../../../../ui/widget/ui.errors';
import { BaseCommand } from '../../../core/ai_integration/commands/base';
import { dateUtilsTs } from '../../../core/utils/date';
export class SmartPasteCommand extends BaseCommand {
  static toTyped(values, desiredType, fieldName) {
    const errorValue = JSON.stringify(values);
    const single = values.length <= 1 ? values[0] : undefined;
    const arr = values.length > 1 ? values : undefined;
    if (!single && !arr) {
      return undefined;
    }
    switch (desiredType) {
      case 'color':
        {
          if (new Color(single).colorIsInvalid) {
            throw errors.Error('E1064', fieldName, errorValue, 'color');
          }
          return single;
        }
      case 'boolean':
        {
          if (single === 'true') return true;
          if (single === 'false') return false;
          throw errors.Error('E1064', fieldName, errorValue, 'boolean');
        }
      case 'string':
        {
          if (!single) {
            throw errors.Error('E1064', fieldName, errorValue, 'string');
          }
          return single;
        }
      case 'stringArray':
        {
          if (!arr) {
            throw errors.Error('E1064', fieldName, errorValue, 'string array');
          }
          return arr;
        }
      case 'number':
        {
          if (single === undefined || !Number.isFinite(parseFloat(single))) {
            throw errors.Error('E1064', fieldName, errorValue, 'number');
          }
          return parseFloat(single);
        }
      case 'numberRange':
        {
          if (!arr || arr.length > 2) {
            throw errors.Error('E1064', fieldName, errorValue, 'number range');
          }
          const numbers = arr.map(v => parseFloat(v));
          if (!numbers.every(Number.isFinite)) {
            throw errors.Error('E1064', fieldName, errorValue, 'number range');
          }
          return [numbers[0], numbers[1]];
        }
      case 'date':
        {
          if (!dateUtilsTs.isValidDate(single)) {
            throw errors.Error('E1064', fieldName, errorValue, 'date');
          }
          return new Date(single);
        }
      case 'dateRange':
        {
          if (!arr || arr.length > 2 || !arr.every(dateUtilsTs.isValidDate)) {
            throw errors.Error('E1064', fieldName, errorValue, 'date range');
          }
          return arr.map(v => new Date(v));
        }
      default:
        return arr ?? single;
    }
  }
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
  parseResult(response, params) {
    const result = [];
    response.split(';;;').forEach(data => {
      if (!data) {
        return;
      }
      const [name, ...rawValues] = data.split(':::');
      const values = rawValues.map(value => value.trim());
      const fieldParams = params.fields.find(v => v.name === name);
      const value = SmartPasteCommand.toTyped(values, fieldParams === null || fieldParams === void 0 ? void 0 : fieldParams.type, fieldParams === null || fieldParams === void 0 ? void 0 : fieldParams.name);
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
