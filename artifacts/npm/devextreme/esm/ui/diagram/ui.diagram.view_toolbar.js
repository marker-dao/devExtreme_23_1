/**
* DevExtreme (esm/ui/diagram/ui.diagram.view_toolbar.js)
* Version: 23.2.0
* Build date: Wed Oct 18 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DiagramToolbar from './ui.diagram.toolbar';
import DiagramCommandsManager from './diagram.commands_manager';
class DiagramViewToolbar extends DiagramToolbar {
  _getCommands() {
    return DiagramCommandsManager.getViewToolbarCommands(this.option('commands'), this.option('excludeCommands'));
  }
}
export default DiagramViewToolbar;
