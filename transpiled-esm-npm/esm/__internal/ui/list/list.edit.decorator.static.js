import $ from '../../../core/renderer';
import Button from '../../ui/button/wrapper';
import EditDecorator from '../../ui/list/list.edit.decorator';
import { register as registerDecorator } from '../../ui/list/list.edit.decorator_registry';
const STATIC_DELETE_BUTTON_CONTAINER_CLASS = 'dx-list-static-delete-button-container';
const STATIC_DELETE_BUTTON_CLASS = 'dx-list-static-delete-button';
class EditDecoratorStatic extends EditDecorator {
  afterBag(config) {
    const {
      $itemElement,
      $container
    } = config;
    const $button = $('<div>').addClass(STATIC_DELETE_BUTTON_CLASS);
    this._list._createComponent($button, Button, {
      icon: 'remove',
      onClick: args => {
        const {
          event
        } = args;
        event === null || event === void 0 || event.stopPropagation();
        this._deleteItem($itemElement);
      },
      // @ts-expect-error
      integrationOptions: {},
      elementAttr: {
        role: null,
        'aria-label': null
      },
      tabIndex: -1
    });
    $container.addClass(STATIC_DELETE_BUTTON_CONTAINER_CLASS).append($button);
  }
  _deleteItem($itemElement) {
    if ($itemElement.is('.dx-state-disabled, .dx-state-disabled *')) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._list.deleteItem($itemElement.get(0));
  }
}
registerDecorator('delete', 'static', EditDecoratorStatic);