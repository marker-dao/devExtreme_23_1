/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { isObject } from '../../../../../core/utils/type';
import { getColumnByIndexOrName } from './utils';
export function PublicMethods(GridCore) {
  return class GridCoreWithColumnsController extends GridCore {
    getVisibleColumns() {
      return this.columnsController.visibleColumns.peek();
    }
    addColumn(column) {
      this.columnsController.addColumn(column);
    }
    getVisibleColumnIndex(columnNameOrIndex) {
      const column = getColumnByIndexOrName(this.columnsController.columns.peek(), columnNameOrIndex);
      return this.columnsController.visibleColumns.peek().findIndex(c => c.name === (column === null || column === void 0 ? void 0 : column.name));
    }
    deleteColumn(columnNameOrIndex) {
      const column = getColumnByIndexOrName(this.columnsController.columns.peek(), columnNameOrIndex);
      if (!column) {
        return;
      }
      this.columnsController.deleteColumn(column);
    }
    columnOption(columnNameOrIndex, option, value) {
      const column = getColumnByIndexOrName(this.columnsController.columns.peek(), columnNameOrIndex);
      if (!column) {
        return;
      }
      if (arguments.length === 1) {
        return column;
      }
      if (arguments.length === 2) {
        if (isObject(option)) {
          Object.entries(option).forEach(_ref => {
            let [optionName, optionValue] = _ref;
            this.columnsController.columnOption(column, optionName, optionValue);
          });
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return column[option];
        }
      }
      if (arguments.length === 3) {
        this.columnsController.columnOption(column, option, value);
      }
    }
  };
}