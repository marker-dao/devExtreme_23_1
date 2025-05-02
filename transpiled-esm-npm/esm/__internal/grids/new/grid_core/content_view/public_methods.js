import { DataController } from '../../../../grids/new/grid_core/data_controller/index';
import { ContentView } from './view';
export function PublicMethods(GridCore) {
  return class GridCoreWithContentView extends GridCore {
    getScrollable() {
      return this.diContext.get(ContentView).scrollableRef.current;
    }
    beginCustomLoading(text) {
      const contentView = this.diContext.get(ContentView);
      const dataController = this.diContext.get(DataController);
      if (text) {
        contentView.loadingText.value = text;
      }
      dataController.isLoading.value = true;
    }
    endCustomLoading() {
      const dataController = this.diContext.get(DataController);
      dataController.isLoading.value = false;
    }
  };
}