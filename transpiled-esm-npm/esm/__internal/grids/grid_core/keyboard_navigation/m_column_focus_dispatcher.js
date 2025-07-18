import { isDefined } from '../../../../core/utils/type';
import { Controller } from '../m_modules';
export class ColumnFocusDispatcher extends Controller {
  constructor() {
    super(...arguments);
    this.keyboardNavigationControllers = [];
  }
  registerKeyboardNavigationController(keyboardNavigationController) {
    this.keyboardNavigationControllers.push(keyboardNavigationController);
  }
  updateFocusPosition(keyboardNavigationController, cellPosition) {
    if (isDefined(cellPosition)) {
      keyboardNavigationController.updateFocusPosition(cellPosition);
    } else {
      this.keyboardNavigationControllers.forEach(keyboardController => {
        if (keyboardController === keyboardNavigationController) {
          return;
        }
        keyboardController.updateFocusPosition();
      });
    }
  }
  restoreFocus(keyboardNavigationController) {
    if (keyboardNavigationController.getFirstFocusableVisibleIndex() >= 0) {
      keyboardNavigationController.restoreFocus();
    } else {
      this.keyboardNavigationControllers.forEach(keyboardController => {
        if (keyboardController === keyboardNavigationController) {
          return;
        }
        const firstFocusableVisibleIndex = keyboardController.getFirstFocusableVisibleIndex();
        if (firstFocusableVisibleIndex >= 0) {
          keyboardController.restoreFocus();
        }
      });
    }
  }
}