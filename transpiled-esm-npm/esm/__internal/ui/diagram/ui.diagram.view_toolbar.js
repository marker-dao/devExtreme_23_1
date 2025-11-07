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