import dxForm from '../../../../../ui/form';
import { InfernoWrapper } from './widget_wrapper';
export class Form extends InfernoWrapper {
  getComponentFabric() {
    return dxForm;
  }
}