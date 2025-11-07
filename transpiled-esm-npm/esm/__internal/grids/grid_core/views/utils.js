import { AI_COLUMN_NAME } from '../ai_column/const';
import gridCoreUtils from '../m_utils';
export const getCellText = (column, displayValue) => !column.command || column.type === AI_COLUMN_NAME ? gridCoreUtils.formatValue(displayValue, column) : '';