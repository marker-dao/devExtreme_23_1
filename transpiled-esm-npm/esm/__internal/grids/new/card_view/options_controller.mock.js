import { OptionsControllerMock as OptionsControllerBaseMock } from '../../../grids/new/grid_core/options_controller/options_controller_base.mock';
import { defaultOptions } from './options';
export class OptionsControllerMock extends OptionsControllerBaseMock {
  constructor(options) {
    super(options, defaultOptions);
  }
}