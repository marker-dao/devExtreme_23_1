import dxPagination from '../../../../../ui/pagination';
import { InfernoWrapper } from './widget_wrapper';
export class Pager extends InfernoWrapper {
  getComponentFabric() {
    return dxPagination;
  }
}