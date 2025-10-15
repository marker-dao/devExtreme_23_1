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
    const result = JSON.parse(response);
    return result;
  }
  generateDataDescription(data) {
    const result = JSON.stringify(data);
    return result;
  }
}