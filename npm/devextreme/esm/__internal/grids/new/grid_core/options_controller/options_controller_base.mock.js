/**
* DevExtreme (esm/__internal/grids/new/grid_core/options_controller/options_controller_base.mock.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createComponentMock } from './component.mock';
import { OptionsController } from './options_controller_base';
export class OptionsControllerMock extends OptionsController {
  constructor(options, defaultOptions) {
    const componentMock = createComponentMock(options, defaultOptions);
    super(componentMock);
    this.defaults = defaultOptions;
    this.componentMock = componentMock;
  }
  // TODO: add typing
  option(key, value) {
    // @ts-expect-error
    return this.componentMock.option(key, value);
  }
}
