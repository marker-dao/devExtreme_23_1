/**
* DevExtreme (bundles/__internal/grids/tree_list/rows/m_rows.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RowsView = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _type = require("../../../../core/utils/type");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _remove = require("../../../../events/remove");
var _m_rows_view = require("../../../grids/grid_core/views/m_rows_view");
var _m_core = _interopRequireDefault(require("../m_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const TREELIST_TEXT_CONTENT = 'dx-treelist-text-content';
const TREELIST_EXPAND_ICON_CONTAINER_CLASS = 'dx-treelist-icon-container';
const TREELIST_CELL_EXPANDABLE_CLASS = 'dx-treelist-cell-expandable';
const TREELIST_EMPTY_SPACE = 'dx-treelist-empty-space';
const TREELIST_EXPANDED_CLASS = 'dx-treelist-expanded';
const TREELIST_COLLAPSED_CLASS = 'dx-treelist-collapsed';
const RowsView = _m_rows_view.rowsModule.views.rowsView.inherit(function () {
  const createCellContent = function ($container) {
    return (0, _renderer.default)('<div>').addClass(TREELIST_TEXT_CONTENT).appendTo($container);
  };
  const createIcon = function (hasIcon, isExpanded) {
    const $iconElement = (0, _renderer.default)('<div>').addClass(TREELIST_EMPTY_SPACE);
    if (hasIcon) {
      $iconElement.toggleClass(TREELIST_EXPANDED_CLASS, isExpanded).toggleClass(TREELIST_COLLAPSED_CLASS, !isExpanded).append((0, _renderer.default)('<span>'));
    }
    return $iconElement;
  };
  return {
    _renderIconContainer($container, options) {
      const $iconContainer = (0, _renderer.default)('<div>').addClass(TREELIST_EXPAND_ICON_CONTAINER_CLASS).appendTo($container);
      if (options.watch) {
        const dispose = options.watch(() => [options.row.level, options.row.isExpanded, options.row.node.hasChildren], () => {
          $iconContainer.empty();
          this._renderIcons($iconContainer, options);
        });
        _events_engine.default.on($iconContainer, _remove.removeEvent, dispose);
      }
      $container.addClass(TREELIST_CELL_EXPANDABLE_CLASS);
      return this._renderIcons($iconContainer, options);
    },
    _renderIcons($iconContainer, options) {
      const {
        row
      } = options;
      const {
        level
      } = row;
      for (let i = 0; i <= level; i++) {
        $iconContainer.append(createIcon(i === level && row.node.hasChildren, row.isExpanded));
      }
      return $iconContainer;
    },
    _renderCellCommandContent(container, model) {
      this._renderIconContainer(container, model);
      return true;
    },
    _processTemplate(template, options) {
      var _a;
      const that = this;
      let resultTemplate;
      const renderingTemplate = this.callBase(template);
      const firstDataColumnIndex = that._columnsController.getFirstDataColumnIndex();
      if (renderingTemplate && ((_a = options.column) === null || _a === void 0 ? void 0 : _a.index) === firstDataColumnIndex) {
        resultTemplate = {
          render(options) {
            const $container = options.container;
            if (that._renderCellCommandContent($container, options.model)) {
              options.container = createCellContent($container);
            }
            renderingTemplate.render(options);
          }
        };
      } else {
        resultTemplate = renderingTemplate;
      }
      return resultTemplate;
    },
    _updateCell($cell, options) {
      $cell = $cell.hasClass(TREELIST_TEXT_CONTENT) ? $cell.parent() : $cell;
      this.callBase($cell, options);
    },
    _rowClick(e) {
      const dataController = this._dataController;
      const $targetElement = (0, _renderer.default)(e.event.target);
      const isExpandIcon = this.isExpandIcon($targetElement);
      const item = dataController && dataController.items()[e.rowIndex];
      if (isExpandIcon && item) {
        dataController.changeRowExpand(item.key);
      }
      this.callBase(e);
    },
    _createRow(row) {
      const node = row && row.node;
      const $rowElement = this.callBase.apply(this, arguments);
      if (node) {
        this.setAria('level', row.level + 1, $rowElement);
        if (node.hasChildren) {
          this.setAria('expanded', row.isExpanded, $rowElement);
        }
      }
      return $rowElement;
    },
    _getGridRoleName() {
      return 'treegrid';
    },
    isExpandIcon($targetElement) {
      return !!$targetElement.closest(".".concat(TREELIST_EXPANDED_CLASS, ", .").concat(TREELIST_COLLAPSED_CLASS)).length;
    },
    setAriaExpandedAttribute($row, row) {
      const isRowExpanded = row.isExpanded;
      this.setAria('expanded', (0, _type.isDefined)(isRowExpanded) && isRowExpanded.toString(), $row);
    }
  };
}());
exports.RowsView = RowsView;
_m_core.default.registerModule('rows', {
  defaultOptions: _m_rows_view.rowsModule.defaultOptions,
  views: {
    rowsView: RowsView
  }
});