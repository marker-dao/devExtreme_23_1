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