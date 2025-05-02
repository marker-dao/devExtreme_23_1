import { defaultOptions } from '../options';
import { OptionsControllerMock as OptionsControllerBaseMock } from './options_controller_base.mock';
export class OptionsControllerMock extends OptionsControllerBaseMock {
  constructor(options) {
    super(options, defaultOptions);
  }
}