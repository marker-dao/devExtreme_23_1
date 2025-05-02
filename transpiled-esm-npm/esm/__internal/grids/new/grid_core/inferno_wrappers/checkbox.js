import dxCheckBox from '../../../../../ui/check_box';
import { InfernoWrapper } from './widget_wrapper';
export class CheckBox extends InfernoWrapper {
  getComponentFabric() {
    return dxCheckBox;
  }
}