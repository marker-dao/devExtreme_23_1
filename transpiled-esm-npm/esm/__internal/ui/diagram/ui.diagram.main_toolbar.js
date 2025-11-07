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