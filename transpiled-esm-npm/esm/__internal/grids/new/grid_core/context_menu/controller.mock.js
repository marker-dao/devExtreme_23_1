import { BaseContextMenuController } from './controller';
export class ContextMenuControllerMock extends BaseContextMenuController {
  getItems() {
    return undefined;
  }
}
ContextMenuControllerMock.dependencies = [];