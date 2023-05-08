"use strict";

exports.columnChooserModule = void 0;
var _size = require("../../core/utils/size");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _common = require("../../core/utils/common");
var _uiGrid_core = _interopRequireDefault(require("./ui.grid_core.modules"));
var _uiGrid_core2 = require("./ui.grid_core.columns_view");
var _message = _interopRequireDefault(require("../../localization/message"));
var _themes = require("../themes");
var _tree_view = _interopRequireDefault(require("../tree_view"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _ui = _interopRequireDefault(require("../popup/ui.popup"));
var _button = _interopRequireDefault(require("../button"));
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-expect-error

var COLUMN_CHOOSER_CLASS = 'column-chooser';
var COLUMN_CHOOSER_BUTTON_CLASS = 'column-chooser-button';
var NOTOUCH_ACTION_CLASS = 'notouch-action';
var COLUMN_CHOOSER_LIST_CLASS = 'column-chooser-list';
var COLUMN_CHOOSER_PLAIN_CLASS = 'column-chooser-plain';
var COLUMN_CHOOSER_DRAG_CLASS = 'column-chooser-mode-drag';
var COLUMN_CHOOSER_SELECT_CLASS = 'column-chooser-mode-select';
var COLUMN_CHOOSER_ICON_NAME = 'column-chooser';
var COLUMN_CHOOSER_ITEM_CLASS = 'dx-column-chooser-item';
var CLICK_TIMEOUT = 300;
var processItems = function processItems(that, chooserColumns) {
  var items = [];
  var isSelectMode = that.isSelectMode();
  var isRecursive = that.option('columnChooser.selection.recursive');
  if (chooserColumns.length) {
    (0, _iterator.each)(chooserColumns, function (index, column) {
      var item = {
        text: column.caption,
        cssClass: column.cssClass,
        allowHiding: column.allowHiding,
        expanded: true,
        id: column.index,
        disabled: column.allowHiding === false,
        parentId: (0, _type.isDefined)(column.ownerBand) ? column.ownerBand : null
      };
      var isRecursiveWithColumns = isRecursive && column.hasColumns;
      if (isSelectMode && !isRecursiveWithColumns) {
        item.selected = column.visible;
      }
      items.push(item);
    });
  }
  return items;
};

/**
 * @type {Partial<import('./ui.grid_core.column_chooser').ColumnChooserController>}
 */
var columnChooserControllerMembers = {
  renderShowColumnChooserButton: function renderShowColumnChooserButton($element) {
    var that = this;
    var columnChooserButtonClass = that.addWidgetPrefix(COLUMN_CHOOSER_BUTTON_CLASS);
    var columnChooserEnabled = that.option('columnChooser.enabled');
    var $showColumnChooserButton = $element.find('.' + columnChooserButtonClass);
    var $columnChooserButton;
    if (columnChooserEnabled) {
      if (!$showColumnChooserButton.length) {
        $columnChooserButton = (0, _renderer.default)('<div>').addClass(columnChooserButtonClass).appendTo($element);
        that._createComponent($columnChooserButton, _button.default, {
          icon: COLUMN_CHOOSER_ICON_NAME,
          onClick: function onClick() {
            that.getView('columnChooserView').showColumnChooser();
          },
          hint: that.option('columnChooser.title'),
          // @ts-expect-error
          integrationOptions: {}
        });
      } else {
        $showColumnChooserButton.show();
      }
    } else {
      $showColumnChooserButton.hide();
    }
  },
  getPosition: function getPosition() {
    var rowsView = this.getView('rowsView');
    var position = this.option('columnChooser.position');
    return (0, _type.isDefined)(position) ? position : {
      my: 'right bottom',
      at: 'right bottom',
      of: rowsView && rowsView.element(),
      collision: 'fit',
      offset: '-2 -2',
      boundaryOffset: '2 2'
    };
  }
};
var ColumnChooserController = _uiGrid_core.default.ViewController.inherit(columnChooserControllerMembers);

/**
 * @type {Partial<import('./ui.grid_core.column_chooser').ColumnChooserView>}
 */
var columnChooserMembers = {
  _resizeCore: _common.noop,
  _isWinDevice: function _isWinDevice() {
    // @ts-expect-error
    return !!_devices.default.real().win;
  },
  _updateList: function _updateList(change) {
    var items;
    var $popupContent = this._popupContainer.$content();
    var isSelectMode = this.isSelectMode();
    var columnChooserList = this._columnChooserList;
    var chooserColumns = this._columnsController.getChooserColumns(isSelectMode);
    this._popupContainer.setAria({
      role: 'dialog',
      label: _message.default.format('dxDataGrid-columnChooserTitle')
    });

    // T726413
    if (isSelectMode && columnChooserList && change && change.changeType === 'selection') {
      items = processItems(this, chooserColumns);
      for (var i = 0; i < items.length; i++) {
        var selected = items[i].selected;
        var id = items[i].id;
        if (id === change.columnIndex) {
          if (selected) {
            columnChooserList.selectItem(id, selected);
          } else {
            columnChooserList.unselectItem(id, selected);
          }
        }
      }
    } else if (!isSelectMode || !columnChooserList || change === 'full') {
      this._popupContainer.$wrapper().toggleClass(this.addWidgetPrefix(COLUMN_CHOOSER_DRAG_CLASS), !isSelectMode).toggleClass(this.addWidgetPrefix(COLUMN_CHOOSER_SELECT_CLASS), isSelectMode);
      items = processItems(this, chooserColumns);
      this._renderTreeView($popupContent, items);
    }
  },
  _initializePopupContainer: function _initializePopupContainer() {
    var that = this;
    var columnChooserClass = that.addWidgetPrefix(COLUMN_CHOOSER_CLASS);
    var $element = that.element().addClass(columnChooserClass);
    var columnChooserOptions = that.option('columnChooser');
    var themeName = (0, _themes.current)();
    var isGenericTheme = (0, _themes.isGeneric)(themeName);
    var isMaterial = (0, _themes.isMaterial)(themeName);
    var dxPopupOptions = {
      visible: false,
      shading: false,
      showCloseButton: false,
      dragEnabled: true,
      resizeEnabled: true,
      wrapperAttr: {
        class: columnChooserClass
      },
      toolbarItems: [{
        text: columnChooserOptions.title,
        toolbar: 'top',
        location: isGenericTheme || isMaterial ? 'before' : 'center'
      }],
      position: that.getController('columnChooser').getPosition(),
      width: columnChooserOptions.width,
      height: columnChooserOptions.height,
      rtlEnabled: that.option('rtlEnabled'),
      onHidden: function onHidden() {
        if (that._isWinDevice()) {
          (0, _renderer.default)('body').removeClass(that.addWidgetPrefix(NOTOUCH_ACTION_CLASS));
        }
      },
      // @ts-expect-error
      container: columnChooserOptions.container
    };
    if (isGenericTheme || isMaterial) {
      (0, _extend.extend)(dxPopupOptions, {
        showCloseButton: true
      });
    } else {
      // @ts-expect-error
      dxPopupOptions.toolbarItems[dxPopupOptions.toolbarItems.length] = {
        shortcut: 'cancel'
      };
    }
    if (!(0, _type.isDefined)(this._popupContainer)) {
      that._popupContainer = that._createComponent($element, _ui.default, dxPopupOptions);
      that._popupContainer.on('optionChanged', function (args) {
        if (args.name === 'visible') {
          // @ts-expect-error
          that.renderCompleted.fire();
        }
      });
    } else {
      this._popupContainer.option(dxPopupOptions);
    }
  },
  _renderCore: function _renderCore(change) {
    if (this._popupContainer) {
      this._updateList(change);
    }
  },
  _renderTreeView: function _renderTreeView($container, items) {
    var _columnChooser$search, _columnChooser$search2, _columnChooser$search3;
    var that = this;
    var columnChooser = this.option('columnChooser');
    var isSelectMode = this.isSelectMode();
    var searchEnabled = (0, _type.isDefined)(columnChooser.allowSearch) ? columnChooser.allowSearch : (_columnChooser$search = columnChooser.search) === null || _columnChooser$search === void 0 ? void 0 : _columnChooser$search.enabled;
    var searchTimeout = (0, _type.isDefined)(columnChooser.searchTimeout) ? columnChooser.searchTimeout : (_columnChooser$search2 = columnChooser.search) === null || _columnChooser$search2 === void 0 ? void 0 : _columnChooser$search2.timeout;

    /**
     * @type {import('../tree_view').Options}
     */
    var treeViewConfig = {
      dataStructure: 'plain',
      activeStateEnabled: true,
      focusStateEnabled: true,
      hoverStateEnabled: true,
      itemTemplate: 'item',
      showCheckBoxesMode: 'none',
      rootValue: null,
      searchEnabled: searchEnabled,
      searchTimeout: searchTimeout,
      searchEditorOptions: (_columnChooser$search3 = columnChooser.search) === null || _columnChooser$search3 === void 0 ? void 0 : _columnChooser$search3.editorOptions
    };
    var scrollableInstance = $container.find('.dx-scrollable').data('dxScrollable');
    var scrollTop = scrollableInstance && scrollableInstance.scrollTop();
    if (isSelectMode && !this._columnsController.isBandColumnsUsed()) {
      $container.addClass(this.addWidgetPrefix(COLUMN_CHOOSER_PLAIN_CLASS));
    }
    treeViewConfig.onContentReady = function (e) {
      (0, _common.deferUpdate)(function () {
        if (scrollTop) {
          /**
           * @type {import('../scroll_view/ui.scrollable').default}
          */
          // @ts-expect-error
          var scrollable = (0, _renderer.default)(e.element).find('.dx-scrollable').data('dxScrollable');
          scrollable && scrollable.scrollTo({
            y: scrollTop
          });
        }

        // @ts-expect-error
        that.renderCompleted.fire();
      });
    };
    if (this._isWinDevice()) {
      treeViewConfig.useNativeScrolling = false;
    }
    (0, _extend.extend)(treeViewConfig, isSelectMode ? this._prepareSelectModeConfig() : this._prepareDragModeConfig());

    // we need to set items after setting selectNodesRecursive, so they will be processed correctly inside TreeView
    treeViewConfig.items = items;
    if (this._columnChooserList) {
      if (!treeViewConfig.searchEnabled) {
        treeViewConfig.searchValue = '';
      }
      this._columnChooserList.option(treeViewConfig);
    } else {
      this._columnChooserList = this._createComponent($container, _tree_view.default, treeViewConfig);
      $container.addClass(this.addWidgetPrefix(COLUMN_CHOOSER_LIST_CLASS));
    }
  },
  _prepareDragModeConfig: function _prepareDragModeConfig() {
    var columnChooserOptions = this.option('columnChooser');
    return {
      noDataText: columnChooserOptions.emptyPanelText,
      activeStateEnabled: false,
      focusStateEnabled: false,
      hoverStateEnabled: false,
      itemTemplate: function itemTemplate(data, index, item) {
        (0, _renderer.default)(item).text(data.text).parent().addClass(data.cssClass).addClass(COLUMN_CHOOSER_ITEM_CLASS);
      }
    };
  },
  _prepareSelectModeConfig: function _prepareSelectModeConfig() {
    var that = this;
    var selectionOptions = this.option('columnChooser.selection') || {};
    var getFlatNodes = function getFlatNodes(nodes) {
      var addNodesToArray = function addNodesToArray(nodes, flatNodesArray) {
        return nodes.reduce(function (result, node) {
          result.push(node);
          if (node.children.length) {
            addNodesToArray(node.children, result);
          }
          return result;
        }, flatNodesArray);
      };
      return addNodesToArray(nodes, []);
    };
    var updateSelection = function updateSelection(e, nodes) {
      nodes.filter(function (node) {
        return node.itemData.allowHiding === false;
      }).forEach(function (node) {
        return e.component.selectItem(node.key);
      });
    };
    var updateColumnVisibility = function updateColumnVisibility(nodes) {
      nodes.forEach(function (node) {
        var columnIndex = node.itemData.id;
        var isVisible = node.selected !== false;
        that._columnsController.columnOption(columnIndex, 'visible', isVisible);
      });
    };
    var updateColumnVisibilityTimeout;
    var isUpdatingSelection = false;
    var selectionChangedHandler = function selectionChangedHandler(e) {
      if (isUpdatingSelection) {
        return;
      }
      var nodes = getFlatNodes(e.component.getNodes());
      isUpdatingSelection = true;
      e.component.beginUpdate();
      updateSelection(e, nodes);
      isUpdatingSelection = false;
      e.component.endUpdate();
      clearTimeout(updateColumnVisibilityTimeout);
      updateColumnVisibilityTimeout = setTimeout(function () {
        that.component.beginUpdate();
        updateColumnVisibility(nodes);
        that.component.endUpdate();
      }, CLICK_TIMEOUT);
    };
    return {
      selectByClick: selectionOptions.selectByClick,
      selectNodesRecursive: selectionOptions.recursive,
      showCheckBoxesMode: selectionOptions.allowSelectAll ? 'selectAll' : 'normal',
      onSelectionChanged: selectionChangedHandler
    };
  },
  _columnOptionChanged: function _columnOptionChanged(e) {
    var changeTypes = e.changeTypes;
    var optionNames = e.optionNames;
    var isSelectMode = this.isSelectMode();
    this.callBase(e);
    if (isSelectMode) {
      var needPartialRender = optionNames.visible && optionNames.length === 1 && e.columnIndex !== undefined;
      var needFullRender = optionNames.showInColumnChooser || optionNames.caption || optionNames.visible || changeTypes.columns && optionNames.all;
      if (needPartialRender) {
        this.render(null, {
          changeType: 'selection',
          columnIndex: e.columnIndex
        });
      } else if (needFullRender) {
        this.render(null, 'full');
      }
    }
  },
  optionChanged: function optionChanged(args) {
    switch (args.name) {
      case 'columnChooser':
        this._initializePopupContainer();
        this.render(null, 'full');
        break;
      default:
        this.callBase(args);
    }
  },
  getColumnElements: function getColumnElements() {
    var result = [];
    var $node;
    var isSelectMode = this.isSelectMode();
    var chooserColumns = this._columnsController.getChooserColumns(isSelectMode);
    var $content = this._popupContainer && this._popupContainer.$content();
    var $nodes = $content && $content.find('.dx-treeview-node');
    if ($nodes) {
      chooserColumns.forEach(function (column) {
        $node = $nodes.filter('[data-item-id = \'' + column.index + '\']');
        var item = $node.length ? $node.children('.' + COLUMN_CHOOSER_ITEM_CLASS).get(0) : null;
        result.push(item);
      });
    }

    // @ts-expect-error
    return (0, _renderer.default)(result);
  },
  getName: function getName() {
    return 'columnChooser';
  },
  getColumns: function getColumns() {
    return this._columnsController.getChooserColumns();
  },
  allowDragging: function allowDragging(column) {
    var isParentColumnVisible = this._columnsController.isParentColumnVisible(column.index);
    var isColumnHidden = !column.visible && column.allowHiding;
    return this.isColumnChooserVisible() && isParentColumnVisible && isColumnHidden;
  },
  allowColumnHeaderDragging: function allowColumnHeaderDragging(column) {
    var isDragMode = !this.isSelectMode();
    return isDragMode && this.isColumnChooserVisible() && column.allowHiding;
  },
  getBoundingRect: function getBoundingRect() {
    var that = this;
    var container = that._popupContainer && that._popupContainer.$overlayContent();
    if (container && container.is(':visible')) {
      var offset = container.offset();
      return {
        left: offset.left,
        top: offset.top,
        right: offset.left + (0, _size.getOuterWidth)(container),
        bottom: offset.top + (0, _size.getOuterHeight)(container)
      };
    }
    return null;
  },
  showColumnChooser: function showColumnChooser() {
    if (!this._popupContainer) {
      this._initializePopupContainer();
      this.render();
    }
    this._popupContainer.show();
    if (this._isWinDevice()) {
      (0, _renderer.default)('body').addClass(this.addWidgetPrefix(NOTOUCH_ACTION_CLASS));
    }
  },
  hideColumnChooser: function hideColumnChooser() {
    if (this._popupContainer) {
      this._popupContainer.hide();
    }
  },
  isColumnChooserVisible: function isColumnChooserVisible() {
    var popupContainer = this._popupContainer;
    return popupContainer && popupContainer.option('visible');
  },
  isSelectMode: function isSelectMode() {
    return this.option('columnChooser.mode') === 'select';
  },
  hasHiddenColumns: function hasHiddenColumns() {
    var isEnabled = this.option('columnChooser.enabled');
    var hiddenColumns = this.getColumns().filter(function (column) {
      return !column.visible;
    });
    return isEnabled && hiddenColumns.length;
  },
  publicMethods: function publicMethods() {
    return ['showColumnChooser', 'hideColumnChooser'];
  }
};
var ColumnChooserView = _uiGrid_core2.ColumnsView.inherit(columnChooserMembers);

/**
 * @type {import('./ui.grid_core.modules').Module}
 */
var columnChooserModule = {
  defaultOptions: function defaultOptions() {
    return {
      columnChooser: {
        enabled: false,
        search: {
          enabled: false,
          timeout: 500,
          editorOptions: {}
        },
        selection: {
          allowSelectAll: false,
          selectByClick: false,
          recursive: false
        },
        position: undefined,
        mode: 'dragAndDrop',
        width: 250,
        height: 260,
        title: _message.default.format('dxDataGrid-columnChooserTitle'),
        emptyPanelText: _message.default.format('dxDataGrid-columnChooserEmptyText'),
        // TODO private option
        container: undefined
      }
    };
  },
  controllers: {
    columnChooser: ColumnChooserController
  },
  views: {
    columnChooserView: ColumnChooserView
  },
  extenders: {
    views: {
      headerPanel: {
        _getToolbarItems: function _getToolbarItems() {
          var items = this.callBase();
          return this._appendColumnChooserItem(items);
        },
        _appendColumnChooserItem: function _appendColumnChooserItem(items) {
          var that = this;
          var columnChooserEnabled = that.option('columnChooser.enabled');
          if (columnChooserEnabled) {
            var onClickHandler = function onClickHandler() {
              that.component.getView('columnChooserView').showColumnChooser();
            };
            var onInitialized = function onInitialized(e) {
              (0, _renderer.default)(e.element).addClass(that._getToolbarButtonClass(that.addWidgetPrefix(COLUMN_CHOOSER_BUTTON_CLASS)));
            };
            var hintText = that.option('columnChooser.title');
            /**
             * @type {any}
             */
            var toolbarItem = {
              widget: 'dxButton',
              options: {
                icon: COLUMN_CHOOSER_ICON_NAME,
                onClick: onClickHandler,
                hint: hintText,
                text: hintText,
                onInitialized: onInitialized,
                elementAttr: {
                  'aria-haspopup': 'dialog'
                }
              },
              showText: 'inMenu',
              location: 'after',
              name: 'columnChooserButton',
              locateInMenu: 'auto',
              sortIndex: 40
            };
            items.push(toolbarItem);
          }
          return items;
        },
        optionChanged: function optionChanged(args) {
          switch (args.name) {
            case 'columnChooser':
              this._invalidate();
              args.handled = true;
              break;
            default:
              this.callBase(args);
          }
        },
        isVisible: function isVisible() {
          var that = this;
          var columnChooserEnabled = that.option('columnChooser.enabled');
          return that.callBase() || columnChooserEnabled;
        }
      },
      columnHeadersView: {
        allowDragging: function allowDragging(column) {
          var columnChooserView = this.component.getView('columnChooserView');
          var isDragMode = !columnChooserView.isSelectMode();
          var isColumnChooserVisible = columnChooserView.isColumnChooserVisible();
          return isDragMode && isColumnChooserVisible && column.allowHiding || this.callBase(column);
        }
      }
    },
    controllers: {
      columns: {
        allowMoveColumn: function allowMoveColumn(fromVisibleIndex, toVisibleIndex, sourceLocation, targetLocation) {
          var isSelectMode = this.option('columnChooser.mode') === 'select';
          var isMoveColumnDisallowed = isSelectMode && targetLocation === 'columnChooser';
          return isMoveColumnDisallowed ? false : this.callBase(fromVisibleIndex, toVisibleIndex, sourceLocation, targetLocation);
        }
      }
    }
  }
};
exports.columnChooserModule = columnChooserModule;