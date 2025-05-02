import { ContextMenuController } from '.';
export class ContextMenuControllerMock extends ContextMenuController {
  getItems(view, targetElement) {
    let contextInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return super.getItems(view, targetElement, contextInfo);
  }
}