/**
* DevExtreme (esm/__internal/ui/diagram/ui.diagram.main_toolbar.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DiagramCommandsManager from '../../ui/diagram/diagram.commands_manager';
import DiagramToolbar from '../../ui/diagram/ui.diagram.toolbar';
class DiagramMainToolbar extends DiagramToolbar {
  _getCommands() {
    // @ts-expect-error ts-error
    const {
      commands,
      excludeCommands
    } = this.option();
    return DiagramCommandsManager.getMainToolbarCommands(commands, excludeCommands);
  }
}
export default DiagramMainToolbar;
