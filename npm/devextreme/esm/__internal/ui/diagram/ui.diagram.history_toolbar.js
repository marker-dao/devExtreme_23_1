/**
* DevExtreme (esm/__internal/ui/diagram/ui.diagram.history_toolbar.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DiagramCommandsManager from '../../ui/diagram/diagram.commands_manager';
import DiagramToolbar from '../../ui/diagram/ui.diagram.toolbar';
class DiagramHistoryToolbar extends DiagramToolbar {
  _getCommands() {
    return DiagramCommandsManager.getHistoryToolbarCommands(this.option('commands'), this._getExcludeCommands());
  }
  _getExcludeCommands() {
    // @ts-expect-error ts-error
    const {
      excludeCommands
    } = this.option();
    const commands = [].concat(excludeCommands);
    if (!this.option('isMobileView')) {
      // @ts-expect-error ts-error
      commands.push(DiagramCommandsManager.SHOW_TOOLBOX_COMMAND_NAME);
    }
    return commands;
  }
}
export default DiagramHistoryToolbar;
