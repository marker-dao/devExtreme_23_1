import _extends from "@babel/runtime/helpers/esm/extends";
import messageLocalization from '../../../common/core/localization/message';
import $ from '../../../core/renderer';
import { Deferred } from '../../../core/utils/deferred';
import { stubComponent } from '../../core/utils/m_stubs';
export const getOperationBySearchMode = searchMode => searchMode === 'equals' ? '=' : searchMode;
class SearchBoxController {
  static setEditorClass(value) {
    SearchBoxController.EditorClass = value;
  }
  render(widgetPrefix, $container, options, createEditorCallback) {
    const rootElementClassName = `${widgetPrefix}-with-search`;
    const searchBoxClassName = `${widgetPrefix}-search`;
    const {
      searchEnabled,
      onValueChanged
    } = options;
    this._onSearchBoxValueChanged = onValueChanged;
    if (!searchEnabled) {
      $container.removeClass(rootElementClassName);
      this.remove();
      return;
    }
    if (this._editor) {
      this.updateEditorOptions(options);
    } else {
      const editorOptions = this._getEditorOptions(options);
      $container.addClass(rootElementClassName);
      const $editor = $('<div>').addClass(searchBoxClassName).prependTo($container);
      this._editor = createEditorCallback($editor, SearchBoxController.EditorClass, editorOptions);
    }
  }
  updateEditorOptions(options) {
    var _this$_editor;
    const editorOptions = this._getEditorOptions(options);
    (_this$_editor = this._editor) === null || _this$_editor === void 0 || _this$_editor.option(editorOptions);
  }
  _getEditorOptions(options) {
    const {
      tabIndex,
      searchValue,
      searchEditorOptions,
      searchTimeout
    } = options;
    const placeholder = messageLocalization.format('Search');
    return _extends({
      mode: 'search',
      placeholder,
      tabIndex,
      value: searchValue,
      valueChangeEvent: 'input',
      inputAttr: {
        'aria-label': placeholder
      },
      // @ts-expect-error ts-error
      onValueChanged: e => {
        this._onValueChanged(e, searchTimeout);
      }
    }, searchEditorOptions);
  }
  _onValueChanged(e) {
    var _e$event;
    let searchTimeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    this._valueChangeDeferred = Deferred();
    clearTimeout(this._valueChangeTimeout);
    this._valueChangeDeferred.done(() => {
      var _this$_onSearchBoxVal;
      (_this$_onSearchBoxVal = this._onSearchBoxValueChanged) === null || _this$_onSearchBoxVal === void 0 || _this$_onSearchBoxVal.call(this, e.value);
    });
    if (((_e$event = e.event) === null || _e$event === void 0 ? void 0 : _e$event.type) === 'input' && searchTimeout) {
      // eslint-disable-next-line no-restricted-globals
      this._valueChangeTimeout = setTimeout(() => {
        var _this$_valueChangeDef;
        (_this$_valueChangeDef = this._valueChangeDeferred) === null || _this$_valueChangeDef === void 0 || _this$_valueChangeDef.resolve();
      }, searchTimeout);
    } else {
      var _this$_valueChangeDef2;
      (_this$_valueChangeDef2 = this._valueChangeDeferred) === null || _this$_valueChangeDef2 === void 0 || _this$_valueChangeDef2.resolve();
    }
  }
  resolveValueChange() {
    var _this$_valueChangeDef3;
    (_this$_valueChangeDef3 = this._valueChangeDeferred) === null || _this$_valueChangeDef3 === void 0 || _this$_valueChangeDef3.resolve();
  }
  remove() {
    var _this$_editor2;
    (_this$_editor2 = this._editor) === null || _this$_editor2 === void 0 || _this$_editor2.$element().remove();
    this._editor = null;
  }
  focus() {
    var _this$_editor3;
    (_this$_editor3 = this._editor) === null || _this$_editor3 === void 0 || _this$_editor3.focus();
  }
  dispose() {
    this.remove();
  }
}
SearchBoxController.EditorClass = stubComponent('TextBox');
export default SearchBoxController;