"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _diagram = require("../../ui/diagram/diagram.importer");
// eslint-disable-next-line @stylistic/max-len
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-unused-vars */

class DiagramBar {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(owner) {
    const {
      EventDispatcher
    } = (0, _diagram.getDiagram)();
    this.onChanged = new EventDispatcher(); // IBar.onChanged: EventDispatcher<IBarListener>
    this._owner = owner;
  }
  raiseBarCommandExecuted(key, parameter) {
    this.onChanged.raise('notifyBarCommandExecuted', parseInt(key, 10), parameter);
  }
  getCommandKeys() {
    // IBar.getCommandKeys(): DiagramCommand[]
    throw 'Not Implemented';
  }
  setItemValue(key, value) {
    // IBar.setItemValue(key: DiagramCommand, value: any)
  }
  setItemEnabled(key, enabled) {
    // IBar.setItemEnabled(key: DiagramCommand, enabled: boolean)
  }
  setItemVisible(key, enabled) {
    // IBar.setItemVisible(key: DiagramCommand, visible: boolean)
  }
  setEnabled(enabled) {
    // IBar.setEnabled(enabled: boolean)
  }
  setItemSubItems(key, items) {
    // IBar.setItemSubItems(key: DiagramCommand, items: any[])
  }
  isVisible() {
    // IBar.isVisible(): boolean
    return true;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getKeys(items) {
    const keys = items.reduce((commands, item) => {
      if (item.command !== undefined) {
        commands.push(item.command);
      }
      if (item.items) {
        // eslint-disable-next-line no-param-reassign
        commands = commands.concat(this._getKeys(item.items));
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return commands;
    }, []);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return keys;
  }
}
var _default = exports.default = DiagramBar;