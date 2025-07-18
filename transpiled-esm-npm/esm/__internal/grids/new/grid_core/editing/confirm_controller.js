import { confirm } from '../../../../../ui/dialog';
export class ConfirmController {
  confirm(message, title, showTitle) {
    return confirm(message, title,
    // @ts-expect-error wrong typing
    showTitle);
  }
}
ConfirmController.dependencies = [];