import { View } from '../m_modules';
import { getAiCommandColumnOptions } from './m_ai_column_controller_utils';
export class AiColumnView extends View {
  addAiCommandColumn() {
    this.columnsController.addCommandColumn(getAiCommandColumnOptions());
  }
  init() {
    this.columnsController = this.getController('columns');
    this.aiColumnController = this.getController('aiColumn');
    this.addAiCommandColumn();
  }
}