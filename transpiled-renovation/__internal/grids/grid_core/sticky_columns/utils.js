"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processFixedColumns = exports.normalizeOffset = exports.needToRemoveColumnBorder = exports.needToDisableStickyColumn = exports.isLastFixedColumn = exports.isFixedEdge = exports.isFirstFixedColumn = exports.getStickyOffset = exports.getColumnFixedPosition = void 0;
var _type = require("../../../../core/utils/type");
var _m_utils = _interopRequireDefault(require("../../../grids/grid_core/m_utils"));
var _const = require("../adaptivity/const");
var _const2 = require("./const");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const getColumnFixedPosition = (that,
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
column) => {
  const {
    fixedPosition
  } = column;
  const rtlEnabled = that.option('rtlEnabled');
  // NOTE: in RTL for master-detail & group rows, command column has already right position
  const isExceptionCommandColumn = column.command && column.command === 'expand';
  const isDefaultCommandColumn = column.command && !_m_utils.default.isCustomCommandColumn(that._columns, column);
  if (isDefaultCommandColumn && rtlEnabled && !isExceptionCommandColumn) {
    return fixedPosition === _const2.StickyPosition.Right ? _const2.StickyPosition.Left : _const2.StickyPosition.Right;
  }
  return fixedPosition ?? _const2.StickyPosition.Left;
};
exports.getColumnFixedPosition = getColumnFixedPosition;
const needToDisableStickyColumn = function (that,
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
column) {
  return that.isVirtualMode() && !!column.fixed && column.fixedPosition === _const2.StickyPosition.Sticky;
};
exports.needToDisableStickyColumn = needToDisableStickyColumn;
const processFixedColumns = function (that, columns) {
  return columns.map(column => {
    if (needToDisableStickyColumn(that, column)) {
      return _extends({}, column, {
        fixed: false,
        fixedPosition: ''
      });
    }
    return column;
  });
};
exports.processFixedColumns = processFixedColumns;
const isVisibleColumn = function (that, column) {
  return column.visibleWidth !== _const.HIDDEN_COLUMNS_WIDTH && (!column.isBand || !!that.getVisibleDataColumnsByBandColumn(column.index).length);
};
const areNextOnlyFixedOrHiddenColumns = function (that, columns) {
  return !columns.some(column => !column.fixed && isVisibleColumn(that, column));
};
// TODO Add description for this method
const getStickyOffsetCore = function (that, columns, widths, columnIndex, fixedPosition, offsets) {
  const column = columns[columnIndex];
  const isChildColumn = (0, _type.isDefined)(column.ownerBand);
  const targetColumnIsRight = fixedPosition === _const2.StickyPosition.Right;
  const targetColumnIsSticky = column.fixedPosition === _const2.StickyPosition.Sticky;
  const nextOrPrevColumns = targetColumnIsRight ? columns.slice(columnIndex + 1) : columns.slice(0, columnIndex).reverse();
  const nextOrPrevColumnWidths = targetColumnIsRight ? widths.slice(columnIndex + 1) : widths.slice(0, columnIndex).reverse();
  let offset = 0;
  let adjacentStickyColumnIndex = 0;
  let nonSiblingStickyColumnCount = !areNextOnlyFixedOrHiddenColumns(that, nextOrPrevColumns) && targetColumnIsSticky && nextOrPrevColumns.length ? 1 : 0;
  nextOrPrevColumns.forEach((col, colIndex) => {
    if (col.fixed && (!(0, _type.isDefined)(offsets) || column.ownerBand === col.ownerBand)) {
      const columnIsSticky = col.fixedPosition === _const2.StickyPosition.Sticky;
      offset += nextOrPrevColumnWidths[colIndex] ?? col.visibleWidth;
      if (targetColumnIsSticky && columnIsSticky && !areNextOnlyFixedOrHiddenColumns(that, nextOrPrevColumns.slice(colIndex + 1))) {
        if (colIndex !== adjacentStickyColumnIndex) {
          nonSiblingStickyColumnCount += 1;
          adjacentStickyColumnIndex = colIndex + 1;
        } else {
          adjacentStickyColumnIndex += 1;
        }
      }
    } else if (!isVisibleColumn(that, col)) {
      adjacentStickyColumnIndex += 1;
    }
  });
  if (isChildColumn && (0, _type.isDefined)(offsets)) {
    var _offsets$column$owner;
    offset += (offsets === null || offsets === void 0 || (_offsets$column$owner = offsets[column.ownerBand]) === null || _offsets$column$owner === void 0 ? void 0 : _offsets$column$owner[fixedPosition]) ?? 0;
    return offset;
  }
  return offset - nonSiblingStickyColumnCount * _const2.STICKY_BORDER_WIDTH;
};
const isFirstOrLastColumn = function (that,
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
column, rowIndex) {
  let onlyWithinBandColumn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  let isLast = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  let fixedPosition = arguments.length > 5 ? arguments[5] : undefined;
  const rtlEnabled = that.option('rtlEnabled');
  const methodName = rtlEnabled !== isLast ? 'isLastColumn' : 'isFirstColumn';
  if (column.fixedPosition === _const2.StickyPosition.Sticky) {
    const parentColumn = that.getParentColumn(column) ?? column;
    if (that[methodName](parentColumn, 0)) {
      return false;
    }
  }
  return that[methodName](column, rowIndex, onlyWithinBandColumn, fixedPosition);
};
const getPrevColumn = function (that, column, visibleColumns, rowIndex) {
  const visibleColumnIndex = that.getVisibleIndex(column.index, rowIndex);
  return visibleColumns === null || visibleColumns === void 0 ? void 0 : visibleColumns.slice(0, visibleColumnIndex).reverse().find(col => isVisibleColumn(that, col));
};
const getStickyOffset = function (that,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
columns, widths, columnIndex, offsets) {
  const result = {};
  const column = columns[columnIndex];
  if (column) {
    const fixedPosition = getColumnFixedPosition(that, column);
    switch (fixedPosition) {
      case _const2.StickyPosition.Sticky:
        {
          const offsetLeft = getStickyOffsetCore(that, columns, widths, columnIndex, _const2.StickyPosition.Left, offsets);
          const offsetRight = getStickyOffsetCore(that, columns, widths, columnIndex, _const2.StickyPosition.Right, offsets);
          result.left = offsetLeft;
          result.right = offsetRight;
          break;
        }
      case _const2.StickyPosition.Right:
        {
          const offsetRight = getStickyOffsetCore(that, columns, widths, columnIndex, _const2.StickyPosition.Right, offsets);
          result.right = offsetRight;
          break;
        }
      default:
        {
          const offsetLeft = getStickyOffsetCore(that, columns, widths, columnIndex, _const2.StickyPosition.Left, offsets);
          result.left = offsetLeft;
        }
    }
  }
  return result;
};
exports.getStickyOffset = getStickyOffset;
const needToRemoveColumnBorderCore = function (that, column, visibleColumns, rowIndex) {
  const prevColumn = getPrevColumn(that, column, visibleColumns, rowIndex);
  const columnFixedPosition = getColumnFixedPosition(that, column);
  const prevColumnFixedPosition = prevColumn && getColumnFixedPosition(that, prevColumn);
  return !!(prevColumn !== null && prevColumn !== void 0 && prevColumn.fixed) && !needToDisableStickyColumn(that, prevColumn) && (!column.fixed || columnFixedPosition === _const2.StickyPosition.Sticky || prevColumnFixedPosition === _const2.StickyPosition.Sticky);
};
const needToRemoveColumnBorder = function (that,
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
column, rowIndex) {
  let isDataColumn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  const visibleColumns = that.getVisibleColumns(isDataColumn ? null : rowIndex);
  const parentColumn = that.getParentColumn(column);
  if (parentColumn) {
    const isFirstColumn = that.isFirstColumn(column, rowIndex, true);
    return isFirstColumn && needToRemoveColumnBorderCore(that, parentColumn, that.getVisibleColumns(0), 0);
  }
  return needToRemoveColumnBorderCore(that, column, visibleColumns, rowIndex);
};
exports.needToRemoveColumnBorder = needToRemoveColumnBorder;
const normalizeOffset = function (offset) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const styleProps = {};
  if ((0, _type.isDefined)(offset.left)) {
    styleProps.left = `${offset.left}px`;
  }
  if ((0, _type.isDefined)(offset.right)) {
    styleProps.right = `${offset.right}px`;
  }
  return styleProps;
};
exports.normalizeOffset = normalizeOffset;
const isFirstFixedColumn = function (that,
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
column, rowIndex) {
  let onlyWithinBandColumn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  let fixedPosition = arguments.length > 4 ? arguments[4] : undefined;
  return isFirstOrLastColumn(that, column, rowIndex, onlyWithinBandColumn, false, fixedPosition);
};
exports.isFirstFixedColumn = isFirstFixedColumn;
const isLastFixedColumn = function (that,
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
column, rowIndex) {
  let onlyWithinBandColumn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  let fixedPosition = arguments.length > 4 ? arguments[4] : undefined;
  return isFirstOrLastColumn(that, column, rowIndex, onlyWithinBandColumn, true, fixedPosition);
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
exports.isLastFixedColumn = isLastFixedColumn;
const isFixedEdge = function (point, column, nextColumn) {
  const isSplitPoint = (0, _type.isDefined)(point.isLeftBoundary) || (0, _type.isDefined)(point.isRightBoundary);
  return !isSplitPoint && !!column && !!nextColumn && column.fixed !== nextColumn.fixed;
};
exports.isFixedEdge = isFixedEdge;