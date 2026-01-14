import Guid from '../../../core/guid';
import { Deferred, when } from '../../../core/utils/deferred';
import CollectionWidgetEdit from '../../ui/collection/collection_widget.edit';
class CollectionWidgetAsync extends CollectionWidgetEdit {
  _initMarkup() {
    this._asyncTemplateItemsMap = {};
    super._initMarkup();
  }
  _render() {
    super._render();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._planPostRenderActions();
  }
  _renderItemContent(args) {
    const renderContentDeferred = Deferred();
    const itemDeferred = Deferred();
    const uniqueKey = `dx${new Guid()}`;
    this._asyncTemplateItemsMap[uniqueKey] = itemDeferred;
    const $itemContent = super._renderItemContent(Object.assign({}, args, {
      uniqueKey
    }));
    itemDeferred.done(() => {
      renderContentDeferred.resolve($itemContent);
    });
    // @ts-expect-error ts-error
    return renderContentDeferred.promise();
  }
  _onItemTemplateRendered(itemTemplate, renderArgs) {
    return () => {
      const {
        uniqueKey
      } = renderArgs;
      if (uniqueKey) {
        var _this$_asyncTemplateI;
        (_this$_asyncTemplateI = this._asyncTemplateItemsMap[uniqueKey]) === null || _this$_asyncTemplateI === void 0 || _this$_asyncTemplateI.resolve();
      }
    };
  }
  _postProcessRenderItems() {}
  _planPostRenderActions() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    const d = Deferred();
    const asyncTemplateItems = Object.values(this._asyncTemplateItemsMap);
    when.apply(this, asyncTemplateItems).done(() => {
      // @ts-expect-error ts-error
      this._postProcessRenderItems(...args);
      d.resolve().done(() => {
        this._asyncTemplateItemsMap = {};
      });
    });
    return d.promise();
  }
  _clean() {
    super._clean();
    const asyncTemplateItems = Object.values(this._asyncTemplateItemsMap);
    asyncTemplateItems.forEach(item => {
      item.reject();
    });
    this._asyncTemplateItemsMap = {};
  }
}
export default CollectionWidgetAsync;