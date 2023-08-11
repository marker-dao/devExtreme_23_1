"use strict";

var _deferred = require("../../../core/utils/deferred");
var _extend = require("../../../core/utils/extend");
var _m_focus = require("../../grids/grid_core/focus/m_focus");
var _m_core = _interopRequireDefault(require("./m_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function findIndex(items, callback) {
  var result = -1;
  items.forEach(function (node, index) {
    if (callback(node)) {
      result = index;
    }
  });
  return result;
}
_m_core.default.registerModule('focus', (0, _extend.extend)(true, {}, _m_focus.focusModule, {
  extenders: {
    controllers: {
      data: {
        changeRowExpand(key) {
          if (this.option('focusedRowEnabled') && this.isRowExpanded(key)) {
            if (this._isFocusedRowInside(key)) {
              this.option('focusedRowKey', key);
            }
          }
          return this.callBase.apply(this, arguments);
        },
        _isFocusedRowInside(parentKey) {
          var focusedRowKey = this.option('focusedRowKey');
          var rowIndex = this.getRowIndexByKey(focusedRowKey);
          var focusedRow = rowIndex >= 0 && this.getVisibleRows()[rowIndex];
          var parent = focusedRow && focusedRow.node.parent;
          while (parent) {
            if (parent.key === parentKey) {
              return true;
            }
            parent = parent.parent;
          }
          return false;
        },
        getParentKey(key) {
          var that = this;
          var dataSource = that._dataSource;
          var node = that.getNodeByKey(key);
          // @ts-expect-error
          var d = new _deferred.Deferred();
          if (node) {
            d.resolve(node.parent ? node.parent.key : undefined);
          } else {
            dataSource.load({
              filter: [dataSource.getKeyExpr(), '=', key]
            }).done(function (items) {
              var parentData = items[0];
              if (parentData) {
                d.resolve(dataSource.parentKeyOf(parentData));
              } else {
                d.resolve();
              }
            }).fail(d.reject);
          }
          return d.promise();
        },
        expandAscendants(key) {
          var that = this;
          var dataSource = that._dataSource;
          // @ts-expect-error
          var d = new _deferred.Deferred();
          that.getParentKey(key).done(function (parentKey) {
            if (dataSource && parentKey !== undefined && parentKey !== that.option('rootValue')) {
              dataSource._isNodesInitializing = true;
              that.expandRow(parentKey);
              dataSource._isNodesInitializing = false;
              that.expandAscendants(parentKey).done(d.resolve).fail(d.reject);
            } else {
              d.resolve();
            }
          }).fail(d.reject);
          return d.promise();
        },
        getPageIndexByKey(key) {
          var that = this;
          var dataSource = that._dataSource;
          // @ts-expect-error
          var d = new _deferred.Deferred();
          that.expandAscendants(key).done(function () {
            dataSource.load({
              parentIds: []
            }).done(function (nodes) {
              var offset = findIndex(nodes, function (node) {
                return that.keyOf(node.data) === key;
              });
              var pageIndex = -1;
              if (offset >= 0) {
                pageIndex = Math.floor(offset / that.pageSize());
              }
              d.resolve(pageIndex);
            }).fail(d.reject);
          }).fail(d.reject);
          return d.promise();
        }
      }
    }
  }
}));