/**
* DevExtreme (esm/__internal/ui/diagram/ui.diagram.properties_toolbar.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DiagramCommandsManager from '../../ui/diagram/diagram.commands_manager';
import DiagramToolbar from '../../ui/diagram/ui.diagram.toolbar';
class DiagramPropertiesToolbar extends DiagramToolbar {
  _getCommands() {
    // @ts-expect-error ts-error
    return DiagramCommandsManager.getPropertiesToolbarCommands();
  }
}
export default DiagramPropertiesToolbar;
