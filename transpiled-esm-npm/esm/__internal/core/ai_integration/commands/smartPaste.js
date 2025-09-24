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