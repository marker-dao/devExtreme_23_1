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