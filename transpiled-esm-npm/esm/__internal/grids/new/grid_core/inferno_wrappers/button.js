import dxButton from '../../../../../ui/button';
import { InfernoWrapper } from './widget_wrapper';
export class Button extends InfernoWrapper {
  getComponentFabric() {
    return dxButton;
  }
}