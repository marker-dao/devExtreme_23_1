/**
* DevExtreme (cjs/__internal/ui/html_editor/html_editor.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("../../ui/html_editor/converters/m_delta");
var _events = require("../../../common/core/events");
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _emitterGesture = _interopRequireDefault(require("../../../common/core/events/gesture/emitter.gesture.scroll"));
var _pointer = _interopRequireDefault(require("../../../common/core/events/pointer"));
var _index = require("../../../common/core/events/utils/index");
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _config = _interopRequireDefault(require("../../../core/config"));
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _element = require("../../../core/element");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _empty_template = require("../../../core/templates/empty_template");
var _callbacks = _interopRequireDefault(require("../../../core/utils/callbacks"));
var _common = require("../../../core/utils/common");
var _deferred = require("../../../core/utils/deferred");
var _extend = require("../../../core/utils/extend");
var _type = require("../../../core/utils/type");
var _editor = _interopRequireDefault(require("../../ui/editor/editor"));
var _m_converterController = _interopRequireDefault(require("../../ui/html_editor/m_converterController"));
var _m_quill_importer = require("../../ui/html_editor/m_quill_importer");
var _m_quill_registrator = _interopRequireDefault(require("../../ui/html_editor/m_quill_registrator"));
var _m_wordLists = _interopRequireDefault(require("../../ui/html_editor/matchers/m_wordLists"));
var _formDialog = _interopRequireDefault(require("../../ui/html_editor/ui/formDialog"));
var _html_sanitizer = require("../../ui/html_editor/utils/html_sanitizer");
var _m_utils = require("../../ui/text_box/m_utils.scroll");
var _aiDialog = _interopRequireDefault(require("./ui/aiDialog"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // @ts-expect-error ts-error
const QUILL_CONTAINER_CLASS = 'dx-quill-container';
const QUILL_CLIPBOARD_CLASS = 'ql-clipboard';
const HTML_EDITOR_CLASS = 'dx-htmleditor';
const HTML_EDITOR_SUBMIT_ELEMENT_CLASS = 'dx-htmleditor-submit-element';
const HTML_EDITOR_CONTENT_CLASS = 'dx-htmleditor-content';
const ANONYMOUS_TEMPLATE_NAME = 'htmlContent';
const isIos = _devices.default.current().platform === 'ios';
let editorsCount = 0;
class HtmlEditor extends _editor.default {
  _getDefaultOptions() {
    const {
      editorStylingMode
    } = (0, _config.default)();
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const stylingMode = editorStylingMode || 'outlined';
    return _extends({}, super._getDefaultOptions(), {
      // @ts-expect-error undefined is not allowed
      aiIntegration: null,
      allowSoftLineBreak: false,
      // @ts-expect-error undefined is not allowed
      converter: null,
      // @ts-expect-error undefined is not allowed
      customizeModules: null,
      focusStateEnabled: true,
      // @ts-expect-error undefined is not allowed
      imageUpload: null,
      // @ts-expect-error undefined is not allowed
      mediaResizing: null,
      // @ts-expect-error undefined is not allowed
      mentions: null,
      placeholder: '',
      stylingMode,
      // @ts-expect-error undefined is not allowed
      tableContextMenu: null,
      // @ts-expect-error undefined is not allowed
      tableResizing: null,
      // @ts-expect-error undefined is not allowed
      toolbar: null,
      // @ts-expect-error undefined is not allowed
      variables: null
    });
  }
  _init() {
    this._mentionKeyInTemplateStorage = editorsCount;
    editorsCount += 1;
    super._init();
    this._cleanCallback = (0, _callbacks.default)();
    this._contentInitializedCallback = (0, _callbacks.default)();
    this._prepareHtmlConverter();
  }
  _prepareHtmlConverter() {
    const {
      converter
    } = this.option();
    if (converter) {
      this._htmlConverter = converter;
    }
  }
  _getAnonymousTemplateName() {
    return ANONYMOUS_TEMPLATE_NAME;
  }
  _initTemplates() {
    this._templateManager.addDefaultTemplates({
      [ANONYMOUS_TEMPLATE_NAME]: new _empty_template.EmptyTemplate()
    });
    super._initTemplates();
  }
  _focusTarget() {
    return this._getContent();
  }
  _getContent() {
    return this.$element().find(`.${HTML_EDITOR_CONTENT_CLASS}`);
  }
  _focusInHandler(e) {
    const {
      relatedTarget
    } = e;
    if (this._shouldSkipFocusEvent(relatedTarget)) {
      return;
    }
    this._toggleFocusClass(true, this.$element());
    super._focusInHandler(e);
  }
  _focusOutHandler(e) {
    const {
      relatedTarget
    } = e;
    if (this._shouldSkipFocusEvent(relatedTarget)) {
      return;
    }
    this._toggleFocusClass(false, this.$element());
    super._focusOutHandler(e);
  }
  _shouldSkipFocusEvent(relatedTarget) {
    return (0, _renderer.default)(relatedTarget).hasClass(QUILL_CLIPBOARD_CLASS);
  }
  _initMarkup() {
    this._$htmlContainer = (0, _renderer.default)('<div>').addClass(QUILL_CONTAINER_CLASS);
    this.$element().attr('role', 'application').addClass(HTML_EDITOR_CLASS).wrapInner(this._$htmlContainer);
    this._renderStylingMode();
    const template = this._getTemplate(ANONYMOUS_TEMPLATE_NAME);
    const transclude = true;
    this._$templateResult = template === null || template === void 0 ? void 0 : template.render({
      container: (0, _element.getPublicElement)(this._$htmlContainer),
      noModel: true,
      transclude
    });
    this._renderSubmitElement();
    super._initMarkup();
    this._updateContainerMarkup();
  }
  _renderValidationState() {
    const $content = this._getContent();
    if ($content.length === 1) {
      super._renderValidationState();
    }
  }
  _renderSubmitElement() {
    this._$submitElement = (0, _renderer.default)('<textarea>').addClass(HTML_EDITOR_SUBMIT_ELEMENT_CLASS).attr('hidden', true).appendTo(this.$element());
    const {
      value
    } = this.option();
    this._setSubmitValue(value);
  }
  _setSubmitValue(value) {
    this._getSubmitElement().val(value);
  }
  _getSubmitElement() {
    return this._$submitElement;
  }
  _convertToHtml(raw) {
    var _this$_htmlConverter, _this$_htmlConverter2;
    const value = raw ?? '';
    const result = (0, _type.isFunction)((_this$_htmlConverter = this._htmlConverter) === null || _this$_htmlConverter === void 0 ? void 0 : _this$_htmlConverter.toHtml) ? String(((_this$_htmlConverter2 = this._htmlConverter) === null || _this$_htmlConverter2 === void 0 ? void 0 : _this$_htmlConverter2.toHtml(value)) ?? '') : value;
    return result;
  }
  _convertFromHtml(raw) {
    var _this$_htmlConverter3, _this$_htmlConverter4;
    const value = raw ?? '';
    const result = (0, _type.isFunction)((_this$_htmlConverter3 = this._htmlConverter) === null || _this$_htmlConverter3 === void 0 ? void 0 : _this$_htmlConverter3.fromHtml) ? String(((_this$_htmlConverter4 = this._htmlConverter) === null || _this$_htmlConverter4 === void 0 ? void 0 : _this$_htmlConverter4.fromHtml(value)) ?? '') : value;
    return result;
  }
  _updateContainerMarkup() {
    const {
      value
    } = this.option();
    const html = this._convertToHtml(value);
    if (!html) {
      return;
    }
    const quill = (0, _m_quill_importer.getQuill)();
    const sanitizedHtml = (0, _html_sanitizer.sanitizeHtml)(quill, html);
    this._$htmlContainer.html(sanitizedHtml);
  }
  _render() {
    this._prepareConverters();
    super._render();
    this._toggleReadOnlyState();
  }
  _prepareQuillRegistrator() {
    if (!this._quillRegistrator) {
      this._quillRegistrator = new _m_quill_registrator.default();
    }
  }
  _getRegistrator() {
    this._prepareQuillRegistrator();
    return this._quillRegistrator;
  }
  _prepareConverters() {
    if (!this._deltaConverter) {
      const DeltaConverter = _m_converterController.default.getConverter('delta');
      if (DeltaConverter) {
        this._deltaConverter = new DeltaConverter();
      }
    }
  }
  // @ts-expect-error ts-error
  _renderContentImpl() {
    this._contentRenderedDeferred = (0, _deferred.Deferred)();
    const renderContentPromise = this._contentRenderedDeferred.promise();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    super._renderContentImpl();
    this._renderHtmlEditor();
    this._renderFormDialog();
    this._renderAIDialog();
    this._addKeyPressHandler();
    return renderContentPromise;
  }
  _pointerMoveHandler(e) {
    if (isIos) {
      e.stopPropagation();
    }
  }
  _attachFocusEvents() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (0, _common.deferRender)(super._attachFocusEvents.bind(this));
  }
  _addKeyPressHandler() {
    const keyDownEvent = (0, _index.addNamespace)('keydown', `${this.NAME}TextChange`);
    _events_engine.default.on(this._$htmlContainer, keyDownEvent, this._keyDownHandler.bind(this));
  }
  _keyDownHandler(e) {
    this._saveValueChangeEvent(e);
  }
  _renderHtmlEditor() {
    const {
      customizeModules
    } = this.option();
    const modulesConfig = this._getModulesConfig();
    if ((0, _type.isFunction)(customizeModules)) {
      customizeModules(modulesConfig);
    }
    this._quillInstance = this._getRegistrator().createEditor(this._$htmlContainer[0], {
      placeholder: this.option('placeholder'),
      readOnly: this.option('readOnly') || this.option('disabled'),
      modules: modulesConfig,
      theme: 'basic'
    });
    this._renderValidationState();
    this._deltaConverter.setQuillInstance(this._quillInstance);
    this._textChangeHandlerWithContext = this._textChangeHandler.bind(this);
    this._quillInstance.on('text-change', this._textChangeHandlerWithContext);
    this._renderScrollHandler();
    if (this._hasTranscludedContent()) {
      this._updateContentTask = (0, _common.executeAsync)(() => {
        this._applyTranscludedContent();
      });
    } else {
      this._finalizeContentRendering();
    }
  }
  _renderScrollHandler() {
    const $scrollContainer = this._getContent();
    const initScrollData = (0, _m_utils.prepareScrollData)($scrollContainer);
    _events_engine.default.on($scrollContainer,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    (0, _index.addNamespace)(_emitterGesture.default.init, this.NAME), initScrollData, _common.noop);
    _events_engine.default.on($scrollContainer,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    (0, _index.addNamespace)(_pointer.default.move, this.NAME), this._pointerMoveHandler.bind(this));
  }
  _applyTranscludedContent() {
    const {
      value
    } = this.option();
    if (!(0, _type.isDefined)(value)) {
      const html = this._deltaConverter.toHtml();
      const newDelta = this._quillInstance.clipboard.convert({
        html
      });
      if (newDelta.ops.length) {
        this._quillInstance.setContents(newDelta);
        return;
      }
    }
    this._finalizeContentRendering();
  }
  _hasTranscludedContent() {
    var _this$_$templateResul;
    return Boolean((_this$_$templateResul = this._$templateResult) === null || _this$_$templateResul === void 0 ? void 0 : _this$_$templateResul.length);
  }
  _getModulesConfig() {
    const modulesConfig = (0, _extend.extend)({}, {
      clipboard: this._getClipboardConfig(),
      // TODO: extract some IE11 tweaks for the Quill uploader module
      // dropImage: this._getBaseModuleConfig(),
      imageCursor: this._getBaseModuleConfig(),
      imageUpload: this._getModuleConfigByOption('imageUpload'),
      keyboard: this._getKeyboardModuleConfig(),
      mentions: this._getModuleConfigByOption('mentions'),
      multiline: Boolean(this.option('allowSoftLineBreak')),
      resizing: this._getModuleConfigByOption('mediaResizing'),
      table: true,
      tableContextMenu: this._getModuleConfigByOption('tableContextMenu'),
      tableResizing: this._getModuleConfigByOption('tableResizing'),
      toolbar: this._getModuleConfigByOption('toolbar'),
      uploader: this._getUploaderModuleConfig(),
      variables: this._getModuleConfigByOption('variables')
    }, this._getCustomModules());
    return modulesConfig;
  }
  _getUploaderModuleConfig() {
    return {
      onDrop: e => this._saveValueChangeEvent((0, _events.Event)(e)),
      imageBlot: 'extendedImage'
    };
  }
  _getKeyboardModuleConfig() {
    return {
      onKeydown: e => this._saveValueChangeEvent((0, _events.Event)(e))
    };
  }
  _getClipboardConfig() {
    const quill = this._getRegistrator().getQuill();
    const wordListMatcher = (0, _m_wordLists.default)(quill);
    return {
      onPaste: e => this._saveValueChangeEvent((0, _events.Event)(e)),
      onCut: e => this._saveValueChangeEvent((0, _events.Event)(e)),
      matchers: [['p.MsoListParagraphCxSpFirst', wordListMatcher], ['p.MsoListParagraphCxSpMiddle', wordListMatcher], ['p.MsoListParagraphCxSpLast', wordListMatcher]]
    };
  }
  _getModuleConfigByOption(optionName) {
    const optionValue = this.option(optionName);
    if (!(0, _type.isDefined)(optionValue)) {
      return undefined;
    }
    const configuration = Array.isArray(optionValue) ? {
      [optionName]: optionValue
    } : optionValue;
    const finalConfiguration = (0, _extend.extend)(this._getBaseModuleConfig(), configuration);
    return finalConfiguration;
  }
  _getBaseModuleConfig() {
    return {
      editorInstance: this
    };
  }
  _getCustomModules() {
    const modules = {};
    const moduleNames = this._getRegistrator().getRegisteredModuleNames();
    moduleNames.forEach(modulePath => {
      modules[modulePath] = this._getBaseModuleConfig();
    });
    return modules;
  }
  _textChangeHandler() {
    const {
      value
    } = this.option();
    const html = this._deltaConverter.toHtml();
    const convertedValue = this._convertFromHtml(html);
    if (value !== convertedValue && !this._isNullValueConverted(value, convertedValue)) {
      this._isEditorUpdating = true;
      this.option({
        value: convertedValue
      });
    }
    this._finalizeContentRendering();
  }
  _isNullValueConverted(value, convertedValue) {
    return value === null && convertedValue === '';
  }
  _finalizeContentRendering() {
    if (this._contentRenderedDeferred) {
      this.clearHistory();
      this._contentInitializedCallback.fire();
      this._contentRenderedDeferred.resolve();
      this._contentRenderedDeferred = undefined;
    }
  }
  _resetEnabledState() {
    if (this._quillInstance) {
      const isEnabled = !(this.option('readOnly') || this.option('disabled'));
      this._quillInstance.enable(isEnabled);
    }
  }
  _renderFormDialog() {
    const options = {
      width: 'auto',
      height: 'auto',
      hideOnOutsideClick: true
    };
    this._formDialog = new _formDialog.default(this.$element(), options);
  }
  _shouldRenderAIDialog() {
    const {
      aiIntegration,
      toolbar
    } = this.option();
    if (!(aiIntegration && toolbar !== null && toolbar !== void 0 && toolbar.items)) {
      return false;
    }
    return toolbar.items.some(item => typeof item === 'string' ? item === 'ai' : item.name === 'ai');
  }
  _renderAIDialog() {
    const shouldRenderAIDialog = this._shouldRenderAIDialog();
    if (shouldRenderAIDialog) {
      const {
        aiIntegration
      } = this.option();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this._aiDialog = new _aiDialog.default(this.$element(), aiIntegration);
    }
  }
  _getStylingModePrefix() {
    return `${HTML_EDITOR_CLASS}-`;
  }
  _getQuillContainer() {
    return this._$htmlContainer;
  }
  _prepareModuleOptions(args) {
    let {
      value
    } = args;
    const {
      fullName,
      name
    } = args;
    const optionData = fullName === null || fullName === void 0 ? void 0 : fullName.split('.');
    const optionName = optionData.length >= 2 ? optionData[1] : name;
    if (optionData.length === 3) {
      value = {
        [optionData[2]]: value
      };
    }
    return [optionName, value];
  }
  _moduleOptionChanged(moduleName, args) {
    const moduleInstance = this.getModule(moduleName);
    const shouldPassOptionsToModule = Boolean(moduleInstance);
    if (shouldPassOptionsToModule) {
      moduleInstance.option(...this._prepareModuleOptions(args));
    } else {
      this._invalidate();
    }
  }
  _processHtmlContentUpdating(value) {
    if (this._quillInstance) {
      if (this._isEditorUpdating) {
        this._isEditorUpdating = false;
      } else {
        const html = this._convertToHtml(value);
        this._suppressValueChangeAction();
        this._updateHtmlContent(html);
        this._resumeValueChangeAction();
      }
    } else {
      this._$htmlContainer.html(value);
    }
  }
  _processAIIntegrationUpdate() {
    if ((0, _type.isDefined)(this._aiDialog)) {
      const {
        aiIntegration
      } = this.option();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this._aiDialog.updateAIIntegration(aiIntegration);
      return;
    }
    this._renderAIDialog();
  }
  _optionChanged(args) {
    const {
      name,
      value,
      previousValue
    } = args;
    switch (name) {
      case 'aiIntegration':
        {
          this._processAIIntegrationUpdate();
          break;
        }
      case 'converter':
        {
          this._htmlConverter = value;
          const {
            value: currentValue
          } = this.option();
          this._processHtmlContentUpdating(currentValue);
          break;
        }
      case 'value':
        {
          this._processHtmlContentUpdating(value);
          // NOTE: value can be optimized by Quill
          const {
            value: currentValue
          } = this.option();
          if (currentValue !== previousValue) {
            this._setSubmitValue(currentValue);
            super._optionChanged(_extends({}, args, {
              [name]: currentValue
            }));
          }
          break;
        }
      case 'placeholder':
      case 'variables':
      case 'toolbar':
      case 'mentions':
      case 'customizeModules':
      case 'allowSoftLineBreak':
        this._invalidate();
        break;
      case 'tableResizing':
        this._moduleOptionChanged('tableResizing', args);
        break;
      case 'stylingMode':
        this._renderStylingMode();
        break;
      case 'readOnly':
      case 'disabled':
        super._optionChanged(args);
        this._resetEnabledState();
        break;
      case 'tableContextMenu':
        this._moduleOptionChanged('tableContextMenu', args);
        break;
      case 'mediaResizing':
        this._moduleOptionChanged('resizing', args);
        break;
      case 'width':
        super._optionChanged(args);
        this._repaintToolbar();
        break;
      case 'imageUpload':
        this._moduleOptionChanged('imageUpload', args);
        break;
      default:
        super._optionChanged(args);
    }
  }
  _repaintToolbar() {
    this._applyToolbarMethod('repaint');
  }
  _updateHtmlContent(html) {
    const newDelta = this._quillInstance.clipboard.convert({
      html
    });
    this._quillInstance.setContents(newDelta);
  }
  _clean() {
    if (this._quillInstance) {
      _events_engine.default.off(this._getContent(), `.${this.NAME}`);
      this._quillInstance.off('text-change', this._textChangeHandlerWithContext);
      this._cleanCallback.fire();
    }
    this._abortUpdateContentTask();
    this._cleanCallback.empty();
    this._contentInitializedCallback.empty();
    super._clean();
  }
  _abortUpdateContentTask() {
    if (this._updateContentTask) {
      this._updateContentTask.abort();
      this._updateContentTask = undefined;
    }
  }
  _applyQuillMethod(methodName) {
    if (!this._quillInstance) {
      return undefined;
    }
    // eslint-disable-next-line prefer-spread
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return this._quillInstance[methodName].apply(this._quillInstance, args);
  }
  _applyQuillHistoryMethod(methodName) {
    var _this$_quillInstance;
    if ((_this$_quillInstance = this._quillInstance) !== null && _this$_quillInstance !== void 0 && _this$_quillInstance.history) {
      this._quillInstance.history[methodName]();
    }
  }
  _applyToolbarMethod(methodName) {
    var _this$getModule;
    (_this$getModule = this.getModule('toolbar')) === null || _this$getModule === void 0 || _this$getModule[methodName]();
  }
  addCleanCallback(callback) {
    this._cleanCallback.add(callback);
  }
  addContentInitializedCallback(callback) {
    this._contentInitializedCallback.add(callback);
  }
  register(components) {
    this._getRegistrator().registerModules(components);
    if (this._quillInstance) {
      this.repaint();
    }
  }
  get(componentPath) {
    return this._getRegistrator().getQuill().import(componentPath);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getModule(moduleName) {
    return this._applyQuillMethod('getModule', moduleName);
  }
  getQuillInstance() {
    return this._quillInstance;
  }
  getSelection(focus) {
    const selection = this._applyQuillMethod('getSelection', focus);
    return selection;
  }
  setSelection(index, length) {
    this._applyQuillMethod('setSelection', index, length);
  }
  getText(index, length) {
    const text = this._applyQuillMethod('getText', index, length);
    return text;
  }
  format(formatName, formatValue) {
    this._applyQuillMethod('format', formatName, formatValue);
  }
  formatText(index, length, formatName, formatValue) {
    this._applyQuillMethod('formatText', index, length, formatName, formatValue);
  }
  formatLine(index, length, formatName, formatValue) {
    this._applyQuillMethod('formatLine', index, length, formatName, formatValue);
  }
  getFormat(index, length) {
    const formats = this._applyQuillMethod('getFormat', index, length);
    return formats;
  }
  removeFormat(index, length) {
    this._applyQuillMethod('removeFormat', index, length);
  }
  clearHistory() {
    this._applyQuillHistoryMethod('clear');
    this._applyToolbarMethod('updateHistoryWidgets');
  }
  undo() {
    this._applyQuillHistoryMethod('undo');
  }
  redo() {
    this._applyQuillHistoryMethod('redo');
  }
  getLength() {
    const length = this._applyQuillMethod('getLength');
    return length;
  }
  getBounds(index, length) {
    const bounds = this._applyQuillMethod('getBounds', index, length);
    return bounds;
  }
  delete(index, length) {
    this._applyQuillMethod('deleteText', index, length);
  }
  insertText(index, text, formatName, formatValue) {
    this._applyQuillMethod('insertText', index, text, formatName, formatValue);
  }
  insertEmbed(index, type, options) {
    this._applyQuillMethod('insertEmbed', index, type, options);
  }
  showFormDialog(formConfig) {
    return this._formDialog.show(formConfig);
  }
  showAIDialog(payload) {
    var _this$_aiDialog;
    return (_this$_aiDialog = this._aiDialog) === null || _this$_aiDialog === void 0 ? void 0 : _this$_aiDialog.show(payload);
  }
  formDialogOption(optionName, optionValue) {
    return this._formDialog.popupOption.apply(this._formDialog, [optionName, optionValue]);
  }
  focus() {
    super.focus();
    this._applyQuillMethod('focus');
  }
  blur() {
    this._applyQuillMethod('blur');
  }
  getMentionKeyInTemplateStorage() {
    return this._mentionKeyInTemplateStorage;
  }
}
(0, _component_registrator.default)('dxHtmlEditor', HtmlEditor);
var _default = exports.default = HtmlEditor;
