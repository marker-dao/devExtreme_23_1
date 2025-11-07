/**
* DevExtreme (esm/__internal/ui/diagram/ui.diagram.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import positionUtils from '../../../common/core/animation/position';
import eventsEngine from '../../../common/core/events/core/events_engine';
import { addNamespace } from '../../../common/core/events/utils';
import messageLocalization from '../../../common/core/localization/message';
import numberLocalization from '../../../common/core/localization/number';
import registerComponent from '../../../core/component_registrator';
import { getPublicElement } from '../../../core/element';
import $ from '../../../core/renderer';
import { compileGetter, compileSetter } from '../../../core/utils/data';
import { extend } from '../../../core/utils/extend';
import { getHeight, getOuterHeight, getOuterWidth } from '../../../core/utils/size';
import { isDefined, isFunction } from '../../../core/utils/type';
import { getWindow, hasWindow } from '../../../core/utils/window';
import Widget from '../../core/widget/widget';
import DiagramCommandsManager from '../../ui/diagram/diagram.commands_manager';
import EdgesOption from '../../ui/diagram/diagram.edges_option';
import { getDiagram } from '../../ui/diagram/diagram.importer';
import NodesOption from '../../ui/diagram/diagram.nodes_option';
import DiagramOptionsUpdateBar from '../../ui/diagram/diagram.options_update';
import DiagramToolboxManager from '../../ui/diagram/diagram.toolbox_manager';
import diagramContextMenuModule from '../../ui/diagram/ui.diagram.context_menu';
import DiagramContextToolbox from '../../ui/diagram/ui.diagram.context_toolbox';
import DiagramDialogManager from '../../ui/diagram/ui.diagram.dialog_manager';
import DiagramDialog from '../../ui/diagram/ui.diagram.dialogs';
import DiagramHistoryToolbar from '../../ui/diagram/ui.diagram.history_toolbar';
import DiagramMainToolbar from '../../ui/diagram/ui.diagram.main_toolbar';
import DiagramPropertiesPanel from '../../ui/diagram/ui.diagram.properties_panel';
import DiagramPropertiesToolbar from '../../ui/diagram/ui.diagram.properties_toolbar';
import DiagramScrollView from '../../ui/diagram/ui.diagram.scroll_view';
import DiagramToolbar from '../../ui/diagram/ui.diagram.toolbar';
import DiagramToolbox from '../../ui/diagram/ui.diagram.toolbox';
import DiagramViewToolbar from '../../ui/diagram/ui.diagram.view_toolbar';
import LoadIndicator from '../../ui/load_indicator';
import Overlay from '../../ui/overlay/overlay';
import * as zIndexPool from '../../ui/overlay/z_index';
const DIAGRAM_CLASS = 'dx-diagram';
const DIAGRAM_FULLSCREEN_CLASS = 'dx-diagram-fullscreen';
const DIAGRAM_TOOLBAR_WRAPPER_CLASS = `${DIAGRAM_CLASS}-toolbar-wrapper`;
const DIAGRAM_CONTENT_WRAPPER_CLASS = `${DIAGRAM_CLASS}-content-wrapper`;
const DIAGRAM_CONTENT_CLASS = `${DIAGRAM_CLASS}-content`;
const DIAGRAM_SCROLL_VIEW_CLASS = `${DIAGRAM_CLASS}-scroll-view`;
const DIAGRAM_FLOATING_TOOLBAR_CONTAINER_CLASS = `${DIAGRAM_CLASS}-floating-toolbar-container`;
const DIAGRAM_PROPERTIES_PANEL_TOOLBAR_CONTAINER_CLASS = `${DIAGRAM_CLASS}-properties-panel-toolbar-container`;
const DIAGRAM_LOADING_INDICATOR_CLASS = `${DIAGRAM_CLASS}-loading-indicator`;
const DIAGRAM_FLOATING_PANEL_OFFSET = 12;
const DIAGRAM_PROPERTIES_PANEL_NS_OFFSET = 16;
const DIAGRAM_DEFAULT_UNIT = 'in';
const DIAGRAM_DEFAULT_ZOOMLEVEL = 1;
const DIAGRAM_DEFAULT_AUTOZOOM_MODE = 'disabled';
const DIAGRAM_DEFAULT_PAGE_ORIENTATION = 'portrait';
const DIAGRAM_DEFAULT_PAGE_COLOR = '#ffffff';
const DIAGRAM_MAX_MOBILE_WINDOW_WIDTH = 576;
const DIAGRAM_TOOLBOX_SHAPE_SPACING = 12;
const DIAGRAM_TOOLBOX_SHAPES_PER_ROW = 3;
const DIAGRAM_CONTEXT_TOOLBOX_SHAPE_SPACING = 12;
const DIAGRAM_CONTEXT_TOOLBOX_SHAPES_PER_ROW = 4;
const DIAGRAM_CONTEXT_TOOLBOX_DEFAULT_WIDTH = 152;
const DIAGRAM_NAMESPACE = 'dxDiagramEvent';
const FULLSCREEN_CHANGE_EVENT_NAME = addNamespace('fullscreenchange', DIAGRAM_NAMESPACE);
const IE_FULLSCREEN_CHANGE_EVENT_NAME = addNamespace('msfullscreenchange', DIAGRAM_NAMESPACE);
const WEBKIT_FULLSCREEN_CHANGE_EVENT_NAME = addNamespace('webkitfullscreenchange', DIAGRAM_NAMESPACE);
const MOZ_FULLSCREEN_CHANGE_EVENT_NAME = addNamespace('mozfullscreenchange', DIAGRAM_NAMESPACE);
class Diagram extends Widget {
  constructor() {
    super(...arguments);
    this._loadingIndicator = null;
  }
  _init() {
    this._updateDiagramLockCount = 0;
    this.toggleFullscreenLock = 0;
    this._toolbars = [];
    super._init();
    this._initDiagram();
    this._createCustomCommand();
  }
  _initMarkup() {
    super._initMarkup();
    this._toolbars = [];
    delete this._isMobileScreenSize;
    const isServerSide = !hasWindow();
    this.$element().addClass(DIAGRAM_CLASS);
    delete this._mainToolbar;
    const {
      mainToolbar
    } = this.option();
    if (mainToolbar !== null && mainToolbar !== void 0 && mainToolbar.visible) {
      this._renderMainToolbar();
    }
    const $contentWrapper = $('<div>').addClass(DIAGRAM_CONTENT_WRAPPER_CLASS).appendTo(this.$element());
    delete this._historyToolbar;
    delete this._historyToolbarResizeCallback;
    if (this._isHistoryToolbarVisible()) {
      this._renderHistoryToolbar($contentWrapper);
    }
    delete this._propertiesToolbar;
    delete this._propertiesToolbarResizeCallback;
    if (this._isPropertiesPanelEnabled()) {
      this._renderPropertiesToolbar($contentWrapper);
    }
    delete this._viewToolbar;
    delete this._viewToolbarResizeCallback;
    if (this.option('viewToolbar.visible')) {
      this._renderViewToolbar($contentWrapper);
    }
    delete this._toolbox;
    delete this._toolboxResizeCallback;
    if (this._isToolboxEnabled()) {
      this._renderToolbox($contentWrapper);
    }
    delete this._propertiesPanel;
    delete this._propertiesPanelResizeCallback;
    if (this._isPropertiesPanelEnabled()) {
      this._renderPropertiesPanel($contentWrapper);
    }
    this._$content = $('<div>').addClass(DIAGRAM_CONTENT_CLASS).appendTo($contentWrapper);
    delete this._contextMenu;
    this._diagramInstance.settings.contextMenuEnabled = this.option('contextMenu.enabled');
    if (this._diagramInstance.settings.contextMenuEnabled) {
      this._renderContextMenu($contentWrapper);
    }
    delete this._contextToolbox;
    if (this.option('contextToolbox.enabled')) {
      this._renderContextToolbox($contentWrapper);
    }
    this._renderDialog($contentWrapper);
    if (!isServerSide) {
      const {
        useNativeScrolling
      } = this.option();
      const $scrollViewWrapper = $('<div>').addClass(DIAGRAM_SCROLL_VIEW_CLASS).appendTo(this._$content);
      this._createComponent($scrollViewWrapper, DiagramScrollView, {
        useNativeScrolling,
        onCreateDiagram: e => {
          this._diagramInstance.createDocument(e.$parent[0], e.scrollView, $contentWrapper[0]);
        }
      });
    }
    this._setCustomCommandChecked(DiagramCommandsManager.SHOW_PROPERTIES_PANEL_COMMAND_NAME, this._isPropertiesPanelVisible());
    this._setCustomCommandChecked(DiagramCommandsManager.SHOW_TOOLBOX_COMMAND_NAME, this._isToolboxVisible());
    this._createOptionsUpdateBar();
  }
  _dimensionChanged() {
    this._isMobileScreenSize = undefined;
    this._processDiagramResize();
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._bindDiagramData();
      this.repaint();
    }
  }
  _processDiagramResize() {
    this._diagramInstance.onDimensionChanged();
    if (this._historyToolbarResizeCallback) {
      this._historyToolbarResizeCallback.call(this);
    }
    if (this._propertiesToolbarResizeCallback) {
      this._propertiesToolbarResizeCallback.call(this);
    }
    if (this._propertiesPanelResizeCallback) {
      this._propertiesPanelResizeCallback.call(this);
    }
    if (this._viewToolbarResizeCallback) {
      this._viewToolbarResizeCallback.call(this);
    }
    if (this._toolboxResizeCallback) {
      this._toolboxResizeCallback.call(this);
    }
  }
  isMobileScreenSize() {
    if (this._isMobileScreenSize === undefined) {
      this._isMobileScreenSize = hasWindow() && getOuterWidth(this.$element()) < DIAGRAM_MAX_MOBILE_WINDOW_WIDTH;
    }
    return this._isMobileScreenSize;
  }
  _captureFocus() {
    if (this._diagramInstance) {
      this._diagramInstance.captureFocus();
    }
  }
  _captureFocusOnTimeout() {
    // eslint-disable-next-line no-restricted-globals
    this._captureFocusTimeout = setTimeout(() => {
      this._captureFocus();
      delete this._captureFocusTimeout;
    }, 100);
  }
  _killCaptureFocusTimeout() {
    if (this._captureFocusTimeout) {
      clearTimeout(this._captureFocusTimeout);
      delete this._captureFocusTimeout;
    }
  }
  notifyBarCommandExecuted() {
    this._captureFocusOnTimeout();
  }
  _registerToolbar(component) {
    var _this$_toolbars;
    this._registerBar(component);
    (_this$_toolbars = this._toolbars) === null || _this$_toolbars === void 0 || _this$_toolbars.push(component);
  }
  _registerBar(component) {
    var _component$bar;
    (_component$bar = component.bar) === null || _component$bar === void 0 || _component$bar.onChanged.add(this);
    this._diagramInstance.registerBar(component.bar);
  }
  _getExcludeCommands() {
    const excludeCommands = [];
    if (!this._isToolboxEnabled()) {
      excludeCommands.push(DiagramCommandsManager.SHOW_TOOLBOX_COMMAND_NAME);
    }
    if (!this._isPropertiesPanelEnabled()) {
      excludeCommands.push(DiagramCommandsManager.SHOW_PROPERTIES_PANEL_COMMAND_NAME);
    }
    return excludeCommands;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getToolbarBaseOptions() {
    return {
      onContentReady: _ref => {
        let {
          component
        } = _ref;
        this._registerToolbar(component);
      },
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      onSubMenuVisibilityChanging: _ref2 => {
        let {
          component
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        } = _ref2;
        return this._diagramInstance.updateBarItemsState(component.bar);
      },
      onPointerUp: this._onPanelPointerUp.bind(this),
      export: this.option('export'),
      excludeCommands: this._getExcludeCommands(),
      onInternalCommand: this._onInternalCommand.bind(this),
      onCustomCommand: this._onCustomCommand.bind(this),
      isMobileView: this.isMobileScreenSize()
    };
  }
  _onInternalCommand(e) {
    switch (e.command) {
      case DiagramCommandsManager.SHOW_TOOLBOX_COMMAND_NAME:
        if (this._toolbox) {
          this._toolbox.toggle();
        }
        break;
      case DiagramCommandsManager.SHOW_PROPERTIES_PANEL_COMMAND_NAME:
        if (this._propertiesPanel) {
          this._propertiesPanel.toggle();
        }
        break;
      default:
        break;
    }
  }
  _onCustomCommand(e) {
    var _this$_customCommandA;
    (_this$_customCommandA = this._customCommandAction) === null || _this$_customCommandA === void 0 || _this$_customCommandA.call(this, {
      name: e.name
    });
  }
  _renderMainToolbar() {
    const $toolbarWrapper = $('<div>').addClass(DIAGRAM_TOOLBAR_WRAPPER_CLASS).appendTo(this.$element());
    this._mainToolbar = this._createComponent($toolbarWrapper, DiagramMainToolbar, extend(this._getToolbarBaseOptions(), {
      commands: this.option('mainToolbar.commands'),
      skipAdjustSize: true
    }));
  }
  _isHistoryToolbarVisible() {
    return this.option('historyToolbar.visible') && !this.isReadOnlyMode();
  }
  _renderHistoryToolbar($parent) {
    const $container = $('<div>').addClass(DIAGRAM_FLOATING_TOOLBAR_CONTAINER_CLASS).appendTo($parent);
    this._historyToolbar = this._createComponent($container, DiagramHistoryToolbar, extend(this._getToolbarBaseOptions(), {
      commands: this.option('historyToolbar.commands'),
      locateInMenu: 'never'
    }));
    this._updateHistoryToolbarPosition();
    this._historyToolbarResizeCallback = () => {
      var _this$_historyToolbar;
      (_this$_historyToolbar = this._historyToolbar) === null || _this$_historyToolbar === void 0 || _this$_historyToolbar.option('isMobileView', this.isMobileScreenSize());
    };
  }
  _updateHistoryToolbarPosition() {
    var _this$_historyToolbar2, _this$_historyToolbar3;
    if (!hasWindow()) return;
    positionUtils.setup((_this$_historyToolbar2 = this._historyToolbar) === null || _this$_historyToolbar2 === void 0 ? void 0 : _this$_historyToolbar2.$element(), {
      my: 'left top',
      at: 'left top',
      of: (_this$_historyToolbar3 = this._historyToolbar) === null || _this$_historyToolbar3 === void 0 ? void 0 : _this$_historyToolbar3.$element().parent(),
      offset: `${DIAGRAM_FLOATING_PANEL_OFFSET} ${DIAGRAM_FLOATING_PANEL_OFFSET}`
    });
  }
  _isToolboxEnabled() {
    const {
      toolbox
    } = this.option();
    return (toolbox === null || toolbox === void 0 ? void 0 : toolbox.visibility) !== 'disabled' && !this.isReadOnlyMode();
  }
  _isToolboxVisible() {
    const {
      toolbox
    } = this.option();
    return (toolbox === null || toolbox === void 0 ? void 0 : toolbox.visibility) === 'visible' || (toolbox === null || toolbox === void 0 ? void 0 : toolbox.visibility) === 'auto' && !this.isMobileScreenSize();
  }
  _renderToolbox($parent) {
    var _this$_toolbox$_popup;
    const isServerSide = !hasWindow();
    const $toolBox = $('<div>').appendTo($parent);
    const bounds = this._getToolboxBounds($parent, isServerSide);
    this._toolbox = this._createComponent($toolBox, DiagramToolbox, {
      isMobileView: this.isMobileScreenSize(),
      isVisible: this._isToolboxVisible(),
      container: this.$element(),
      height: bounds.height,
      offsetParent: $parent,
      offsetX: bounds.offsetX,
      offsetY: bounds.offsetY,
      showSearch: this.option('toolbox.showSearch'),
      toolboxGroups: this._getToolboxGroups(),
      toolboxWidth: this.option('toolbox.width'),
      onShapeCategoryRendered: e => {
        if (isServerSide) return;
        this._diagramInstance.createToolbox(e.$element[0], e.displayMode === 'texts', e.shapes || e.category, {
          shapeIconSpacing: DIAGRAM_TOOLBOX_SHAPE_SPACING,
          shapeIconCountInRow: this.option('toolbox.shapeIconsPerRow'),
          shapeIconAttributes: {
            'data-toggle': e.dataToggle
          }
        });
      },
      onFilterChanged: e => {
        if (isServerSide) return;
        this._diagramInstance.applyToolboxFilter(e.text, e.filteringToolboxes);
      },
      onVisibilityChanging: e => {
        if (isServerSide) return;
        this._setCustomCommandChecked(DiagramCommandsManager.SHOW_TOOLBOX_COMMAND_NAME, e.visible);
        if (this._propertiesPanel) {
          if (e.visible && this.isMobileScreenSize()) {
            this._propertiesPanel.hide();
          }
        }
        if (this._historyToolbar) {
          if (e.visible && this.isMobileScreenSize()) {
            this._historyToolbarZIndex = zIndexPool.create(Overlay.baseZIndex());
            this._historyToolbar.$element().css('zIndex', this._historyToolbarZIndex);
            this._historyToolbar.$element().css('boxShadow', 'none');
          }
        }
        if (this._viewToolbar) {
          this._viewToolbar.$element().css('opacity', e.visible && this.isMobileScreenSize() ? '0' : '1');
          this._viewToolbar.$element().css('pointerEvents', e.visible && this.isMobileScreenSize() ? 'none' : '');
        }
      },
      onVisibilityChanged: e => {
        if (!e.visible && !this._textInputStarted) {
          this._captureFocus();
        }
        if (!isServerSide) {
          if (this._historyToolbar) {
            if (!e.visible && this.isMobileScreenSize() && this._historyToolbarZIndex) {
              zIndexPool.remove(this._historyToolbarZIndex);
              this._historyToolbar.$element().css('zIndex', '');
              this._historyToolbar.$element().css('boxShadow', '');
              this._historyToolbarZIndex = undefined;
            }
          }
        }
      },
      onPointerUp: this._onPanelPointerUp.bind(this)
    });
    (_this$_toolbox$_popup = this._toolbox._popup) === null || _this$_toolbox$_popup === void 0 || _this$_toolbox$_popup.option('propagateOutsideClick', !this.option('fullScreen'));
    this._toolboxResizeCallback = () => {
      var _this$_toolbox, _this$_toolbox2, _this$_toolbox4;
      const toolboxBounds = this._getToolboxBounds($parent, isServerSide);
      (_this$_toolbox = this._toolbox) === null || _this$_toolbox === void 0 || _this$_toolbox.option('height', toolboxBounds.height);
      const prevIsMobileView = (_this$_toolbox2 = this._toolbox) === null || _this$_toolbox2 === void 0 ? void 0 : _this$_toolbox2.option('isMobileView');
      // @ts-expect-error ts-error
      if (prevIsMobileView !== this.isMobileScreenSize()) {
        var _this$_toolbox3;
        (_this$_toolbox3 = this._toolbox) === null || _this$_toolbox3 === void 0 || _this$_toolbox3.option({
          isMobileView: this.isMobileScreenSize(),
          isVisible: this._isToolboxVisible()
        });
        this._setCustomCommandChecked(DiagramCommandsManager.SHOW_TOOLBOX_COMMAND_NAME, this._isToolboxVisible());
      }
      (_this$_toolbox4 = this._toolbox) === null || _this$_toolbox4 === void 0 || _this$_toolbox4.updateMaxHeight();
    };
  }
  _getToolboxBounds($parent, isServerSide) {
    const result = {
      offsetX: DIAGRAM_FLOATING_PANEL_OFFSET,
      offsetY: DIAGRAM_FLOATING_PANEL_OFFSET,
      height: !isServerSide ? getHeight($parent) - 2 * DIAGRAM_FLOATING_PANEL_OFFSET : 0
    };
    if (this._historyToolbar && !isServerSide) {
      result.offsetY += getOuterHeight(this._historyToolbar.$element()) + DIAGRAM_FLOATING_PANEL_OFFSET;
      result.height -= getOuterHeight(this._historyToolbar.$element()) + DIAGRAM_FLOATING_PANEL_OFFSET;
    }
    if (this._viewToolbar && !isServerSide) {
      result.height -= getOuterHeight(this._viewToolbar.$element()) + this._getViewToolbarYOffset(isServerSide);
    }
    return result;
  }
  _renderViewToolbar($parent) {
    const isServerSide = !hasWindow();
    const $container = $('<div>').addClass(DIAGRAM_FLOATING_TOOLBAR_CONTAINER_CLASS).appendTo($parent);
    this._viewToolbar = this._createComponent($container, DiagramViewToolbar, extend(this._getToolbarBaseOptions(), {
      commands: this.option('viewToolbar.commands'),
      locateInMenu: 'never'
    }));
    this._updateViewToolbarPosition($container, $parent, isServerSide);
    this._viewToolbarResizeCallback = () => {
      this._updateViewToolbarPosition($container, $parent, isServerSide);
    };
  }
  _getViewToolbarYOffset(isServerSide) {
    if (isServerSide) return undefined;
    let result = DIAGRAM_FLOATING_PANEL_OFFSET;
    if (this._viewToolbar && this._propertiesToolbar) {
      result += (getOuterHeight(this._propertiesToolbar.$element()) - getOuterHeight(this._viewToolbar.$element())) / 2;
    }
    return result;
  }
  _updateViewToolbarPosition($container, $parent, isServerSide) {
    if (isServerSide) return;
    positionUtils.setup($container, {
      my: 'left bottom',
      at: 'left bottom',
      of: $parent,
      offset: `${DIAGRAM_FLOATING_PANEL_OFFSET} -${this._getViewToolbarYOffset(isServerSide)}`
    });
  }
  _isPropertiesPanelEnabled() {
    const {
      propertiesPanel
    } = this.option();
    return (propertiesPanel === null || propertiesPanel === void 0 ? void 0 : propertiesPanel.visibility) !== 'disabled' && !this.isReadOnlyMode();
  }
  _isPropertiesPanelVisible() {
    const {
      propertiesPanel
    } = this.option();
    return (propertiesPanel === null || propertiesPanel === void 0 ? void 0 : propertiesPanel.visibility) === 'visible';
  }
  _renderPropertiesToolbar($parent) {
    const isServerSide = !hasWindow();
    const $container = $('<div>').addClass(DIAGRAM_FLOATING_TOOLBAR_CONTAINER_CLASS).addClass(DIAGRAM_PROPERTIES_PANEL_TOOLBAR_CONTAINER_CLASS).appendTo($parent);
    this._propertiesToolbar = this._createComponent($container, DiagramPropertiesToolbar, extend(this._getToolbarBaseOptions(), {
      buttonStylingMode: 'contained',
      buttonType: 'default',
      locateInMenu: 'never'
    }));
    this._updatePropertiesToolbarPosition($container, $parent, isServerSide);
    this._propertiesToolbarResizeCallback = () => {
      this._updatePropertiesToolbarPosition($container, $parent, isServerSide);
    };
  }
  _updatePropertiesToolbarPosition($container, $parent, isServerSide) {
    if (isServerSide) return;
    const offset = this.option('useNativeScrolling') ? DIAGRAM_PROPERTIES_PANEL_NS_OFFSET : DIAGRAM_FLOATING_PANEL_OFFSET;
    positionUtils.setup($container, {
      my: 'right bottom',
      at: 'right bottom',
      of: $parent,
      offset: `-${offset}px -${offset}px`
    });
  }
  _renderPropertiesPanel($parent) {
    var _this$_propertiesTool;
    const isServerSide = !hasWindow();
    const $propertiesPanel = $('<div>').appendTo($parent);
    const offset = this.option('useNativeScrolling') ? DIAGRAM_PROPERTIES_PANEL_NS_OFFSET : DIAGRAM_FLOATING_PANEL_OFFSET;
    const offsetX = offset;
    const offsetY = 2 * offset + (!isServerSide ? getOuterHeight((_this$_propertiesTool = this._propertiesToolbar) === null || _this$_propertiesTool === void 0 ? void 0 : _this$_propertiesTool.$element()) : 0);
    this._propertiesPanel = this._createComponent($propertiesPanel, DiagramPropertiesPanel, {
      isMobileView: this.isMobileScreenSize(),
      isVisible: this._isPropertiesPanelVisible(),
      container: this.$element(),
      offsetParent: $parent,
      offsetX,
      offsetY,
      propertyTabs: this.option('propertiesPanel.tabs'),
      onCreateToolbar: e => {
        e.toolbar = this._createComponent(e.$parent, DiagramToolbar, extend(this._getToolbarBaseOptions(), {
          commands: e.commands,
          locateInMenu: 'never',
          editorStylingMode: 'outlined'
        }));
      },
      onVisibilityChanging: e => {
        if (isServerSide) return;
        this._updatePropertiesPanelGroupBars(e.component);
        this._setCustomCommandChecked(DiagramCommandsManager.SHOW_PROPERTIES_PANEL_COMMAND_NAME, e.visible);
        if (this._toolbox) {
          if (e.visible && this.isMobileScreenSize()) {
            this._toolbox.hide();
          }
        }
      },
      onVisibilityChanged: e => {
        if (!e.visible && !this._textInputStarted) {
          this._captureFocus();
        }
      },
      onSelectedGroupChanged: _ref3 => {
        let {
          component
        } = _ref3;
        return this._updatePropertiesPanelGroupBars(component);
      },
      onPointerUp: this._onPanelPointerUp.bind(this)
    });
    this._propertiesPanelResizeCallback = () => {
      var _this$_propertiesPane;
      const prevIsMobileView = (_this$_propertiesPane = this._propertiesPanel) === null || _this$_propertiesPane === void 0 ? void 0 : _this$_propertiesPane.option('isMobileView');
      // @ts-expect-error ts-error
      if (prevIsMobileView !== this.isMobileScreenSize()) {
        var _this$_propertiesPane2;
        (_this$_propertiesPane2 = this._propertiesPanel) === null || _this$_propertiesPane2 === void 0 || _this$_propertiesPane2.option({
          isMobileView: this.isMobileScreenSize(),
          isVisible: this._isPropertiesPanelVisible()
        });
        this._setCustomCommandChecked(DiagramCommandsManager.SHOW_PROPERTIES_PANEL_COMMAND_NAME, this._isPropertiesPanelVisible());
      }
    };
  }
  _updatePropertiesPanelGroupBars(component) {
    var _component$getActiveT;
    (_component$getActiveT = component.getActiveToolbars()) === null || _component$getActiveT === void 0 || _component$getActiveT.forEach(toolbar => {
      this._diagramInstance.updateBarItemsState(toolbar.bar);
    });
  }
  _onPanelPointerUp() {
    this._captureFocusOnTimeout();
  }
  _renderContextMenu($parent) {
    const $contextMenu = $('<div>').appendTo($parent);
    this._contextMenu = this._createComponent($contextMenu, diagramContextMenuModule.DiagramContextMenuWrapper, {
      commands: this.option('contextMenu.commands'),
      // @ts-expect-error ts-error
      onContentReady: _ref4 => {
        let {
          component
        } = _ref4;
        return this._registerBar(component);
      },
      // eslint-disable-next-line @stylistic/max-len,@typescript-eslint/no-unsafe-return
      onVisibilityChanging: _ref5 => {
        let {
          component
        } = _ref5;
        return this._diagramInstance.updateBarItemsState(component.bar);
      },
      // @ts-expect-error ts-error
      onItemClick: itemData => this._onBeforeCommandExecuted(itemData.command),
      export: this.option('export'),
      // @ts-expect-error ts-error
      excludeCommands: this._getExcludeCommands(),
      onInternalCommand: this._onInternalCommand.bind(this),
      onCustomCommand: this._onCustomCommand.bind(this)
    });
  }
  _renderContextToolbox($parent) {
    const isServerSide = !hasWindow();
    const {
      contextToolbox = {}
    } = this.option();
    const {
      category,
      displayMode,
      shapes,
      width
    } = contextToolbox;
    const $contextToolbox = $('<div>').appendTo($parent);
    this._contextToolbox = this._createComponent($contextToolbox, DiagramContextToolbox, {
      toolboxWidth: width,
      onShown: e => {
        if (isServerSide) return;
        const $toolboxContainer = $(e.$element);
        let isTextGroup = displayMode === 'texts';
        if (!shapes && !category && !isTextGroup) {
          var _this$_getToolboxGrou;
          // @ts-expect-error ts-error
          const group = (_this$_getToolboxGrou = this._getToolboxGroups()) === null || _this$_getToolboxGrou === void 0 ? void 0 : _this$_getToolboxGrou.filter(g => g.category === e.category)[0];
          if (group) {
            isTextGroup = group.displayMode === 'texts';
          }
        }
        this._diagramInstance.createContextToolbox($toolboxContainer[0], isTextGroup,
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        shapes || category || e.category, {
          shapeIconSpacing: DIAGRAM_CONTEXT_TOOLBOX_SHAPE_SPACING,
          shapeIconCountInRow: this.option('contextToolbox.shapeIconsPerRow')
        }, shapeType => {
          e.callback(shapeType);
          this._captureFocus();
          e.hide();
        });
      }
    });
  }
  _setCustomCommandChecked(command, checked) {
    var _this$_toolbars2;
    (_this$_toolbars2 = this._toolbars) === null || _this$_toolbars2 === void 0 || _this$_toolbars2.forEach(tb => {
      tb.setCommandChecked(command, checked);
    });
  }
  _onBeforeCommandExecuted(command) {
    const dialogParameters = DiagramDialogManager.getDialogParameters(command);
    if (dialogParameters) {
      this._showDialog(dialogParameters);
    }
    return !!dialogParameters;
  }
  _renderDialog($parent) {
    const $dialogElement = $('<div>').appendTo($parent);
    this._dialogInstance = this._createComponent($dialogElement, DiagramDialog, {});
  }
  _showDialog(dialogParameters) {
    if (this._dialogInstance) {
      this._dialogInstance.option('onGetContent', dialogParameters.onGetContent);
      this._dialogInstance.option('onHidden', () => {
        this._captureFocus();
      });
      this._dialogInstance.option('command', this._diagramInstance.getCommand(dialogParameters.command));
      this._dialogInstance.option('title', dialogParameters.title);
      this._dialogInstance._show();
    }
  }
  _showLoadingIndicator() {
    this._loadingIndicator = $('<div>').addClass(DIAGRAM_LOADING_INDICATOR_CLASS);
    this._createComponent(this._loadingIndicator, LoadIndicator, {});
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const $parent = this._$content || this.$element();
    $parent.append(this._loadingIndicator);
  }
  _hideLoadingIndicator() {
    if (!this._loadingIndicator) return;
    this._loadingIndicator.remove();
    this._loadingIndicator = null;
  }
  _initDiagram() {
    const {
      DiagramControl
    } = getDiagram();
    this._diagramInstance = new DiagramControl();
    this._diagramInstance.onChanged = this._raiseDataChangeAction.bind(this);
    this._diagramInstance.onEdgeInserted = this._raiseEdgeInsertedAction.bind(this);
    this._diagramInstance.onEdgeUpdated = this._raiseEdgeUpdatedAction.bind(this);
    this._diagramInstance.onEdgeRemoved = this._raiseEdgeRemovedAction.bind(this);
    this._diagramInstance.onNodeInserted = this._raiseNodeInsertedAction.bind(this);
    this._diagramInstance.onNodeUpdated = this._raiseNodeUpdatedAction.bind(this);
    this._diagramInstance.onNodeRemoved = this._raiseNodeRemovedAction.bind(this);
    this._diagramInstance.onToolboxDragStart = this._raiseToolboxDragStart.bind(this);
    this._diagramInstance.onToolboxDragEnd = this._raiseToolboxDragEnd.bind(this);
    this._diagramInstance.onTextInputStart = this._raiseTextInputStart.bind(this);
    this._diagramInstance.onTextInputEnd = this._raiseTextInputEnd.bind(this);
    this._diagramInstance.onToggleFullscreen = this._onToggleFullScreen.bind(this);
    this._diagramInstance.onShowContextMenu = this._onShowContextMenu.bind(this);
    this._diagramInstance.onHideContextMenu = this._onHideContextMenu.bind(this);
    this._diagramInstance.onShowContextToolbox = this._onShowContextToolbox.bind(this);
    this._diagramInstance.onHideContextToolbox = this._onHideContextToolbox.bind(this);
    this._diagramInstance.onNativeAction.add({
      notifyItemClick: this._raiseItemClickAction.bind(this),
      notifyItemDblClick: this._raiseItemDblClickAction.bind(this),
      notifySelectionChanged: this._raiseSelectionChanged.bind(this)
    });
    this._diagramInstance.onRequestOperation = this._raiseRequestEditOperation.bind(this);
    this._updateEventSubscriptionMethods();
    this._updateDefaultItemProperties();
    this._updateEditingSettings();
    this._updateShapeTexts();
    this._updateUnitItems();
    this._updateFormatUnitsMethod();
    // @ts-expect-error ts-error
    if (this.option('units') !== DIAGRAM_DEFAULT_UNIT) {
      this._updateUnitsState();
    }
    if (this.isReadOnlyMode()) {
      this._updateReadOnlyState();
    }
    if (this.option('pageSize')) {
      if (this.option('pageSize.items')) {
        this._updatePageSizeItemsState();
      }
      if (this.option('pageSize.width') && this.option('pageSize.height')) {
        this._updatePageSizeState();
      }
    }
    // @ts-expect-error ts-error
    if (this.option('pageOrientation') !== DIAGRAM_DEFAULT_PAGE_ORIENTATION) {
      this._updatePageOrientationState();
    }
    // @ts-expect-error ts-error
    if (this.option('pageColor') !== DIAGRAM_DEFAULT_PAGE_COLOR) {
      this._updatePageColorState();
    }
    // @ts-expect-error ts-error
    if (this.option('viewUnits') !== DIAGRAM_DEFAULT_UNIT) {
      this._updateViewUnitsState();
    }
    if (!this.option('showGrid')) {
      this._updateShowGridState();
    }
    if (!this.option('snapToGrid')) {
      this._updateSnapToGridState();
    }
    if (this.option('gridSize')) {
      this._updateGridSizeState();
    }
    // @ts-expect-error ts-error
    if (this.option('zoomLevel') !== DIAGRAM_DEFAULT_ZOOMLEVEL) {
      this._updateZoomLevelState();
    }
    if (this.option('simpleView')) {
      this._updateSimpleViewState();
    }
    // @ts-expect-error ts-error
    if (this.option('autoZoomMode') !== DIAGRAM_DEFAULT_AUTOZOOM_MODE) {
      this._updateAutoZoomState();
    }
    if (this.option('fullScreen')) {
      const window = getWindow();
      if (window && window.self !== window.top) {
        this.option('fullScreen', false);
      } else {
        this._updateFullscreenState();
      }
    }
    this._createOptionsUpdateBar();
    if (hasWindow()) {
      // eslint-disable-next-line spellcheck/spell-checker
      this._diagramInstance.initMeasurer(this.$element()[0]);
    }
    this._updateCustomShapes(this._getCustomShapes());
    this._refreshDataSources();
  }
  _createOptionsUpdateBar() {
    if (!this.optionsUpdateBar) {
      this.optionsUpdateBar = new DiagramOptionsUpdateBar(this);
      this._diagramInstance.registerBar(this.optionsUpdateBar);
    }
  }
  _deleteOptionsUpdateBar() {
    delete this.optionsUpdateBar;
  }
  _clean() {
    if (this._diagramInstance) {
      this._diagramInstance.cleanMarkup(element => {
        $(element).empty();
      });
      this._deleteOptionsUpdateBar();
    }
    super._clean();
  }
  _dispose() {
    this._killCaptureFocusTimeout();
    super._dispose();
    if (this._diagramInstance) {
      this._diagramInstance.dispose();
      this._diagramInstance = undefined;
    }
  }
  _executeDiagramCommand(command, parameter) {
    this._diagramInstance.getCommand(command).execute(parameter);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getNodeDataSource() {
    var _this$_nodesOption;
    // @ts-expect-error ts-error
    return (_this$_nodesOption = this._nodesOption) === null || _this$_nodesOption === void 0 ? void 0 : _this$_nodesOption.getDataSource();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getEdgeDataSource() {
    var _this$_edgesOption;
    // @ts-expect-error ts-error
    return (_this$_edgesOption = this._edgesOption) === null || _this$_edgesOption === void 0 ? void 0 : _this$_edgesOption.getDataSource();
  }
  _refreshDataSources() {
    this._beginUpdateDiagram();
    this._refreshNodesDataSource();
    this._refreshEdgesDataSource();
    this._endUpdateDiagram();
  }
  _refreshNodesDataSource() {
    if (this._nodesOption) {
      // @ts-expect-error ts-error
      this._nodesOption._disposeDataSource();
      delete this._nodesOption;
    }
    if (this.option('nodes.dataSource')) {
      this._nodesOption = new NodesOption(this);
      // @ts-expect-error ts-error
      this._nodesOption.option('dataSource', this.option('nodes.dataSource'));
      // @ts-expect-error ts-error
      this._nodesOption._refreshDataSource();
    }
  }
  _refreshEdgesDataSource() {
    if (this._edgesOption) {
      // @ts-expect-error ts-error
      this._edgesOption._disposeDataSource();
      delete this._edgesOption;
    }
    if (this.option('edges.dataSource')) {
      this._edgesOption = new EdgesOption(this);
      // @ts-expect-error ts-error
      this._edgesOption.option('dataSource', this.option('edges.dataSource'));
      // @ts-expect-error ts-error
      this._edgesOption._refreshDataSource();
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getDiagramData() {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let value;
    const {
      DiagramCommand
    } = getDiagram();
    this._executeDiagramCommand(DiagramCommand.Export, data => {
      value = data;
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value;
  }
  _setDiagramData(data, keepExistingItems) {
    const {
      DiagramCommand
    } = getDiagram();
    this._executeDiagramCommand(DiagramCommand.Import, {
      data,
      keepExistingItems
    });
  }
  isReadOnlyMode() {
    // @ts-expect-error ts-error
    return this.option('readOnly') || this.option('disabled');
  }
  _onDataSourceChanged() {
    this._bindDiagramData();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getChangesKeys(changes) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return changes.map(change => {
      if (isDefined(change.internalKey)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return change.internalKey;
      }
      if (isDefined(change.key)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return change.key;
      }
      return null;
    }).filter(key => isDefined(key));
  }
  _createOptionGetter(optionName) {
    const expr = this.option(optionName);
    // @ts-expect-error ts-error
    return expr && compileGetter(expr);
  }
  _onRequestUpdateLayout(changes) {
    var _this$_requestLayoutU;
    if (!this._requestLayoutUpdateAction) {
      this._createRequestLayoutUpdateAction();
    }
    const eventArgs = {
      changes,
      allowed: false
    };
    (_this$_requestLayoutU = this._requestLayoutUpdateAction) === null || _this$_requestLayoutU === void 0 || _this$_requestLayoutU.call(this, eventArgs);
    return eventArgs.allowed;
  }
  _createOptionSetter(optionName) {
    const expr = this.option(optionName);
    if (isFunction(expr)) {
      return expr;
    }
    // @ts-expect-error ts-error
    return expr && compileSetter(expr);
  }
  _bindDiagramData() {
    var _this$_nodesOption2, _this$_edgesOption2;
    if (this._updateDiagramLockCount || !this._isBindingMode()) return;
    const {
      DiagramCommand,
      ConnectorLineOption,
      ConnectorLineEnding
    } = getDiagram();
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let lineOptionGetter;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let lineOptionSetter;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let startLineEndingGetter;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let startLineEndingSetter;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let endLineEndingGetter;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let endLineEndingSetter;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let containerChildrenGetter;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let containerChildrenSetter;
    const data = {
      nodeDataSource: (_this$_nodesOption2 = this._nodesOption) === null || _this$_nodesOption2 === void 0 ? void 0 : _this$_nodesOption2.getItems(),
      edgeDataSource: (_this$_edgesOption2 = this._edgesOption) === null || _this$_edgesOption2 === void 0 ? void 0 : _this$_edgesOption2.getItems(),
      nodeDataImporter: {
        getKey: this._createOptionGetter('nodes.keyExpr'),
        setKey: this._createOptionSetter('nodes.keyExpr'),
        getCustomData: this._createOptionGetter('nodes.customDataExpr'),
        setCustomData: this._createOptionSetter('nodes.customDataExpr'),
        getLocked: this._createOptionGetter('nodes.lockedExpr'),
        setLocked: this._createOptionSetter('nodes.lockedExpr'),
        getStyle: this._createOptionGetter('nodes.styleExpr'),
        setStyle: this._createOptionSetter('nodes.styleExpr'),
        getStyleText: this._createOptionGetter('nodes.textStyleExpr'),
        setStyleText: this._createOptionSetter('nodes.textStyleExpr'),
        getZIndex: this._createOptionGetter('nodes.zIndexExpr'),
        setZIndex: this._createOptionSetter('nodes.zIndexExpr'),
        getType: this._createOptionGetter('nodes.typeExpr'),
        setType: this._createOptionSetter('nodes.typeExpr'),
        getText: this._createOptionGetter('nodes.textExpr'),
        setText: this._createOptionSetter('nodes.textExpr'),
        getImage: this._createOptionGetter('nodes.imageUrlExpr'),
        setImage: this._createOptionSetter('nodes.imageUrlExpr'),
        getLeft: this._createOptionGetter('nodes.leftExpr'),
        setLeft: this._createOptionSetter('nodes.leftExpr'),
        getTop: this._createOptionGetter('nodes.topExpr'),
        setTop: this._createOptionSetter('nodes.topExpr'),
        getWidth: this._createOptionGetter('nodes.widthExpr'),
        setWidth: this._createOptionSetter('nodes.widthExpr'),
        getHeight: this._createOptionGetter('nodes.heightExpr'),
        setHeight: this._createOptionSetter('nodes.heightExpr'),
        getParentKey: this._createOptionGetter('nodes.parentKeyExpr'),
        setParentKey: this._createOptionSetter('nodes.parentKeyExpr'),
        getItems: this._createOptionGetter('nodes.itemsExpr'),
        setItems: this._createOptionSetter('nodes.itemsExpr'),
        getChildren: containerChildrenGetter = this._createOptionGetter('nodes.containerChildrenExpr'),
        setChildren: containerChildrenSetter = this._createOptionSetter('nodes.containerChildrenExpr'),
        getContainerKey: !containerChildrenGetter && !containerChildrenSetter && this._createOptionGetter('nodes.containerKeyExpr'),
        setContainerKey: !containerChildrenGetter && !containerChildrenSetter && this._createOptionSetter('nodes.containerKeyExpr')
      },
      edgeDataImporter: {
        getKey: this._createOptionGetter('edges.keyExpr'),
        setKey: this._createOptionSetter('edges.keyExpr'),
        getCustomData: this._createOptionGetter('edges.customDataExpr'),
        setCustomData: this._createOptionSetter('edges.customDataExpr'),
        getLocked: this._createOptionGetter('edges.lockedExpr'),
        setLocked: this._createOptionSetter('edges.lockedExpr'),
        getStyle: this._createOptionGetter('edges.styleExpr'),
        setStyle: this._createOptionSetter('edges.styleExpr'),
        getStyleText: this._createOptionGetter('edges.textStyleExpr'),
        setStyleText: this._createOptionSetter('edges.textStyleExpr'),
        getZIndex: this._createOptionGetter('edges.zIndexExpr'),
        setZIndex: this._createOptionSetter('edges.zIndexExpr'),
        getFrom: this._createOptionGetter('edges.fromExpr'),
        setFrom: this._createOptionSetter('edges.fromExpr'),
        getFromPointIndex: this._createOptionGetter('edges.fromPointIndexExpr'),
        setFromPointIndex: this._createOptionSetter('edges.fromPointIndexExpr'),
        getTo: this._createOptionGetter('edges.toExpr'),
        setTo: this._createOptionSetter('edges.toExpr'),
        getToPointIndex: this._createOptionGetter('edges.toPointIndexExpr'),
        setToPointIndex: this._createOptionSetter('edges.toPointIndexExpr'),
        getPoints: this._createOptionGetter('edges.pointsExpr'),
        setPoints: this._createOptionSetter('edges.pointsExpr'),
        getText: this._createOptionGetter('edges.textExpr'),
        setText: this._createOptionSetter('edges.textExpr'),
        getLineOption: (lineOptionGetter = this._createOptionGetter('edges.lineTypeExpr')) && (obj => {
          const lineType = lineOptionGetter(obj);
          return this._getConnectorLineOption(lineType);
        }),
        setLineOption: (lineOptionSetter = this._createOptionSetter('edges.lineTypeExpr')) && ((obj, value) => {
          switch (value) {
            case ConnectorLineOption.Straight:
              // eslint-disable-next-line no-param-reassign
              value = 'straight';
              break;
            case ConnectorLineOption.Orthogonal:
              // eslint-disable-next-line no-param-reassign
              value = 'orthogonal';
              break;
            default:
              break;
          }
          lineOptionSetter(obj, value);
        }),
        getStartLineEnding: (startLineEndingGetter = this._createOptionGetter('edges.fromLineEndExpr')) && (obj => {
          const lineEnd = startLineEndingGetter(obj);
          return this._getConnectorLineEnding(lineEnd);
        }),
        setStartLineEnding: (startLineEndingSetter = this._createOptionSetter('edges.fromLineEndExpr')) && ((obj, value) => {
          switch (value) {
            case ConnectorLineEnding.Arrow:
              // eslint-disable-next-line no-param-reassign
              value = 'arrow';
              break;
            case ConnectorLineEnding.OutlinedTriangle:
              // eslint-disable-next-line no-param-reassign
              value = 'outlinedTriangle';
              break;
            case ConnectorLineEnding.FilledTriangle:
              // eslint-disable-next-line no-param-reassign
              value = 'filledTriangle';
              break;
            case ConnectorLineEnding.None:
              // eslint-disable-next-line no-param-reassign
              value = 'none';
              break;
            default:
              break;
          }
          startLineEndingSetter(obj, value);
        }),
        getEndLineEnding: (endLineEndingGetter = this._createOptionGetter('edges.toLineEndExpr')) && (obj => {
          const lineEnd = endLineEndingGetter(obj);
          return this._getConnectorLineEnding(lineEnd);
        }),
        setEndLineEnding: (endLineEndingSetter = this._createOptionSetter('edges.toLineEndExpr')) && ((obj, value) => {
          switch (value) {
            case ConnectorLineEnding.Arrow:
              // eslint-disable-next-line no-param-reassign
              value = 'arrow';
              break;
            case ConnectorLineEnding.OutlinedTriangle:
              // eslint-disable-next-line no-param-reassign
              value = 'outlinedTriangle';
              break;
            case ConnectorLineEnding.FilledTriangle:
              // eslint-disable-next-line no-param-reassign
              value = 'filledTriangle';
              break;
            case ConnectorLineEnding.None:
              // eslint-disable-next-line no-param-reassign
              value = 'none';
              break;
            default:
              break;
          }
          endLineEndingSetter(obj, value);
        })
      },
      layoutParameters: this._getDataBindingLayoutParameters()
    };
    if (data.nodeDataSource) {
      this._executeDiagramCommand(DiagramCommand.BindDocument, data);
    }
  }
  _reloadContentByChanges(changes, isExternalChanges) {
    const keys = this._getChangesKeys(changes);
    const applyLayout = this._onRequestUpdateLayout(changes);
    this._reloadContent(keys, applyLayout, isExternalChanges);
  }
  _reloadContent(itemKeys, applyLayout, isExternalChanges) {
    const getData = () => {
      var _this$_nodesOption3, _this$_edgesOption3;
      if (!isExternalChanges) {
        return {};
      }
      return {
        nodeDataSource: (_this$_nodesOption3 = this._nodesOption) === null || _this$_nodesOption3 === void 0 ? void 0 : _this$_nodesOption3.getItems(),
        edgeDataSource: (_this$_edgesOption3 = this._edgesOption) === null || _this$_edgesOption3 === void 0 ? void 0 : _this$_edgesOption3.getItems()
      };
    };
    this._diagramInstance.reloadContent(itemKeys, getData, applyLayout && this._getDataBindingLayoutParameters(), isExternalChanges);
  }
  _getConnectorLineOption(lineType) {
    const {
      ConnectorLineOption
    } = getDiagram();
    switch (lineType) {
      case 'straight':
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return ConnectorLineOption.Straight;
      default:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return ConnectorLineOption.Orthogonal;
    }
  }
  _getConnectorLineEnding(lineEnd) {
    const {
      ConnectorLineEnding
    } = getDiagram();
    switch (lineEnd) {
      case 'arrow':
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return ConnectorLineEnding.Arrow;
      case 'outlinedTriangle':
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return ConnectorLineEnding.OutlinedTriangle;
      case 'filledTriangle':
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return ConnectorLineEnding.FilledTriangle;
      default:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return ConnectorLineEnding.None;
    }
  }
  _getDataBindingLayoutParameters() {
    const {
      DataLayoutType,
      DataLayoutOrientation
    } = getDiagram();
    const {
      nodes
    } = this.option();
    const layoutParametersOption = (nodes === null || nodes === void 0 ? void 0 : nodes.autoLayout) ?? 'off';
    // @ts-expect-error ts-error
    const layoutType = (layoutParametersOption === null || layoutParametersOption === void 0 ? void 0 : layoutParametersOption.type) || layoutParametersOption;
    const parameters = {};
    if (layoutType !== 'off' && (layoutType !== 'auto' || !this._hasNodePositionExprs())) {
      switch (layoutType) {
        case 'tree':
          parameters.type = DataLayoutType.Tree;
          break;
        default:
          parameters.type = DataLayoutType.Sugiyama;
          break;
      }
      if (typeof layoutParametersOption === 'object') {
        switch (layoutParametersOption.orientation) {
          case 'vertical':
            parameters.orientation = DataLayoutOrientation.Vertical;
            break;
          case 'horizontal':
            parameters.orientation = DataLayoutOrientation.Horizontal;
            break;
          default:
            break;
        }
      }
      if (this.option('edges.fromPointIndexExpr') || this.option('edges.toPointIndexExpr')) {
        parameters.skipPointIndices = true;
      }
    }
    parameters.autoSizeEnabled = !!this.option('nodes.autoSizeEnabled');
    return parameters;
  }
  _hasNodePositionExprs() {
    const {
      nodes
    } = this.option();
    return !!(nodes !== null && nodes !== void 0 && nodes.topExpr) && !!(nodes !== null && nodes !== void 0 && nodes.leftExpr);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getAutoZoomValue(option) {
    const {
      AutoZoomMode
    } = getDiagram();
    switch (option) {
      case 'fitContent':
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return AutoZoomMode.FitContent;
      case 'fitWidth':
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return AutoZoomMode.FitToWidth;
      default:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return AutoZoomMode.Disabled;
    }
  }
  _isBindingMode() {
    var _this$_nodesOption4, _this$_edgesOption4;
    // eslint-disable-next-line
    return ((_this$_nodesOption4 = this._nodesOption) === null || _this$_nodesOption4 === void 0 ? void 0 : _this$_nodesOption4.hasItems()) || ((_this$_edgesOption4 = this._edgesOption) === null || _this$_edgesOption4 === void 0 ? void 0 : _this$_edgesOption4.hasItems());
  }
  _beginUpdateDiagram() {
    this._updateDiagramLockCount += 1;
  }
  _endUpdateDiagram() {
    this._updateDiagramLockCount = Math.max(this._updateDiagramLockCount - 1, 0);
    if (!this._updateDiagramLockCount) {
      this._bindDiagramData();
    }
  }
  _getCustomShapes() {
    const {
      customShapes
    } = this.option();
    return customShapes ?? [];
  }
  _getToolboxGroups() {
    const {
      toolbox
    } = this.option();
    // @ts-expect-error ts-error
    return DiagramToolboxManager.getGroups(toolbox === null || toolbox === void 0 ? void 0 : toolbox.groups);
  }
  _updateAllCustomShapes() {
    this._diagramInstance.removeAllCustomShapes();
    this._updateCustomShapes(this._getCustomShapes());
  }
  _updateCustomShapes(customShapes, prevCustomShapes) {
    if (Array.isArray(prevCustomShapes)) {
      this._diagramInstance.removeCustomShapes(prevCustomShapes.map(s => s.type));
    }
    if (Array.isArray(customShapes)) {
      this._diagramInstance.addCustomShapes(customShapes.map(s => {
        var _s$connectionPoints;
        const templateOption = s.template ?? this.option('customShapeTemplate');
        const template = templateOption && this._getTemplate(templateOption);
        const toolboxTemplateOption = s.toolboxTemplate ?? this.option('customShapeToolboxTemplate');
        const toolboxTemplate = toolboxTemplateOption && this._getTemplate(toolboxTemplateOption);
        return {
          category: s.category,
          type: s.type,
          baseType: s.baseType,
          title: s.title,
          svgUrl: s.backgroundImageUrl,
          svgToolboxUrl: s.backgroundImageToolboxUrl,
          svgLeft: s.backgroundImageLeft,
          svgTop: s.backgroundImageTop,
          svgWidth: s.backgroundImageWidth,
          svgHeight: s.backgroundImageHeight,
          defaultWidth: s.defaultWidth,
          defaultHeight: s.defaultHeight,
          toolboxWidthToHeightRatio: s.toolboxWidthToHeightRatio,
          minWidth: s.minWidth,
          minHeight: s.minHeight,
          maxWidth: s.maxWidth,
          maxHeight: s.maxHeight,
          allowResize: s.allowResize,
          defaultText: s.defaultText,
          allowEditText: s.allowEditText,
          textLeft: s.textLeft,
          textTop: s.textTop,
          textWidth: s.textWidth,
          textHeight: s.textHeight,
          defaultImageUrl: s.defaultImageUrl,
          allowEditImage: s.allowEditImage,
          imageLeft: s.imageLeft,
          imageTop: s.imageTop,
          imageWidth: s.imageWidth,
          imageHeight: s.imageHeight,
          connectionPoints: (_s$connectionPoints = s.connectionPoints) === null || _s$connectionPoints === void 0 ? void 0 : _s$connectionPoints.map(pt => ({
            x: pt.x,
            y: pt.y
          })),
          createTemplate: template && ((container, item) => {
            template.render({
              model: this._nativeItemToDiagramItem(item),
              container: getPublicElement($(container))
            });
          }),
          createToolboxTemplate: toolboxTemplate && ((container, item) => {
            toolboxTemplate.render({
              model: this._nativeItemToDiagramItem(item),
              container: getPublicElement($(container))
            });
          }),
          destroyTemplate: template && (container => {
            $(container).empty();
          }),
          templateLeft: s.templateLeft,
          templateTop: s.templateTop,
          templateWidth: s.templateWidth,
          templateHeight: s.templateHeight,
          keepRatioOnAutoSize: s.keepRatioOnAutoSize
        };
      }));
    }
  }
  _getViewport() {
    const $viewPort = this.$element().closest('.dx-viewport');
    return $viewPort.length ? $viewPort : $('body');
  }
  _onToggleFullScreen(fullScreen) {
    if (this.toggleFullscreenLock > 0) return;
    this._changeNativeFullscreen(fullScreen);
    if (fullScreen) {
      this._prevParent = this.$element().parent();
      this._prevFullScreenZIndex = this.$element().css('zIndex');
      this._fullScreenZIndex = zIndexPool.create(Overlay.baseZIndex());
      this.$element().css('zIndex', this._fullScreenZIndex);
      this.$element().appendTo(this._getViewport());
    } else {
      this.$element().appendTo(this._prevParent);
      if (this._fullScreenZIndex) {
        zIndexPool.remove(this._fullScreenZIndex);
        this.$element().css('zIndex', this._prevFullScreenZIndex);
      }
    }
    this.$element().toggleClass(DIAGRAM_FULLSCREEN_CLASS, fullScreen);
    this._processDiagramResize();
    if (this._toolbox) {
      var _this$_toolbox$_popup2;
      this._toolbox.repaint();
      (_this$_toolbox$_popup2 = this._toolbox._popup) === null || _this$_toolbox$_popup2 === void 0 || _this$_toolbox$_popup2.option('propagateOutsideClick', !fullScreen);
    }
    if (this._propertiesPanel) {
      this._propertiesPanel.repaint();
    }
    if (this._historyToolbar) {
      this._updateHistoryToolbarPosition();
    }
  }
  _changeNativeFullscreen(setModeOn) {
    const window = getWindow();
    if (window.self === window.top || setModeOn === this._inNativeFullscreen()) return;
    if (setModeOn) {
      this._subscribeFullscreenNativeChanged();
    } else {
      this._unsubscribeFullscreenNativeChanged();
    }
    this._setNativeFullscreen(setModeOn);
  }
  _setNativeFullscreen(on) {
    const window = getWindow();
    const {
      document
    } = window.self;
    const {
      body
    } = window.self.document;
    if (on) {
      if (body.requestFullscreen) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        body.requestFullscreen();
      }
    } else if (document.exitFullscreen) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      document.exitFullscreen();
    }
  }
  _inNativeFullscreen() {
    const {
      document
    } = getWindow();
    return document.fullscreenElement === document.body;
  }
  _subscribeFullscreenNativeChanged() {
    const {
      document
    } = getWindow();
    const handler = this._onNativeFullscreenChangeHandler.bind(this);
    eventsEngine.on(document, FULLSCREEN_CHANGE_EVENT_NAME, handler);
    eventsEngine.on(document, IE_FULLSCREEN_CHANGE_EVENT_NAME, handler);
    eventsEngine.on(document, WEBKIT_FULLSCREEN_CHANGE_EVENT_NAME, handler);
    eventsEngine.on(document, MOZ_FULLSCREEN_CHANGE_EVENT_NAME, handler);
  }
  _unsubscribeFullscreenNativeChanged() {
    const {
      document
    } = getWindow();
    eventsEngine.off(document, FULLSCREEN_CHANGE_EVENT_NAME);
    eventsEngine.off(document, IE_FULLSCREEN_CHANGE_EVENT_NAME);
    eventsEngine.off(document, WEBKIT_FULLSCREEN_CHANGE_EVENT_NAME);
    eventsEngine.off(document, MOZ_FULLSCREEN_CHANGE_EVENT_NAME);
  }
  _onNativeFullscreenChangeHandler() {
    if (!this._inNativeFullscreen()) {
      this._unsubscribeFullscreenNativeChanged();
      this.option('fullScreen', false);
    }
  }
  _executeDiagramFullscreenCommand(fullscreen) {
    const {
      DiagramCommand
    } = getDiagram();
    this.toggleFullscreenLock += 1;
    this._executeDiagramCommand(DiagramCommand.Fullscreen, fullscreen);
    this.toggleFullscreenLock -= 1;
  }
  _onShowContextMenu(x, y, selection) {
    if (this._contextMenu) {
      this._contextMenu._show(x, y, selection);
    }
  }
  _onHideContextMenu() {
    if (this._contextMenu) {
      this._contextMenu._hide();
    }
  }
  _onShowContextToolbox(x, y, side, category, callback) {
    if (this._contextToolbox) {
      this._contextToolbox._show(x, y, side, category, callback);
    }
  }
  _onHideContextToolbox() {
    if (this._contextToolbox) {
      this._contextToolbox._hide();
    }
  }
  _getDiagramUnitValue(value) {
    const {
      DiagramUnit
    } = getDiagram();
    switch (value) {
      case 'in':
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return DiagramUnit.In;
      case 'cm':
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return DiagramUnit.Cm;
      case 'px':
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return DiagramUnit.Px;
      default:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return DiagramUnit.In;
    }
  }
  _updateReadOnlyState() {
    const {
      DiagramCommand
    } = getDiagram();
    const readOnly = this.isReadOnlyMode();
    this._executeDiagramCommand(DiagramCommand.ToggleReadOnly, readOnly);
  }
  _updateZoomLevelState() {
    if (this.option('zoomLevel.items')) {
      this._updateZoomLevelItemsState();
      const zoomLevel = this.option('zoomLevel.value');
      if (!zoomLevel) return;
      const {
        DiagramCommand
      } = getDiagram();
      this._executeDiagramCommand(DiagramCommand.ZoomLevel, zoomLevel);
    } else {
      const zoomLevel = this.option('zoomLevel.value') || this.option('zoomLevel');
      if (!zoomLevel) return;
      const {
        DiagramCommand
      } = getDiagram();
      this._executeDiagramCommand(DiagramCommand.ZoomLevel, zoomLevel);
    }
  }
  _updateZoomLevelItemsState() {
    const zoomLevelItems = this.option('zoomLevel.items');
    if (!Array.isArray(zoomLevelItems)) return;
    const {
      DiagramCommand
    } = getDiagram();
    this._executeDiagramCommand(DiagramCommand.ZoomLevelItems, zoomLevelItems);
  }
  _updateAutoZoomState() {
    const {
      DiagramCommand
    } = getDiagram();
    this._executeDiagramCommand(DiagramCommand.SwitchAutoZoom, this._getAutoZoomValue(this.option('autoZoomMode')));
  }
  _updateSimpleViewState() {
    const {
      DiagramCommand
    } = getDiagram();
    this._executeDiagramCommand(DiagramCommand.ToggleSimpleView, this.option('simpleView'));
  }
  _updateFullscreenState() {
    const {
      fullScreen
    } = this.option();
    this._executeDiagramFullscreenCommand(fullScreen);
    this._onToggleFullScreen(fullScreen);
  }
  _updateShowGridState() {
    const {
      DiagramCommand
    } = getDiagram();
    this._executeDiagramCommand(DiagramCommand.ShowGrid, this.option('showGrid'));
  }
  _updateSnapToGridState() {
    const {
      DiagramCommand
    } = getDiagram();
    this._executeDiagramCommand(DiagramCommand.SnapToGrid, this.option('snapToGrid'));
  }
  _updateGridSizeState() {
    if (this.option('gridSize.items')) {
      this._updateGridSizeItemsState();
      const gridSize = this.option('gridSize.value');
      if (!gridSize) return;
      const {
        DiagramCommand
      } = getDiagram();
      this._executeDiagramCommand(DiagramCommand.GridSize, gridSize);
    } else {
      const gridSize = this.option('gridSize.value') || this.option('gridSize');
      if (!gridSize) return;
      const {
        DiagramCommand
      } = getDiagram();
      this._executeDiagramCommand(DiagramCommand.GridSize, gridSize);
    }
  }
  _updateGridSizeItemsState() {
    const gridSizeItems = this.option('gridSize.items');
    if (!Array.isArray(gridSizeItems)) return;
    const {
      DiagramCommand
    } = getDiagram();
    this._executeDiagramCommand(DiagramCommand.GridSizeItems, gridSizeItems);
  }
  _updateUnitItems() {
    const {
      DiagramLocalizationService
    } = getDiagram();
    const items = this._getUnitItems();
    if (this._unitItems !== items) {
      this._unitItems = items;
      DiagramLocalizationService.unitItems = items;
    }
  }
  _getUnitItems() {
    const {
      DiagramUnit
    } = getDiagram();
    // @ts-expect-error ts-error
    return {
      [DiagramUnit.In]: messageLocalization.format('dxDiagram-unitIn'),
      [DiagramUnit.Cm]: messageLocalization.format('dxDiagram-unitCm'),
      [DiagramUnit.Px]: messageLocalization.format('dxDiagram-unitPx')
    };
  }
  _updateFormatUnitsMethod() {
    const {
      DiagramLocalizationService
    } = getDiagram();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    DiagramLocalizationService.formatUnit = value => numberLocalization.format(value);
  }
  _updateViewUnitsState() {
    const {
      DiagramCommand
    } = getDiagram();
    this._executeDiagramCommand(DiagramCommand.ViewUnits, this._getDiagramUnitValue(this.option('viewUnits')));
  }
  _updateUnitsState() {
    const {
      DiagramCommand
    } = getDiagram();
    this._executeDiagramCommand(DiagramCommand.Units, this._getDiagramUnitValue(this.option('units')));
  }
  _updatePageSizeState() {
    const pageSize = this.option('pageSize');
    if (!(pageSize !== null && pageSize !== void 0 && pageSize.width) || !(pageSize !== null && pageSize !== void 0 && pageSize.height)) return;
    const {
      DiagramCommand
    } = getDiagram();
    this._executeDiagramCommand(DiagramCommand.PageSize, pageSize);
  }
  _updatePageSizeItemsState() {
    const pageSizeItems = this.option('pageSize.items');
    if (!Array.isArray(pageSizeItems)) return;
    const {
      DiagramCommand
    } = getDiagram();
    this._executeDiagramCommand(DiagramCommand.PageSizeItems, pageSizeItems);
  }
  _updatePageOrientationState() {
    const {
      DiagramCommand
    } = getDiagram();
    const {
      pageOrientation
    } = this.option();
    this._executeDiagramCommand(DiagramCommand.PageLandscape, pageOrientation === 'landscape');
  }
  _updatePageColorState() {
    const {
      DiagramCommand
    } = getDiagram();
    this._executeDiagramCommand(DiagramCommand.PageColor, this.option('pageColor'));
  }
  _updateShapeTexts() {
    const {
      DiagramLocalizationService
    } = getDiagram();
    const texts = this._getShapeTexts();
    if (this._shapeTexts !== texts) {
      this._shapeTexts = texts;
      DiagramLocalizationService.shapeTexts = texts;
    }
  }
  _getShapeTexts() {
    const {
      ShapeTypes
    } = getDiagram();
    // @ts-expect-error ts-error
    return {
      // Standard
      [ShapeTypes.Text]: messageLocalization.format('dxDiagram-shapeText'),
      [ShapeTypes.Rectangle]: messageLocalization.format('dxDiagram-shapeRectangle'),
      [ShapeTypes.Ellipse]: messageLocalization.format('dxDiagram-shapeEllipse'),
      [ShapeTypes.Cross]: messageLocalization.format('dxDiagram-shapeCross'),
      [ShapeTypes.Triangle]: messageLocalization.format('dxDiagram-shapeTriangle'),
      [ShapeTypes.Diamond]: messageLocalization.format('dxDiagram-shapeDiamond'),
      [ShapeTypes.Heart]: messageLocalization.format('dxDiagram-shapeHeart'),
      [ShapeTypes.Pentagon]: messageLocalization.format('dxDiagram-shapePentagon'),
      [ShapeTypes.Hexagon]: messageLocalization.format('dxDiagram-shapeHexagon'),
      [ShapeTypes.Octagon]: messageLocalization.format('dxDiagram-shapeOctagon'),
      [ShapeTypes.Star]: messageLocalization.format('dxDiagram-shapeStar'),
      [ShapeTypes.ArrowLeft]: messageLocalization.format('dxDiagram-shapeArrowLeft'),
      [ShapeTypes.ArrowUp]: messageLocalization.format('dxDiagram-shapeArrowUp'),
      [ShapeTypes.ArrowRight]: messageLocalization.format('dxDiagram-shapeArrowRight'),
      [ShapeTypes.ArrowDown]: messageLocalization.format('dxDiagram-shapeArrowDown'),
      [ShapeTypes.ArrowUpDown]: messageLocalization.format('dxDiagram-shapeArrowUpDown'),
      [ShapeTypes.ArrowLeftRight]: messageLocalization.format('dxDiagram-shapeArrowLeftRight'),
      // Flowchart
      [ShapeTypes.Process]: messageLocalization.format('dxDiagram-shapeProcess'),
      [ShapeTypes.Decision]: messageLocalization.format('dxDiagram-shapeDecision'),
      [ShapeTypes.Terminator]: messageLocalization.format('dxDiagram-shapeTerminator'),
      [ShapeTypes.PredefinedProcess]: messageLocalization.format('dxDiagram-shapePredefinedProcess'),
      [ShapeTypes.Document]: messageLocalization.format('dxDiagram-shapeDocument'),
      [ShapeTypes.MultipleDocuments]: messageLocalization.format('dxDiagram-shapeMultipleDocuments'),
      [ShapeTypes.ManualInput]: messageLocalization.format('dxDiagram-shapeManualInput'),
      [ShapeTypes.Preparation]: messageLocalization.format('dxDiagram-shapePreparation'),
      [ShapeTypes.Data]: messageLocalization.format('dxDiagram-shapeData'),
      [ShapeTypes.Database]: messageLocalization.format('dxDiagram-shapeDatabase'),
      [ShapeTypes.HardDisk]: messageLocalization.format('dxDiagram-shapeHardDisk'),
      [ShapeTypes.InternalStorage]: messageLocalization.format('dxDiagram-shapeInternalStorage'),
      [ShapeTypes.PaperTape]: messageLocalization.format('dxDiagram-shapePaperTape'),
      [ShapeTypes.ManualOperation]: messageLocalization.format('dxDiagram-shapeManualOperation'),
      [ShapeTypes.Delay]: messageLocalization.format('dxDiagram-shapeDelay'),
      [ShapeTypes.StoredData]: messageLocalization.format('dxDiagram-shapeStoredData'),
      [ShapeTypes.Display]: messageLocalization.format('dxDiagram-shapeDisplay'),
      [ShapeTypes.Merge]: messageLocalization.format('dxDiagram-shapeMerge'),
      [ShapeTypes.Connector]: messageLocalization.format('dxDiagram-shapeConnector'),
      [ShapeTypes.Or]: messageLocalization.format('dxDiagram-shapeOr'),
      [ShapeTypes.SummingJunction]: messageLocalization.format('dxDiagram-shapeSummingJunction'),
      // Containers
      [ShapeTypes.Container]: messageLocalization.format('dxDiagram-shapeContainerDefaultText'),
      [ShapeTypes.VerticalContainer]: messageLocalization.format('dxDiagram-shapeVerticalContainer'),
      [ShapeTypes.HorizontalContainer]: messageLocalization.format('dxDiagram-shapeHorizontalContainer'),
      // Shapes with images
      [ShapeTypes.Card]: messageLocalization.format('dxDiagram-shapeCardDefaultText'),
      [ShapeTypes.CardWithImageOnLeft]: messageLocalization.format('dxDiagram-shapeCardWithImageOnLeft'),
      [ShapeTypes.CardWithImageOnTop]: messageLocalization.format('dxDiagram-shapeCardWithImageOnTop'),
      [ShapeTypes.CardWithImageOnRight]: messageLocalization.format('dxDiagram-shapeCardWithImageOnRight')
    };
  }
  _updateEventSubscriptionMethods() {
    const {
      RenderHelper
    } = getDiagram();
    RenderHelper.addEventListener = (element, eventName, handler) => {
      eventsEngine.on(element, eventName, handler);
    };
    RenderHelper.removeEventListener = (element, eventName, handler) => {
      eventsEngine.off(element, eventName, handler);
    };
  }
  _updateDefaultItemProperties() {
    if (this.option('defaultItemProperties.style')) {
      this._diagramInstance.setInitialStyleProperties(this.option('defaultItemProperties.style'));
    }
    if (this.option('defaultItemProperties.textStyle')) {
      this._diagramInstance.setInitialTextStyleProperties(this.option('defaultItemProperties.textStyle'));
    }
    this._diagramInstance.setInitialConnectorProperties({
      lineOption: this._getConnectorLineOption(
      // @ts-expect-error ts-error
      this.option('defaultItemProperties.connectorLineType')),
      startLineEnding: this._getConnectorLineEnding(
      // @ts-expect-error ts-error
      this.option('defaultItemProperties.connectorLineStart')),
      endLineEnding: this._getConnectorLineEnding(
      // @ts-expect-error ts-error
      this.option('defaultItemProperties.connectorLineEnd'))
    });
    this._diagramInstance.applyShapeSizeSettings({
      shapeMinWidth: this.option('defaultItemProperties.shapeMinWidth'),
      shapeMaxWidth: this.option('defaultItemProperties.shapeMaxWidth'),
      shapeMinHeight: this.option('defaultItemProperties.shapeMinHeight'),
      shapeMaxHeight: this.option('defaultItemProperties.shapeMaxHeight')
    });
  }
  _updateEditingSettings() {
    this._diagramInstance.applyOperationSettings({
      addShape: this.option('editing.allowAddShape'),
      addShapeFromToolbox: this.option('editing.allowAddShape'),
      deleteShape: this.option('editing.allowDeleteShape'),
      deleteConnector: this.option('editing.allowDeleteConnector'),
      changeConnection: this.option('editing.allowChangeConnection'),
      changeConnectorPoints: this.option('editing.allowChangeConnectorPoints'),
      changeShapeText: this.option('editing.allowChangeShapeText'),
      changeConnectorText: this.option('editing.allowChangeConnectorText'),
      resizeShape: this.option('editing.allowResizeShape'),
      moveShape: this.option('editing.allowMoveShape')
    });
  }
  fitToContent() {
    const {
      DiagramCommand
    } = getDiagram();
    this._executeDiagramCommand(DiagramCommand.FitToScreen);
  }
  fitToWidth() {
    const {
      DiagramCommand
    } = getDiagram();
    this._executeDiagramCommand(DiagramCommand.FitToWidth);
  }
  focus() {
    this._captureFocus();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  export() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._getDiagramData();
  }
  exportTo(format, callback) {
    const command = this._getDiagramExportToCommand(format);
    this._executeDiagramCommand(command, callback);
  }
  _getDiagramExportToCommand(format) {
    const {
      DiagramCommand
    } = getDiagram();
    switch (format) {
      case 'png':
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return DiagramCommand.ExportPng;
      case 'jpg':
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return DiagramCommand.ExportJpg;
      default:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return DiagramCommand.ExportSvg;
    }
  }
  import(data, updateExistingItemsOnly) {
    this._setDiagramData(data, updateExistingItemsOnly);
    this._raiseDataChangeAction();
  }
  updateToolbox() {
    var _this$_diagramInstanc;
    (_this$_diagramInstanc = this._diagramInstance) === null || _this$_diagramInstanc === void 0 || _this$_diagramInstanc.refreshToolbox();
    if (this._toolbox) {
      this._toolbox.updateTooltips();
      this._toolbox.updateFilter();
      this._toolbox.updateMaxHeight();
    }
  }
  _getDefaultOptions() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return extend(super._getDefaultOptions(), {
      readOnly: false,
      zoomLevel: DIAGRAM_DEFAULT_ZOOMLEVEL,
      simpleView: false,
      autoZoomMode: DIAGRAM_DEFAULT_AUTOZOOM_MODE,
      fullScreen: false,
      showGrid: true,
      snapToGrid: true,
      units: DIAGRAM_DEFAULT_UNIT,
      viewUnits: DIAGRAM_DEFAULT_UNIT,
      pageOrientation: DIAGRAM_DEFAULT_PAGE_ORIENTATION,
      pageColor: DIAGRAM_DEFAULT_PAGE_COLOR,
      hasChanges: false,
      nodes: {
        dataSource: null,
        keyExpr: 'id',
        customDataExpr: undefined,
        lockedExpr: undefined,
        styleExpr: undefined,
        textStyleExpr: undefined,
        zIndexExpr: undefined,
        typeExpr: 'type',
        textExpr: 'text',
        imageUrlExpr: undefined,
        parentKeyExpr: undefined,
        itemsExpr: undefined,
        leftExpr: undefined,
        topExpr: undefined,
        widthExpr: undefined,
        heightExpr: undefined,
        containerKeyExpr: 'containerKey',
        containerChildrenExpr: undefined,
        autoLayout: 'auto',
        autoSizeEnabled: true
      },
      edges: {
        dataSource: null,
        keyExpr: 'id',
        customDataExpr: undefined,
        lockedExpr: undefined,
        styleExpr: undefined,
        textStyleExpr: undefined,
        zIndexExpr: undefined,
        fromExpr: 'from',
        fromPointIndexExpr: undefined,
        toExpr: 'to',
        toPointIndexExpr: undefined,
        pointsExpr: undefined,
        textExpr: undefined,
        lineTypeExpr: undefined,
        fromLineEndExpr: undefined,
        toLineEndExpr: undefined
      },
      customShapes: [],
      toolbox: {
        visibility: 'auto',
        shapeIconsPerRow: DIAGRAM_TOOLBOX_SHAPES_PER_ROW,
        showSearch: true
      },
      mainToolbar: {
        visible: false
      },
      historyToolbar: {
        visible: true
      },
      viewToolbar: {
        visible: true
      },
      contextMenu: {
        enabled: true
      },
      contextToolbox: {
        enabled: true,
        shapeIconsPerRow: DIAGRAM_CONTEXT_TOOLBOX_SHAPES_PER_ROW,
        width: DIAGRAM_CONTEXT_TOOLBOX_DEFAULT_WIDTH
      },
      propertiesPanel: {
        visibility: 'auto'
      },
      defaultItemProperties: {
        connectorLineType: 'orthogonal',
        connectorLineStart: 'none',
        connectorLineEnd: 'arrow'
      },
      editing: {
        allowAddShape: true,
        allowDeleteShape: true,
        allowDeleteConnector: true,
        allowChangeConnection: true,
        allowChangeConnectorPoints: true,
        allowChangeShapeText: true,
        allowChangeConnectorText: true,
        allowResizeShape: true,
        allowMoveShape: true
      },
      export: {
        fileName: 'Diagram'
      },
      onItemClick: null,
      onItemDblClick: null,
      onSelectionChanged: null,
      onRequestEditOperation: null,
      onRequestLayoutUpdate: null
    });
  }
  _raiseDataChangeAction() {
    if (this._initialized) {
      this.option('hasChanges', true);
    }
  }
  _raiseEdgeInsertedAction(data, callback, errorCallback) {
    if (this._edgesOption) {
      this._edgesOption.insert(data, callback, errorCallback);
    }
  }
  _raiseEdgeUpdatedAction(key, data, callback, errorCallback) {
    if (this._edgesOption) {
      this._edgesOption.update(key, data, callback, errorCallback);
    }
  }
  _raiseEdgeRemovedAction(key, data, callback, errorCallback) {
    if (this._edgesOption) {
      this._edgesOption.remove(key, data, callback, errorCallback);
    }
  }
  _raiseNodeInsertedAction(data, callback, errorCallback) {
    if (this._nodesOption) {
      this._nodesOption.insert(data, callback, errorCallback);
    }
  }
  _raiseNodeUpdatedAction(key, data, callback, errorCallback) {
    if (this._nodesOption) {
      this._nodesOption.update(key, data, callback, errorCallback);
    }
  }
  _raiseNodeRemovedAction(key, data, callback, errorCallback) {
    if (this._nodesOption) {
      this._nodesOption.remove(key, data, callback, errorCallback);
    }
  }
  _raiseToolboxDragStart() {
    if (this._toolbox && this.isMobileScreenSize()) {
      this._toolbox.hide();
      this._toolboxDragHidden = true;
    }
  }
  _raiseToolboxDragEnd() {
    if (this._toolbox && this._toolboxDragHidden) {
      this._toolbox.show();
      delete this._toolboxDragHidden;
    }
  }
  _raiseTextInputStart() {
    this._textInputStarted = true;
    if (this._propertiesPanel) {
      if (this.isMobileScreenSize() && this._propertiesPanel.isVisible()) {
        this._propertiesPanel.hide();
        this._propertiesPanelTextInputHidden = true;
      }
    }
    if (this._toolbox) {
      if (this.isMobileScreenSize() && this._toolbox.isVisible()) {
        this._toolbox.hide();
        this._toolboxTextInputHidden = true;
      }
    }
  }
  _raiseTextInputEnd() {
    if (this._propertiesPanel) {
      if (this._propertiesPanelTextInputHidden) {
        this._propertiesPanel.show();
        delete this._propertiesPanelTextInputHidden;
      }
    }
    if (this._toolbox) {
      if (this._toolboxTextInputHidden) {
        this._toolbox.show();
        delete this._toolboxTextInputHidden;
      }
    }
    this._textInputStarted = false;
  }
  _createItemClickAction() {
    this._itemClickAction = this._createActionByOption('onItemClick');
  }
  _createItemDblClickAction() {
    this._itemDblClickAction = this._createActionByOption('onItemDblClick');
  }
  _createSelectionChangedAction() {
    this._selectionChangedAction = this._createActionByOption('onSelectionChanged');
  }
  _createRequestEditOperationAction() {
    this._requestEditOperationAction = this._createActionByOption('onRequestEditOperation');
  }
  _createRequestLayoutUpdateAction() {
    this._requestLayoutUpdateAction = this._createActionByOption('onRequestLayoutUpdate');
  }
  _createCustomCommand() {
    this._customCommandAction = this._createActionByOption('onCustomCommand');
  }
  _raiseItemClickAction(nativeItem) {
    var _this$_itemClickActio;
    if (!this._itemClickAction) {
      this._createItemClickAction();
    }
    (_this$_itemClickActio = this._itemClickAction) === null || _this$_itemClickActio === void 0 || _this$_itemClickActio.call(this, {
      item: this._nativeItemToDiagramItem(nativeItem)
    });
  }
  _raiseItemDblClickAction(nativeItem) {
    var _this$_itemDblClickAc;
    if (!this._itemDblClickAction) {
      this._createItemDblClickAction();
    }
    (_this$_itemDblClickAc = this._itemDblClickAction) === null || _this$_itemDblClickAc === void 0 || _this$_itemDblClickAc.call(this, {
      item: this._nativeItemToDiagramItem(nativeItem)
    });
  }
  _raiseSelectionChanged(nativeItems) {
    var _this$_selectionChang;
    if (!this._selectionChangedAction) {
      this._createSelectionChangedAction();
    }
    (_this$_selectionChang = this._selectionChangedAction) === null || _this$_selectionChang === void 0 || _this$_selectionChang.call(this, {
      items: nativeItems.map(this._nativeItemToDiagramItem.bind(this))
    });
  }
  _raiseRequestEditOperation(operation, args) {
    var _this$_requestEditOpe;
    if (!this._requestEditOperationAction) {
      this._createRequestEditOperationAction();
    }
    const eventArgs = this._getRequestEditOperationEventArgs(operation, args);
    (_this$_requestEditOpe = this._requestEditOperationAction) === null || _this$_requestEditOpe === void 0 || _this$_requestEditOpe.call(this, eventArgs);
    args.allowed = eventArgs.allowed;
  }
  _getModelOperation(operation) {
    const {
      DiagramModelOperation
    } = getDiagram();
    switch (operation) {
      case DiagramModelOperation.AddShape:
        return 'addShape';
      case DiagramModelOperation.AddShapeFromToolbox:
        return 'addShapeFromToolbox';
      case DiagramModelOperation.DeleteShape:
        return 'deleteShape';
      case DiagramModelOperation.DeleteConnector:
        return 'deleteConnector';
      case DiagramModelOperation.ChangeConnection:
        return 'changeConnection';
      case DiagramModelOperation.ChangeConnectorPoints:
        return 'changeConnectorPoints';
      case DiagramModelOperation.BeforeChangeShapeText:
        return 'beforeChangeShapeText';
      case DiagramModelOperation.ChangeShapeText:
        return 'changeShapeText';
      case DiagramModelOperation.BeforeChangeConnectorText:
        return 'beforeChangeConnectorText';
      case DiagramModelOperation.ChangeConnectorText:
        return 'changeConnectorText';
      case DiagramModelOperation.ResizeShape:
        return 'resizeShape';
      case DiagramModelOperation.MoveShape:
        return 'moveShape';
      default:
        return undefined;
    }
  }
  _getRequestEditOperationEventArgs(operation, args) {
    var _args$points, _args$oldPoints;
    const {
      DiagramModelOperation,
      ConnectorPosition
    } = getDiagram();
    const eventArgs = {
      operation: this._getModelOperation(operation),
      allowed: args.allowed,
      updateUI: args.updateUI,
      reason: args.updateUI ? 'checkUIElementAvailability' : 'modelModification',
      args: {}
    };
    switch (operation) {
      case DiagramModelOperation.AddShape:
        eventArgs.args = {
          shape: args.shape && this._nativeItemToDiagramItem(args.shape),
          position: args.position && {
            x: args.position.x,
            y: args.position.y
          }
        };
        break;
      case DiagramModelOperation.AddShapeFromToolbox:
        eventArgs.args = {
          shapeType: args.shapeType
        };
        break;
      case DiagramModelOperation.DeleteShape:
        eventArgs.args = {
          shape: args.shape && this._nativeItemToDiagramItem(args.shape)
        };
        break;
      case DiagramModelOperation.DeleteConnector:
        eventArgs.args = {
          connector: args.connector && this._nativeItemToDiagramItem(args.connector)
        };
        break;
      case DiagramModelOperation.ChangeConnection:
        eventArgs.args = {
          newShape: args.shape && this._nativeItemToDiagramItem(args.shape),
          oldShape: args.oldShape && this._nativeItemToDiagramItem(args.oldShape),
          connector: args.connector && this._nativeItemToDiagramItem(args.connector),
          connectionPointIndex: args.connectionPointIndex,
          connectorPosition: args.position === ConnectorPosition.Begin ? 'start' : 'end'
        };
        break;
      case DiagramModelOperation.ChangeConnectorPoints:
        eventArgs.args = {
          connector: args.connector && this._nativeItemToDiagramItem(args.connector),
          newPoints: (_args$points = args.points) === null || _args$points === void 0 ? void 0 : _args$points.map(pt => ({
            x: pt.x,
            y: pt.y
          })),
          oldPoints: (_args$oldPoints = args.oldPoints) === null || _args$oldPoints === void 0 ? void 0 : _args$oldPoints.map(pt => ({
            x: pt.x,
            y: pt.y
          }))
        };
        break;
      case DiagramModelOperation.BeforeChangeShapeText:
        eventArgs.args = {
          shape: args.shape && this._nativeItemToDiagramItem(args.shape)
        };
        break;
      case DiagramModelOperation.ChangeShapeText:
        eventArgs.args = {
          shape: args.shape && this._nativeItemToDiagramItem(args.shape),
          text: args.text
        };
        break;
      case DiagramModelOperation.BeforeChangeConnectorText:
        eventArgs.args = {
          connector: args.connector && this._nativeItemToDiagramItem(args.connector),
          index: args.index
        };
        break;
      case DiagramModelOperation.ChangeConnectorText:
        eventArgs.args = {
          connector: args.connector && this._nativeItemToDiagramItem(args.connector),
          index: args.index,
          text: args.text
        };
        break;
      case DiagramModelOperation.ResizeShape:
        eventArgs.args = {
          shape: args.shape && this._nativeItemToDiagramItem(args.shape),
          newSize: args.size && {
            width: args.size.width,
            height: args.size.height
          },
          oldSize: args.oldSize && {
            width: args.oldSize.width,
            height: args.oldSize.height
          }
        };
        break;
      case DiagramModelOperation.MoveShape:
        eventArgs.args = {
          shape: args.shape && this._nativeItemToDiagramItem(args.shape),
          newPosition: args.position && {
            x: args.position.x,
            y: args.position.y
          },
          oldPosition: args.oldPosition && {
            x: args.oldPosition.x,
            y: args.oldPosition.y
          }
        };
        break;
      default:
        break;
    }
    return eventArgs;
  }
  _nativeItemToDiagramItem(nativeItem) {
    const {
      NativeShape
    } = getDiagram();
    const createMethod = nativeItem instanceof NativeShape ? this._nativeShapeToDiagramShape.bind(this) : this._nativeConnectorToDiagramConnector.bind(this);
    return extend({
      id: nativeItem.id,
      key: nativeItem.key,
      dataItem: undefined
    }, createMethod(nativeItem));
  }
  _nativeShapeToDiagramShape(nativeShape) {
    var _this$_nodesOption5;
    return {
      dataItem: (_this$_nodesOption5 = this._nodesOption) === null || _this$_nodesOption5 === void 0 ? void 0 : _this$_nodesOption5.findItem(nativeShape.key),
      itemType: 'shape',
      text: nativeShape.text,
      type: nativeShape.type,
      position: {
        x: nativeShape.position.x,
        y: nativeShape.position.y
      },
      size: {
        width: nativeShape.size.width,
        height: nativeShape.size.height
      },
      attachedConnectorIds: nativeShape.attachedConnectorIds,
      containerId: nativeShape.containerId,
      containerChildItemIds: nativeShape.containerChildItemIds,
      containerExpanded: nativeShape.containerExpanded
    };
  }
  _nativeConnectorToDiagramConnector(nativeConnector) {
    var _this$_edgesOption5;
    return {
      dataItem: (_this$_edgesOption5 = this._edgesOption) === null || _this$_edgesOption5 === void 0 ? void 0 : _this$_edgesOption5.findItem(nativeConnector.key),
      itemType: 'connector',
      texts: nativeConnector.texts,
      fromKey: nativeConnector.fromKey,
      toKey: nativeConnector.toKey,
      fromId: nativeConnector.fromId,
      fromPointIndex: nativeConnector.fromPointIndex,
      toId: nativeConnector.toId,
      toPointIndex: nativeConnector.toPointIndex,
      points: nativeConnector.points.map(pt => ({
        x: pt.x,
        y: pt.y
      }))
    };
  }
  getItemByKey(key) {
    var _this$_diagramInstanc2;
    const nativeItem = (_this$_diagramInstanc2 = this._diagramInstance) === null || _this$_diagramInstanc2 === void 0 ? void 0 : _this$_diagramInstanc2.getNativeItemByDataKey(key);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return nativeItem && this._nativeItemToDiagramItem(nativeItem);
  }
  getItemById(id) {
    var _this$_diagramInstanc3;
    const nativeItem = (_this$_diagramInstanc3 = this._diagramInstance) === null || _this$_diagramInstanc3 === void 0 ? void 0 : _this$_diagramInstanc3.getNativeItemByKey(id);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return nativeItem && this._nativeItemToDiagramItem(nativeItem);
  }
  getItems() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._diagramInstance.getNativeItems().map(nativeItem => nativeItem && this._nativeItemToDiagramItem(nativeItem));
  }
  getSelectedItems() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._diagramInstance.getNativeSelectedItems().map(nativeItem => nativeItem && this._nativeItemToDiagramItem(nativeItem));
  }
  setSelectedItems(items) {
    this._diagramInstance.setSelectedItems(items.map(item => item.id));
  }
  scrollToItem(item) {
    this._diagramInstance.scrollToItems([item.id]);
  }
  _invalidateContextMenuCommands() {
    if (this._contextMenu) {
      this._contextMenu.option({
        commands: this.option('contextMenu.commands')
      });
    }
  }
  _invalidateMainToolbarCommands() {
    if (this._mainToolbar) {
      this._mainToolbar.option({
        commands: this.option('mainToolbar.commands')
      });
    }
  }
  _invalidateHistoryToolbarCommands() {
    if (this._historyToolbar) {
      this._historyToolbar.option({
        commands: this.option('historyToolbar.commands')
      });
    }
  }
  _invalidateViewToolbarCommands() {
    if (this._viewToolbar) {
      this._viewToolbar.option({
        commands: this.option('viewToolbar.commands')
      });
    }
  }
  _invalidateToolboxGroups() {
    if (this._toolbox) {
      this._toolbox.option({
        toolboxGroups: this._getToolboxGroups()
      });
    }
  }
  _optionChanged(args) {
    if (!this.optionsUpdateBar || this.optionsUpdateBar.isUpdateLocked()) return;
    this.optionsUpdateBar.beginUpdate();
    try {
      this._optionChangedCore(args);
    } finally {
      this.optionsUpdateBar.endUpdate();
    }
  }
  _optionChangedCore(args) {
    var _this$_toolbars3;
    const {
      name,
      fullName,
      value,
      previousValue
    } = args;
    switch (name) {
      case 'readOnly':
      case 'disabled':
        this._updateReadOnlyState();
        this._invalidate();
        break;
      case 'zoomLevel':
        if (fullName === 'zoomLevel' || fullName === 'zoomLevel.items' || fullName === 'zoomLevel.value') {
          this._updateZoomLevelState();
        }
        break;
      case 'autoZoomMode':
        this._updateAutoZoomState();
        break;
      case 'simpleView':
        this._updateSimpleViewState();
        break;
      case 'useNativeScrolling':
        this._invalidate();
        break;
      case 'fullScreen':
        this._updateFullscreenState();
        break;
      case 'showGrid':
        this._updateShowGridState();
        break;
      case 'snapToGrid':
        this._updateSnapToGridState();
        break;
      case 'gridSize':
        if (fullName === 'gridSize' || fullName === 'gridSize.items' || fullName === 'gridSize.value') {
          this._updateGridSizeState();
        }
        break;
      case 'viewUnits':
        this._updateViewUnitsState();
        break;
      case 'units':
        this._updateUnitsState();
        break;
      case 'pageSize':
        if (fullName === 'pageSize' || fullName === 'pageSize.items') {
          this._updatePageSizeItemsState();
        }
        if (fullName === 'pageSize' || fullName === 'pageSize.width' || fullName === 'pageSize.height') {
          this._updatePageSizeState();
        }
        break;
      case 'pageOrientation':
        this._updatePageOrientationState();
        break;
      case 'pageColor':
        this._updatePageColorState();
        break;
      case 'nodes':
        if (fullName.startsWith('nodes.autoLayout')) {
          this._refreshDataSources();
        } else {
          this._refreshNodesDataSource();
        }
        break;
      case 'edges':
        this._refreshEdgesDataSource();
        break;
      case 'customShapes':
        if (fullName !== name) {
          // customShapes[i].<property>
          this._updateAllCustomShapes();
        } else {
          this._updateCustomShapes(value, previousValue);
        }
        this._invalidate();
        break;
      case 'contextMenu':
        if (fullName === 'contextMenu.commands') {
          this._invalidateContextMenuCommands();
        } else {
          this._invalidate();
        }
        break;
      case 'contextToolbox':
        this._invalidate();
        break;
      case 'propertiesPanel':
        this._invalidate();
        break;
      case 'toolbox':
        if (fullName === 'toolbox.groups') {
          this._invalidateToolboxGroups();
        } else {
          this._invalidate();
        }
        break;
      case 'mainToolbar':
        if (fullName === 'mainToolbar.commands') {
          this._invalidateMainToolbarCommands();
        } else {
          this._invalidate();
        }
        break;
      case 'historyToolbar':
        if (fullName === 'historyToolbar.commands') {
          this._invalidateHistoryToolbarCommands();
        } else {
          this._invalidate();
        }
        break;
      case 'viewToolbar':
        if (fullName === 'viewToolbar.commands') {
          this._invalidateViewToolbarCommands();
        } else {
          this._invalidate();
        }
        break;
      case 'onItemClick':
        this._createItemClickAction();
        break;
      case 'onItemDblClick':
        this._createItemDblClickAction();
        break;
      case 'onSelectionChanged':
        this._createSelectionChangedAction();
        break;
      case 'onRequestEditOperation':
        this._createRequestEditOperationAction();
        break;
      case 'onRequestLayoutUpdate':
        this._createRequestLayoutUpdateAction();
        break;
      case 'onCustomCommand':
        this._createCustomCommand();
        break;
      case 'defaultItemProperties':
        this._updateDefaultItemProperties();
        break;
      case 'editing':
        this._updateEditingSettings();
        break;
      case 'export':
        (_this$_toolbars3 = this._toolbars) === null || _this$_toolbars3 === void 0 || _this$_toolbars3.forEach(toolbar => {
          toolbar.option('export', this.option('export'));
        });
        if (this._contextMenu) {
          this._contextMenu.option('export', this.option('export'));
        }
        break;
      case 'hasChanges':
        break;
      default:
        super._optionChanged(args);
    }
  }
}
registerComponent('dxDiagram', Diagram);
export default Diagram;
