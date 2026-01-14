/**
* DevExtreme (esm/__internal/ui/diagram/ui.diagram.history_toolbar.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
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
