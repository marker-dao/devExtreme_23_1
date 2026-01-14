/**
* DevExtreme (esm/__internal/ui/diagram/ui.diagram.main_toolbar.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
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
