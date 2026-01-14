/**
* DevExtreme (esm/__internal/integration/knockout/variable_wrapper_utils.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { variableWrapper } from '../../core/utils/m_variable_wrapper';
// eslint-disable-next-line import/no-extraneous-dependencies
import ko from 'knockout';
if (ko) {
  variableWrapper.inject({
    isWrapped: ko.isObservable,
    isWritableWrapped: ko.isWritableObservable,
    wrap: ko.observable,
    unwrap(value) {
      if (ko.isObservable(value)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return ko.utils.unwrapObservable(value);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.callBase(value);
    },
    assign(variable, value) {
      if (ko.isObservable(variable)) {
        variable(value);
      } else {
        this.callBase(variable, value);
      }
    }
  });
}
