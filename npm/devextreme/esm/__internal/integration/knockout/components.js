/**
* DevExtreme (esm/__internal/integration/knockout/components.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getImageContainer } from '../../core/utils/m_icon';
// eslint-disable-next-line import/no-extraneous-dependencies
import ko from 'knockout';
if (ko) {
  ko.bindingHandlers.dxControlsDescendantBindings = {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    init(_, valueAccessor) {
      return {
        controlsDescendantBindings: ko.unwrap(valueAccessor())
      };
    }
  };
  ko.bindingHandlers.dxIcon = {
    init(element, valueAccessor) {
      const options = ko.utils.unwrapObservable(valueAccessor()) || {};
      const iconElement = getImageContainer(options);
      ko.virtualElements.emptyNode(element);
      if (iconElement) {
        ko.virtualElements.prepend(element, iconElement.get(0));
      }
    },
    update(element, valueAccessor) {
      const options = ko.utils.unwrapObservable(valueAccessor()) || {};
      const iconElement = getImageContainer(options);
      ko.virtualElements.emptyNode(element);
      if (iconElement) {
        ko.virtualElements.prepend(element, iconElement.get(0));
      }
    }
  };
  ko.virtualElements.allowedBindings.dxIcon = true;
}
