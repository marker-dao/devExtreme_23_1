"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _animation = require("../../../common/core/animation");
var _click = require("../../../common/core/events/click");
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _visibility_change = require("../../../common/core/events/visibility_change");
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _element = require("../../../core/element");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _empty_template = require("../../../core/templates/empty_template");
var _deferred = require("../../../core/utils/deferred");
var _position = require("../../../core/utils/position");
var _type = require("../../../core/utils/type");
var _window = require("../../../core/utils/window");
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
var _drawer = require("../../ui/drawer/drawer.animation");
var _drawerRenderingStrategy = _interopRequireDefault(require("../../ui/drawer/drawer.rendering.strategy.overlap"));
var _drawerRenderingStrategy2 = _interopRequireDefault(require("../../ui/drawer/drawer.rendering.strategy.push"));
var _drawerRenderingStrategy3 = _interopRequireDefault(require("../../ui/drawer/drawer.rendering.strategy.shrink"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DRAWER_CLASS = 'dx-drawer';
const DRAWER_WRAPPER_CLASS = 'dx-drawer-wrapper';
const DRAWER_PANEL_CONTENT_CLASS = 'dx-drawer-panel-content';
const DRAWER_PANEL_CONTENT_HIDDEN_CLASS = 'dx-drawer-panel-content-hidden';
const DRAWER_VIEW_CONTENT_CLASS = 'dx-drawer-content';
const DRAWER_SHADER_CLASS = 'dx-drawer-shader';
const INVISIBLE_STATE_CLASS = 'dx-state-invisible';
const OPENED_STATE_CLASS = 'dx-drawer-opened';
const ANONYMOUS_TEMPLATE_NAME = 'content';
const PANEL_TEMPLATE_NAME = 'panel';
class Drawer extends _widget.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      position: 'left',
      opened: false,
      // @ts-expect-error ts-error
      minSize: null,
      // @ts-expect-error ts-error
      maxSize: null,
      shading: false,
      template: PANEL_TEMPLATE_NAME,
      openedStateMode: 'shrink',
      revealMode: 'slide',
      animationEnabled: true,
      animationDuration: 400,
      closeOnOutsideClick: false,
      contentTemplate: ANONYMOUS_TEMPLATE_NAME
    });
  }
  _init() {
    super._init();
    this._initStrategy();
    this.$element().addClass(DRAWER_CLASS);
    this._whenAnimationCompleted = undefined;
    this._whenPanelContentRendered = undefined;
    this._whenPanelContentRefreshed = undefined;
    this._$wrapper = (0, _renderer.default)('<div>').addClass(DRAWER_WRAPPER_CLASS);
    this._$viewContentWrapper = (0, _renderer.default)('<div>').addClass(DRAWER_VIEW_CONTENT_CLASS);
    this._$wrapper.append(this._$viewContentWrapper);
    this.$element().append(this._$wrapper);
  }
  _initStrategy() {
    const {
      openedStateMode
    } = this.option();
    switch (openedStateMode) {
      case 'push':
        this._strategy = new _drawerRenderingStrategy2.default(this);
        break;
      case 'shrink':
        this._strategy = new _drawerRenderingStrategy3.default(this);
        break;
      case 'overlap':
        this._strategy = new _drawerRenderingStrategy.default(this);
        break;
      default:
        this._strategy = new _drawerRenderingStrategy2.default(this);
    }
  }
  _getAnonymousTemplateName() {
    return ANONYMOUS_TEMPLATE_NAME;
  }
  _initTemplates() {
    const defaultTemplates = {};
    defaultTemplates[PANEL_TEMPLATE_NAME] = new _empty_template.EmptyTemplate();
    defaultTemplates[ANONYMOUS_TEMPLATE_NAME] = new _empty_template.EmptyTemplate();
    this._templateManager.addDefaultTemplates(defaultTemplates);
    super._initTemplates();
  }
  _viewContentWrapperClickHandler(e) {
    const {
      opened,
      shading
    } = this.option();
    let {
      closeOnOutsideClick
    } = this.option();
    if ((0, _type.isFunction)(closeOnOutsideClick)) {
      closeOnOutsideClick = closeOnOutsideClick(e);
    }
    if (closeOnOutsideClick && opened) {
      this.stopAnimations();
      if (shading) {
        e.preventDefault();
      }
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.hide();
    }
  }
  _initMarkup() {
    super._initMarkup();
    const {
      opened
    } = this.option();
    this._toggleOpenedStateClass(opened);
    this._renderPanelContentWrapper();
    this._refreshOpenedStateModeClass();
    this._refreshRevealModeClass();
    this._renderShader();
    this._refreshPositionClass();
    this._whenPanelContentRendered = (0, _deferred.Deferred)();
    this._strategy.renderPanelContent(this._whenPanelContentRendered);
    this._strategy.onPanelContentRendered();
    this._renderViewContent();
    _events_engine.default.off(this._$viewContentWrapper, _click.name);
    _events_engine.default.on(this._$viewContentWrapper, _click.name, this._viewContentWrapperClickHandler.bind(this));
    this._refreshWrapperChildrenOrder();
  }
  _render() {
    var _this$_whenPanelConte;
    this._initMinMaxSize();
    super._render();
    (_this$_whenPanelConte = this._whenPanelContentRendered) === null || _this$_whenPanelConte === void 0 || _this$_whenPanelConte.always(() => {
      this._initMinMaxSize();
      const {
        revealMode
      } = this.option();
      this._strategy.refreshPanelElementSize(revealMode === 'slide');
      this._renderPosition(true);
      this._removePanelManualPosition();
    });
  }
  _removePanelManualPosition() {
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    if (this._$panelContentWrapper && this._$panelContentWrapper.attr('manualposition')) {
      this._$panelContentWrapper.removeAttr('manualPosition');
      this._$panelContentWrapper.css({
        position: '',
        top: '',
        left: '',
        right: '',
        bottom: ''
      });
    }
  }
  _togglePanelContentHiddenClass() {
    const callback = () => {
      var _this$_$panelContentW;
      const {
        minSize,
        opened
      } = this.option();
      const shouldBeSet = minSize ? false : !opened;
      (_this$_$panelContentW = this._$panelContentWrapper) === null || _this$_$panelContentW === void 0 || _this$_$panelContentW.toggleClass(DRAWER_PANEL_CONTENT_HIDDEN_CLASS, shouldBeSet);
    };
    if (this._whenAnimationCompleted && !this.option('opened')) {
      (0, _deferred.when)(this._whenAnimationCompleted).done(callback);
    } else {
      callback();
    }
  }
  _renderPanelContentWrapper() {
    const {
      openedStateMode,
      opened,
      minSize
    } = this.option();
    this._$panelContentWrapper = (0, _renderer.default)('<div>').addClass(DRAWER_PANEL_CONTENT_CLASS);
    this._togglePanelContentHiddenClass();
    const position = this.calcTargetPosition();
    if (openedStateMode === 'push' && position && ['top', 'bottom'].includes(position)) {
      this._$panelContentWrapper.addClass(`${DRAWER_PANEL_CONTENT_CLASS}-push-top-or-bottom`);
    }
    if (openedStateMode !== 'overlap' && !opened && !minSize) {
      this._$panelContentWrapper.attr('manualposition', true);
      this._$panelContentWrapper.css({
        position: 'absolute',
        top: '-10000px',
        left: '-10000px',
        right: 'auto',
        bottom: 'auto'
      });
    }
    this._$wrapper.append(this._$panelContentWrapper);
  }
  _refreshOpenedStateModeClass(prevOpenedStateMode) {
    if (prevOpenedStateMode) {
      this.$element().removeClass(`${DRAWER_CLASS}-${prevOpenedStateMode}`);
    }
    const {
      openedStateMode
    } = this.option();
    this.$element().addClass(`${DRAWER_CLASS}-${openedStateMode}`);
  }
  _refreshPositionClass() {
    const positions = ['left', 'right', 'top', 'bottom'];
    const classPrefix = `${DRAWER_CLASS}-`;
    this.$element().removeClass(positions.map(position => `${classPrefix}${position}`).join(' ')).addClass(`${classPrefix}${this.calcTargetPosition()}`);
  }
  _refreshWrapperChildrenOrder() {
    const position = this.calcTargetPosition();
    const {
      rtlEnabled
    } = this.option();
    if (this._strategy.isViewContentFirst(position, rtlEnabled)) {
      this._$wrapper.prepend(this._$viewContentWrapper);
    } else if (this._$panelContentWrapper) {
      this._$wrapper.prepend(this._$panelContentWrapper);
    }
  }
  _refreshRevealModeClass(prevRevealMode) {
    if (prevRevealMode) {
      this.$element().removeClass(`${DRAWER_CLASS}-${prevRevealMode}`);
    }
    const {
      revealMode
    } = this.option();
    this.$element().addClass(`${DRAWER_CLASS}-${revealMode}`);
  }
  _renderViewContent() {
    const contentTemplateOption = this.option('contentTemplate');
    const contentTemplate = this._getTemplate(contentTemplateOption);
    if (contentTemplate) {
      const $viewTemplate = contentTemplate.render({
        container: this.viewContent(),
        noModel: true,
        transclude: this._templateManager.anonymousTemplateName === contentTemplateOption
      });
      if ($viewTemplate.hasClass('ng-scope')) {
        (0, _renderer.default)(this._$viewContentWrapper).children().not(`.${DRAWER_SHADER_CLASS}`).replaceWith($viewTemplate);
      }
    }
  }
  _renderShader() {
    this._$shader = this._$shader || (0, _renderer.default)('<div>').addClass(DRAWER_SHADER_CLASS);
    this._$shader.appendTo(this.viewContent());
    const {
      opened
    } = this.option();
    this._toggleShaderVisibility(opened);
  }
  _initSize() {
    this._initMinMaxSize();
  }
  _initMinMaxSize() {
    const realPanelSize = this.isHorizontalDirection() ? this.getRealPanelWidth() : this.getRealPanelHeight();
    const {
      maxSize,
      minSize
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    this._maxSize = maxSize || realPanelSize;
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    this._minSize = minSize || 0;
  }
  calcTargetPosition() {
    const {
      position,
      rtlEnabled
    } = this.option();
    if (position === 'before') {
      return rtlEnabled ? 'right' : 'left';
    }
    if (position === 'after') {
      return rtlEnabled ? 'left' : 'right';
    }
    return position;
  }
  getOverlayTarget() {
    return this._$wrapper;
  }
  getOverlay() {
    return this._overlay;
  }
  getMaxSize() {
    return this._maxSize;
  }
  getMinSize() {
    return this._minSize;
  }
  getRealPanelWidth() {
    if ((0, _window.hasWindow)()) {
      const {
        templateSize
      } = this.option();
      if ((0, _type.isDefined)(templateSize)) {
        return templateSize; // number is expected
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return (0, _position.getBoundingRect)(this._getPanelTemplateElement()).width;
    }
    return 0;
  }
  getRealPanelHeight() {
    if ((0, _window.hasWindow)()) {
      const {
        templateSize
      } = this.option();
      if ((0, _type.isDefined)(templateSize)) {
        return templateSize; // number is expected
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return (0, _position.getBoundingRect)(this._getPanelTemplateElement()).height;
    }
    return 0;
  }
  _getPanelTemplateElement() {
    const $panelContent = this._strategy.getPanelContent();
    let $result = $panelContent;
    if ($panelContent.children().length) {
      $result = $panelContent.children().eq(0);
      if ($panelContent.hasClass('dx-overlay-content') && $result.hasClass('dx-template-wrapper') && $result.children().length) {
        // T948509, T956751
        $result = $result.children().eq(0);
      }
    }
    return $result.get(0);
  }
  isHorizontalDirection() {
    const position = this.calcTargetPosition();
    return position === 'left' || position === 'right';
  }
  stopAnimations() {
    let jumpToEnd = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    _animation.fx.stop(this._$shader.get(0), jumpToEnd);
    _animation.fx.stop((0, _renderer.default)(this.content()).get(0), jumpToEnd);
    _animation.fx.stop((0, _renderer.default)(this.viewContent()).get(0), jumpToEnd);
    const overlay = this.getOverlay();
    if (overlay) {
      _animation.fx.stop((0, _renderer.default)(overlay.$content()).get(0), jumpToEnd);
    }
  }
  setZIndex(zIndex) {
    var _this$_$panelContentW2;
    this._$shader.css('zIndex', zIndex - 1);
    (_this$_$panelContentW2 = this._$panelContentWrapper) === null || _this$_$panelContentW2 === void 0 || _this$_$panelContentW2.css('zIndex', zIndex);
  }
  resizeContent() {
    this.resizeViewContent();
  }
  resizeViewContent() {
    (0, _visibility_change.triggerResizeEvent)(this.viewContent());
  }
  _isInvertedPosition() {
    const position = this.calcTargetPosition();
    return position === 'right' || position === 'bottom';
  }
  _renderPosition(disableAnimation, jumpToEnd) {
    this.stopAnimations(jumpToEnd);
    this._whenAnimationCompleted = (0, _deferred.Deferred)();
    const {
      animationDuration,
      animationEnabled: optionAnimationEnabled,
      opened
    } = this.option();
    const animationEnabled = !disableAnimation && optionAnimationEnabled;
    if (!animationEnabled) {
      this._whenAnimationCompleted.resolve();
    }
    if (!(0, _window.hasWindow)()) {
      return;
    }
    // Clear possible settings from strategies:
    (0, _renderer.default)(this.viewContent()).css('paddingLeft', 0);
    (0, _renderer.default)(this.viewContent()).css('paddingRight', 0);
    (0, _renderer.default)(this.viewContent()).css('paddingTop', 0);
    (0, _renderer.default)(this.viewContent()).css('paddingBottom', 0);
    if (opened) {
      this._toggleShaderVisibility(opened);
    }
    this._strategy.renderPosition(animationEnabled, animationDuration);
  }
  _animationCompleteHandler() {
    var _this$_whenAnimationC;
    this.resizeViewContent();
    (_this$_whenAnimationC = this._whenAnimationCompleted) === null || _this$_whenAnimationC === void 0 || _this$_whenAnimationC.resolve();
  }
  _getPositionCorrection() {
    return this._isInvertedPosition() ? -1 : 1;
  }
  _dispose() {
    _drawer.animation.complete((0, _renderer.default)(this.viewContent()));
    super._dispose();
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._dimensionChanged();
    }
  }
  _dimensionChanged() {
    this._initMinMaxSize();
    const {
      revealMode
    } = this.option();
    this._strategy.refreshPanelElementSize(revealMode === 'slide');
    this._renderPosition(true);
  }
  _toggleShaderVisibility(visible) {
    if (this.option('shading')) {
      this._$shader.toggleClass(INVISIBLE_STATE_CLASS, !visible);
      this._$shader.css('visibility', visible ? 'visible' : 'hidden');
    } else {
      this._$shader.toggleClass(INVISIBLE_STATE_CLASS, true);
    }
  }
  _toggleOpenedStateClass(opened) {
    this.$element().toggleClass(OPENED_STATE_CLASS, opened);
  }
  _refreshPanel() {
    (0, _renderer.default)(this.viewContent()).css('left', 0); // can affect animation
    (0, _renderer.default)(this.viewContent()).css('transform', 'translate(0px, 0px)'); // can affect animation
    (0, _renderer.default)(this.viewContent()).removeClass('dx-theme-background-color');
    this._removePanelContentWrapper();
    this._removeOverlay();
    this._renderPanelContentWrapper();
    this._refreshWrapperChildrenOrder();
    this._whenPanelContentRefreshed = (0, _deferred.Deferred)();
    this._strategy.renderPanelContent(this._whenPanelContentRefreshed);
    this._strategy.onPanelContentRendered();
    if ((0, _window.hasWindow)()) {
      this._whenPanelContentRefreshed.always(() => {
        const {
          revealMode
        } = this.option();
        this._strategy.refreshPanelElementSize(revealMode === 'slide');
        this._renderPosition(true, true);
        this._removePanelManualPosition();
      });
    }
  }
  _clean() {
    this._cleanFocusState();
    this._removePanelContentWrapper();
    this._removeOverlay();
  }
  _removePanelContentWrapper() {
    if (this._$panelContentWrapper) {
      this._$panelContentWrapper.remove();
    }
  }
  _removeOverlay() {
    if (this._overlay) {
      this._overlay.dispose();
      delete this._overlay;
      delete this._$panelContentWrapper; // TODO: move to _removePanelContentWrapper?
    }
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'width':
        super._optionChanged(args);
        this._dimensionChanged();
        break;
      case 'opened':
        this._renderPosition();
        this._toggleOpenedStateClass(args.value);
        this._togglePanelContentHiddenClass();
        break;
      case 'position':
        this._refreshPositionClass();
        this._refreshWrapperChildrenOrder();
        this._invalidate();
        break;
      case 'contentTemplate':
      case 'template':
        this._invalidate();
        break;
      case 'openedStateMode':
        this._initStrategy();
        this._refreshOpenedStateModeClass(args.previousValue);
        this._refreshPanel();
        break;
      case 'minSize':
        this._initMinMaxSize();
        this._renderPosition(true);
        this._togglePanelContentHiddenClass();
        break;
      case 'maxSize':
        this._initMinMaxSize();
        this._renderPosition(true);
        break;
      case 'revealMode':
        this._refreshRevealModeClass(args.previousValue);
        this._refreshPanel();
        break;
      case 'shading':
        {
          const {
            opened
          } = this.option();
          this._toggleShaderVisibility(opened);
          break;
        }
      case 'animationEnabled':
      case 'animationDuration':
      case 'closeOnOutsideClick':
        break;
      default:
        super._optionChanged(args);
    }
  }
  content() {
    return this._$panelContentWrapper ? (0, _element.getPublicElement)(this._$panelContentWrapper) : undefined;
  }
  viewContent() {
    return (0, _element.getPublicElement)(this._$viewContentWrapper);
  }
  show() {
    return this.toggle(true);
  }
  hide() {
    return this.toggle(false);
  }
  toggle(opened) {
    var _this$_whenAnimationC2;
    const {
      opened: currentOpened
    } = this.option();
    const targetOpened = opened ?? !currentOpened;
    this.option('opened', targetOpened);
    return (_this$_whenAnimationC2 = this._whenAnimationCompleted) === null || _this$_whenAnimationC2 === void 0 ? void 0 : _this$_whenAnimationC2.promise();
  }
}
(0, _component_registrator.default)('dxDrawer', Drawer);
var _default = exports.default = Drawer;