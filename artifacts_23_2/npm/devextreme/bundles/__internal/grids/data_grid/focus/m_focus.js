/**
* DevExtreme (bundles/__internal/grids/data_grid/focus/m_focus.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _common = require("../../../../core/utils/common");
var _data = require("../../../../core/utils/data");
var _deferred = require("../../../../core/utils/deferred");
var _extend = require("../../../../core/utils/extend");
var _type = require("../../../../core/utils/type");
var _m_focus = require("../../../grids/grid_core/focus/m_focus");
var _m_core = _interopRequireDefault(require("../m_core"));
var _m_utils = require("../m_utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991 /* IE11 */;
_m_core.default.registerModule('focus', (0, _extend.extend)(true, {}, _m_focus.focusModule, {
  extenders: {
    controllers: {
      data: Base => /*#__PURE__*/function (_Base$inherit) {
        _inheritsLoose(FocusDataControllerExtender, _Base$inherit);
        function FocusDataControllerExtender() {
          return _Base$inherit.apply(this, arguments) || this;
        }
        var _proto = FocusDataControllerExtender.prototype;
        _proto.changeRowExpand = function changeRowExpand(path, isRowClick) {
          if (this.option('focusedRowEnabled') && Array.isArray(path) && this.isRowExpanded(path)) {
            const keyboardNavigation = this.getController('keyboardNavigation');
            if ((!isRowClick || !keyboardNavigation.isKeyboardEnabled()) && this._isFocusedRowInsideGroup(path)) {
              this.option('focusedRowKey', path);
            }
          }
          return _Base$inherit.prototype.changeRowExpand.call(this, path, isRowClick);
        };
        _proto._isFocusedRowInsideGroup = function _isFocusedRowInsideGroup(path) {
          const columnsController = this.getController('columns');
          const focusedRowKey = this.option('focusedRowKey');
          const rowIndex = this.getRowIndexByKey(focusedRowKey);
          const focusedRow = rowIndex >= 0 && this.getVisibleRows()[rowIndex];
          const groups = columnsController.getGroupDataSourceParameters(true);
          if (focusedRow) {
            for (let i = 0; i < path.length; ++i) {
              const getter = (0, _data.compileGetter)(groups[i] && groups[i].selector);
              // @ts-expect-error
              if (getter(focusedRow.data) !== path[i]) {
                return false;
              }
            }
          }
          return true;
        };
        _proto._getGroupPath = function _getGroupPath(groupItem, groupCount) {
          const groupPath = [];
          let items = [groupItem];
          while (items && items[0] && groupCount) {
            const item = items[0];
            if (item.key !== undefined) {
              groupPath.push(item.key);
            }
            items = item.items;
            groupCount--;
          }
          return groupPath;
        };
        _proto._expandGroupByPath = function _expandGroupByPath(that, groupPath, level) {
          // @ts-expect-error
          const d = new _deferred.Deferred();
          level++;
          that.expandRow(groupPath.slice(0, level)).done(() => {
            if (level === groupPath.length) {
              d.resolve();
            } else {
              that._expandGroupByPath(that, groupPath, level).done(d.resolve).fail(d.reject);
            }
          }).fail(d.reject);
          return d.promise();
        };
        _proto._calculateGlobalRowIndexByGroupedData = function _calculateGlobalRowIndexByGroupedData(key) {
          const that = this;
          const dataSource = that._dataSource;
          const filter = that._generateFilterByKey(key);
          // @ts-expect-error
          const deferred = new _deferred.Deferred();
          const isGroupKey = Array.isArray(key);
          const group = dataSource.group();
          if (isGroupKey) {
            return deferred.resolve(-1).promise();
          }
          if (!dataSource._grouping._updatePagingOptions) {
            that._calculateGlobalRowIndexByFlatData(key, null, true).done(deferred.resolve).fail(deferred.reject);
            return deferred;
          }
          dataSource.load({
            filter: that._concatWithCombinedFilter(filter),
            group
          }).done(data => {
            if (!data || data.length === 0 || !(0, _type.isDefined)(data[0].key) || data[0].key === -1) {
              return deferred.resolve(-1).promise();
            }
            const groupPath = that._getGroupPath(data[0], group.length);
            that._expandGroupByPath(that, groupPath, 0).done(() => {
              that._calculateExpandedRowGlobalIndex(deferred, key, groupPath, group);
            }).fail(deferred.reject);
          }).fail(deferred.reject);
          return deferred.promise();
        };
        _proto._calculateExpandedRowGlobalIndex = function _calculateExpandedRowGlobalIndex(deferred, key, groupPath, group) {
          const groupFilter = (0, _m_utils.createGroupFilter)(groupPath, {
            group
          });
          const dataSource = this._dataSource;
          const scrollingMode = this.option('scrolling.mode');
          const isVirtualScrolling = scrollingMode === 'virtual' || scrollingMode === 'infinite';
          const pageSize = dataSource.pageSize();
          let groupOffset;
          dataSource._grouping._updatePagingOptions({
            skip: 0,
            take: MAX_SAFE_INTEGER
          }, (groupInfo, totalOffset) => {
            if ((0, _common.equalByValue)(groupInfo.path, groupPath)) {
              groupOffset = totalOffset;
            }
          });
          this._calculateGlobalRowIndexByFlatData(key, groupFilter).done(dataOffset => {
            let count;
            let groupContinuationCount;
            if (dataOffset < 0) {
              deferred.resolve(-1);
              return;
            }
            const currentPageOffset = groupOffset % pageSize || pageSize;
            count = currentPageOffset + dataOffset - groupPath.length;
            if (isVirtualScrolling) {
              groupContinuationCount = 0;
            } else {
              groupContinuationCount = Math.floor(count / (pageSize - groupPath.length)) * groupPath.length;
            }
            count = groupOffset + dataOffset + groupContinuationCount;
            deferred.resolve(count);
          }).fail(deferred.reject);
        };
        return FocusDataControllerExtender;
      }(Base.inherit(_m_focus.focusModule.extenders.controllers.data))
    }
  }
}));