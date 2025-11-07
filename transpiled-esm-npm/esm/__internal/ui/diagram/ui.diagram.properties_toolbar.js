import DiagramCommandsManager from '../../ui/diagram/diagram.commands_manager';
import DiagramToolbar from '../../ui/diagram/ui.diagram.toolbar';
class DiagramPropertiesToolbar extends DiagramToolbar {
  _getCommands() {
    // @ts-expect-error ts-error
    return DiagramCommandsManager.getPropertiesToolbarCommands();
  }
}
export default DiagramPropertiesToolbar;