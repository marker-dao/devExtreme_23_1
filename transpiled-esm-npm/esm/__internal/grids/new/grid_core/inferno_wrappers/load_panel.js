import dxLoadPanel from '../../../../../ui/load_panel';
import { InfernoWrapper } from './widget_wrapper';
export class LoadPanel extends InfernoWrapper {
  getComponentFabric() {
    return dxLoadPanel;
  }
}