/**
* DevExtreme (esm/__internal/ui/gantt/ui.gantt.bars.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line max-classes-per-file
import messageLocalization from '../../../common/core/localization/message';
import $ from '../../../core/renderer';
import { extend } from '../../../core/utils/extend';
import ContextMenu from '../../ui/context_menu/context_menu';
import ToolbarMenu from '../../ui/toolbar/toolbar';
const TOOLBAR_SEPARATOR_CLASS = 'dx-gantt-toolbar-separator';
const COMMANDS = {
  createTask: 0,
  createSubTask: 1,
  removeTask: 2,
  removeDependency: 3,
  taskInformation: 4,
  taskAddContextItem: 5,
  undo: 6,
  redo: 7,
  zoomIn: 8,
  zoomOut: 9,
  fullScreen: 10,
  collapseAll: 11,
  expandAll: 12,
  resourceManager: 13,
  toggleResources: 14,
  toggleDependencies: 15
};
class Bar {
  constructor(element, owner) {
    this._element = element;
    this._owner = owner;
    this._items = [];
    this._createControl();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _createControl() {}
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _createSeparator() {}
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _createDefaultItem(_commandId, _text, _icon) {}
  createItems(items) {
    var _this$_menu;
    this._cache = null;
    this._items = this._createItemsCore(items);
    (_this$_menu = this._menu) === null || _this$_menu === void 0 || _this$_menu.option('items', this._items);
  }
  _createItemsCore(items) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return items.map(item => {
      // eslint-disable-next-line @typescript-eslint/init-declarations
      let result;
      if (typeof item === 'string') {
        result = this._createItemByText(item);
      } else {
        result = item.name ? extend(this._createItemByText(item.name), item) : extend(this._getDefaultItemOptions(), item);
      }
      if (item.items) {
        result.items = this._createItemsCore(item.items);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return result;
    });
  }
  _createItemByText(text) {
    switch (text.toLowerCase()) {
      case 'separator':
        // @ts-expect-error ts-error
        return this._createSeparator();
      case 'undo':
        return this._createDefaultItem(COMMANDS.undo, messageLocalization.format('dxGantt-undo'), this._getIcon('undo'));
      case 'redo':
        return this._createDefaultItem(COMMANDS.redo, messageLocalization.format('dxGantt-redo'), this._getIcon('redo'));
      case 'expandall':
        return this._createDefaultItem(COMMANDS.expandAll, messageLocalization.format('dxGantt-expandAll'), this._getIcon('expand'));
      case 'collapseall':
        return this._createDefaultItem(COMMANDS.collapseAll, messageLocalization.format('dxGantt-collapseAll'), this._getIcon('collapse'));
      case 'addtask':
        return this._createDefaultItem(COMMANDS.createTask, messageLocalization.format('dxGantt-addNewTask'), this._getIcon('add'));
      case 'addsubtask':
        return this._createDefaultItem(COMMANDS.createSubTask, messageLocalization.format('dxGantt-contextMenuNewSubtask'), this._getIcon('add-sub-task'));
      case 'deletetask':
        return this._createDefaultItem(COMMANDS.removeTask, messageLocalization.format('dxGantt-deleteSelectedTask'), this._getIcon('delete'));
      case 'deletedependency':
        return this._createDefaultItem(COMMANDS.removeDependency, messageLocalization.format('dxGantt-contextMenuDeleteDependency'), this._getIcon('delete-dependency'));
      case 'zoomin':
        return this._createDefaultItem(COMMANDS.zoomIn, messageLocalization.format('dxGantt-zoomIn'), this._getIcon('zoom-in'));
      case 'zoomout':
        return this._createDefaultItem(COMMANDS.zoomOut, messageLocalization.format('dxGantt-zoomOut'), this._getIcon('zoom-out'));
      case 'fullscreen':
        return this._createDefaultItem(COMMANDS.fullScreen, messageLocalization.format('dxGantt-fullScreen'), this._getIcon('full-screen'));
      case 'taskdetails':
        return this._createDefaultItem(COMMANDS.taskInformation, `${messageLocalization.format('dxGantt-dialogTaskDetailsTitle')}...`, this._getIcon('task-details'));
      case 'resourcemanager':
        return this._createDefaultItem(COMMANDS.resourceManager, messageLocalization.format('dxGantt-dialogResourceManagerTitle'), this._getIcon('resource-manager'));
      case 'showresources':
        return this._createDefaultItem(COMMANDS.toggleResources, messageLocalization.format('dxGantt-showResources'), this._getIcon('toggle-resources'));
      case 'showdependencies':
        return this._createDefaultItem(COMMANDS.toggleDependencies, messageLocalization.format('dxGantt-showDependencies'), this._getIcon('toggle-dependencies'));
      default:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return extend(this._getDefaultItemOptions(), {
          options: {
            text
          }
        });
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getDefaultItemOptions() {
    return {};
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getItemsCache() {
    if (!this._cache) {
      this._cache = {};
      this._fillCache(this._items);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._cache;
  }
  _fillCache(items) {
    items.forEach(item => {
      const key = item.commandId;
      if (key !== undefined) {
        if (!this._cache[key]) {
          this._cache[key] = [];
        }
        this._cache[key].push(item);
      }
      if (item.items) {
        this._fillCache(item.items);
      }
    });
  }
  _getIcon(name) {
    return `dx-gantt-i dx-gantt-i-${name}`;
  }
  // IBar
  getCommandKeys() {
    const itemsCache = this._getItemsCache();
    const result = [];
    // eslint-disable-next-line no-restricted-syntax,guard-for-in
    for (const itemKey in itemsCache) {
      result.push(parseInt(itemKey, 10));
    }
    return result;
  }
  setItemEnabled(key, enabled) {
    const itemsCache = this._getItemsCache();
    itemsCache[key].forEach(item => {
      item.disabled = !enabled;
    });
  }
  setItemVisible(key, visible) {
    const itemsCache = this._getItemsCache();
    itemsCache[key].forEach(item => {
      item.visible = visible;
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setItemValue(_key, _value) {}
  setEnabled(enabled) {
    var _this$_menu2;
    (_this$_menu2 = this._menu) === null || _this$_menu2 === void 0 || _this$_menu2.option('disabled', !enabled);
  }
  updateItemsList() {}
  isVisible() {
    return true;
  }
  isContextMenu() {
    return false;
  }
  completeUpdate() {}
}
export class GanttToolbar extends Bar {
  _createControl() {
    this._menu = this._owner._createComponent(this._element, ToolbarMenu, {
      onItemClick: e => {
        const {
          commandId
        } = e.itemData;
        if (commandId !== undefined) {
          this._owner._executeCoreCommand(commandId);
        }
      }
    });
  }
  _createDefaultItem(commandId, hint, icon) {
    return {
      commandId,
      disabled: true,
      widget: 'dxButton',
      location: 'before',
      options: {
        icon,
        stylingMode: 'text',
        hint
      }
    };
  }
  _createSeparator() {
    return {
      location: 'before',
      template: (_data, _index, element) => {
        $(element).addClass(TOOLBAR_SEPARATOR_CLASS);
      }
    };
  }
  _getDefaultItemOptions() {
    return {
      location: 'before',
      widget: 'dxButton'
    };
  }
  // IBar
  completeUpdate() {
    var _this$_menu3;
    (_this$_menu3 = this._menu) === null || _this$_menu3 === void 0 || _this$_menu3.option('items', this._items);
  }
}
export class GanttContextMenuBar extends Bar {
  _createControl() {
    this._menu = this._owner._createComponent(this._element, ContextMenu, {
      showEvent: undefined,
      onItemClick: e => {
        if (e.itemData.commandId !== undefined) {
          this._owner._executeCoreCommand(e.itemData.commandId);
        } else if (e.itemData.name !== undefined) {
          this._owner._actionsManager.raiseCustomCommand(e.itemData.name);
        }
      }
    });
  }
  createItems(items) {
    if (!items || items.length === 0) {
      // eslint-disable-next-line no-param-reassign
      items = this._getDefaultItems();
    }
    super.createItems(items);
  }
  _getDefaultItems() {
    return [{
      text: messageLocalization.format('dxGantt-dialogButtonAdd'),
      commandId: COMMANDS.taskAddContextItem,
      icon: this._getIcon('add'),
      items: [{
        text: messageLocalization.format('dxGantt-contextMenuNewTask'),
        commandId: COMMANDS.createTask,
        icon: this._getIcon('add-task')
      }, {
        text: messageLocalization.format('dxGantt-contextMenuNewSubtask'),
        commandId: COMMANDS.createSubTask,
        icon: this._getIcon('add-sub-task')
      }]
    }, {
      text: `${messageLocalization.format('dxGantt-dialogTaskDetailsTitle')}...`,
      commandId: COMMANDS.taskInformation,
      icon: this._getIcon('task-details')
    }, {
      text: messageLocalization.format('dxGantt-contextMenuDeleteTask'),
      commandId: COMMANDS.removeTask,
      icon: this._getIcon('delete')
    }, {
      text: messageLocalization.format('dxGantt-contextMenuDeleteDependency'),
      commandId: COMMANDS.removeDependency,
      icon: this._getIcon('delete-dependency')
    }];
  }
  _createDefaultItem(commandId, text, icon) {
    return {
      commandId,
      text,
      icon
    };
  }
  show(point, items) {
    var _this$_menu4, _this$_menu5, _this$_menu6;
    (_this$_menu4 = this._menu) === null || _this$_menu4 === void 0 || _this$_menu4.option('items', items || this._items);
    (_this$_menu5 = this._menu) === null || _this$_menu5 === void 0 || _this$_menu5.option('position.offset', {
      x: point.x,
      y: point.y
    });
    (_this$_menu6 = this._menu) === null || _this$_menu6 === void 0 || _this$_menu6.option('position.collision', 'fit');
    // @ts-expect-error ts-error
    this._menu.show();
  }
  hide() {
    // @ts-expect-error ts-error
    this._menu.hide();
  }
  // IBar
  isContextMenu() {
    return true;
  }
}
