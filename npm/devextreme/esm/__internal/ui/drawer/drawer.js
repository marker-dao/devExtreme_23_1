/**
* DevExtreme (esm/__internal/ui/drawer/drawer.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { fx } from '../../../common/core/animation';
import { name as CLICK_EVENT_NAME } from '../../../common/core/events/click';
import eventsEngine from '../../../common/core/events/core/events_engine';
import { triggerResizeEvent } from '../../../common/core/events/visibility_change';
import registerComponent from '../../../core/component_registrator';
import { getPublicElement } from '../../../core/element';
import $ from '../../../core/renderer';
import { EmptyTemplate } from '../../../core/templates/empty_template';
import { Deferred, when } from '../../../core/utils/deferred';
import { getBoundingRect } from '../../../core/utils/position';
import { isDefined, isFunction } from '../../../core/utils/type';
import { hasWindow } from '../../../core/utils/window';
import Widget from '../../core/widget/widget';
import { animation } from '../../ui/drawer/drawer.animation';
import OverlapStrategy from '../../ui/drawer/drawer.rendering.strategy.overlap';
import PushStrategy from '../../ui/drawer/drawer.rendering.strategy.push';
import ShrinkStrategy from '../../ui/drawer/drawer.rendering.strategy.shrink';
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
class Drawer extends Widget {
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
    this._$wrapper = $('<div>').addClass(DRAWER_WRAPPER_CLASS);
    this._$viewContentWrapper = $('<div>').addClass(DRAWER_VIEW_CONTENT_CLASS);
    this._$wrapper.append(this._$viewContentWrapper);
    this.$element().append(this._$wrapper);
  }
  _initStrategy() {
    const {
      openedStateMode
    } = this.option();
    switch (openedStateMode) {
      case 'push':
        this._strategy = new PushStrategy(this);
        break;
      case 'shrink':
        this._strategy = new ShrinkStrategy(this);
        break;
      case 'overlap':
        this._strategy = new OverlapStrategy(this);
        break;
      default:
        this._strategy = new PushStrategy(this);
    }
  }
  _getAnonymousTemplateName() {
    return ANONYMOUS_TEMPLATE_NAME;
  }
  _initTemplates() {
    const defaultTemplates = {};
    defaultTemplates[PANEL_TEMPLATE_NAME] = new EmptyTemplate();
    defaultTemplates[ANONYMOUS_TEMPLATE_NAME] = new EmptyTemplate();
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
    if (isFunction(closeOnOutsideClick)) {
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
    this._whenPanelContentRendered = Deferred();
    this._strategy.renderPanelContent(this._whenPanelContentRendered);
    this._strategy.onPanelContentRendered();
    this._renderViewContent();
    eventsEngine.off(this._$viewContentWrapper, CLICK_EVENT_NAME);
    eventsEngine.on(this._$viewContentWrapper, CLICK_EVENT_NAME, this._viewContentWrapperClickHandler.bind(this));
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
      when(this._whenAnimationCompleted).done(callback);
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
    this._$panelContentWrapper = $('<div>').addClass(DRAWER_PANEL_CONTENT_CLASS);
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
        $(this._$viewContentWrapper).children().not(`.${DRAWER_SHADER_CLASS}`).replaceWith($viewTemplate);
      }
    }
  }
  _renderShader() {
    this._$shader = this._$shader || $('<div>').addClass(DRAWER_SHADER_CLASS);
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
    if (hasWindow()) {
      const {
        templateSize
      } = this.option();
      if (isDefined(templateSize)) {
        return templateSize; // number is expected
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return getBoundingRect(this._getPanelTemplateElement()).width;
    }
    return 0;
  }
  getRealPanelHeight() {
    if (hasWindow()) {
      const {
        templateSize
      } = this.option();
      if (isDefined(templateSize)) {
        return templateSize; // number is expected
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return getBoundingRect(this._getPanelTemplateElement()).height;
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
    fx.stop(this._$shader.get(0), jumpToEnd);
    fx.stop($(this.content()).get(0), jumpToEnd);
    fx.stop($(this.viewContent()).get(0), jumpToEnd);
    const overlay = this.getOverlay();
    if (overlay) {
      fx.stop($(overlay.$content()).get(0), jumpToEnd);
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
    triggerResizeEvent(this.viewContent());
  }
  _isInvertedPosition() {
    const position = this.calcTargetPosition();
    return position === 'right' || position === 'bottom';
  }
  _renderPosition(disableAnimation, jumpToEnd) {
    this.stopAnimations(jumpToEnd);
    this._whenAnimationCompleted = Deferred();
    const {
      animationDuration,
      animationEnabled: optionAnimationEnabled,
      opened
    } = this.option();
    const animationEnabled = !disableAnimation && optionAnimationEnabled;
    if (!animationEnabled) {
      this._whenAnimationCompleted.resolve();
    }
    if (!hasWindow()) {
      return;
    }
    // Clear possible settings from strategies:
    $(this.viewContent()).css('paddingLeft', 0);
    $(this.viewContent()).css('paddingRight', 0);
    $(this.viewContent()).css('paddingTop', 0);
    $(this.viewContent()).css('paddingBottom', 0);
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
    animation.complete($(this.viewContent()));
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
    $(this.viewContent()).css('left', 0); // can affect animation
    $(this.viewContent()).css('transform', 'translate(0px, 0px)'); // can affect animation
    $(this.viewContent()).removeClass('dx-theme-background-color');
    this._removePanelContentWrapper();
    this._removeOverlay();
    this._renderPanelContentWrapper();
    this._refreshWrapperChildrenOrder();
    this._whenPanelContentRefreshed = Deferred();
    this._strategy.renderPanelContent(this._whenPanelContentRefreshed);
    this._strategy.onPanelContentRendered();
    if (hasWindow()) {
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
    return this._$panelContentWrapper ? getPublicElement(this._$panelContentWrapper) : undefined;
  }
  viewContent() {
    return getPublicElement(this._$viewContentWrapper);
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
registerComponent('dxDrawer', Drawer);
export default Drawer;
