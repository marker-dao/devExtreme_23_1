import dxToast from '../../../../../ui/toast';
import { InfernoWrapper } from './widget_wrapper';
export class Toast extends InfernoWrapper {
  getComponentFabric() {
    return dxToast;
  }
}