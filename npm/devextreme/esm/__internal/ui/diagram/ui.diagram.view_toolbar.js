/**
* DevExtreme (esm/__internal/ui/diagram/ui.diagram.view_toolbar.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DiagramCommandsManager from '../../ui/diagram/diagram.commands_manager';
import DiagramToolbar from '../../ui/diagram/ui.diagram.toolbar';
class DiagramViewToolbar extends DiagramToolbar {
  _getCommands() {
    // @ts-expect-error ts-error
    const {
      commands,
      excludeCommands
    } = this.option();
    return DiagramCommandsManager.getViewToolbarCommands(commands, excludeCommands);
  }
}
export default DiagramViewToolbar;
