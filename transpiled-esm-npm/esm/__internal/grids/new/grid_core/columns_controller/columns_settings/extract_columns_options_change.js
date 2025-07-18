import { getPathParts } from '../../../../../../core/utils/data';
import { getColumnIdxFromPath, getColumnOptionPathStr, isAllowedColumnValue, isCorrectColumnIdx } from './utils';
const ROOT_COLUMNS_OPTION_NAME = 'columns';
export const extractColumnsOptionsChange = _ref => {
  let {
    fullName,
    value
  } = _ref;
  const updatePath = getPathParts(fullName);
  const [rootUpdatePath] = updatePath;
  switch (true) {
    case rootUpdatePath !== ROOT_COLUMNS_OPTION_NAME:
      return null;
    // NOTE: Whole columns array update case:
    // -> 'columns'
    case updatePath.length === 1 && Array.isArray(value):
      return {
        type: 'allColumns',
        value: value ?? null
      };
    // NOTE: Specific column update case:
    // -> 'columns[idx]'
    case updatePath.length === 2 && isAllowedColumnValue(value) && isCorrectColumnIdx(updatePath[1]):
      return {
        type: 'column',
        columnIdx: getColumnIdxFromPath(updatePath),
        value
      };
    // NOTE: Specific column property update case:
    // -> 'columns[idx].property'
    // -> 'columns[idx].nested.anotherNester.property'
    case updatePath.length > 2 && isCorrectColumnIdx(updatePath[1]):
      return {
        type: 'columnOption',
        columnIdx: getColumnIdxFromPath(updatePath),
        optionPath: getColumnOptionPathStr(updatePath),
        value
      };
    default:
      return null;
  }
};