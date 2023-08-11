/**
* DevExtreme (esm/__internal/viz/core/m_base_widget.js)
* Version: 23.2.0
* Build date: Fri Aug 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import devices from '../../../core/devices';
import domAdapter from '../../../core/dom_adapter';
import DOMComponent from '../../../core/dom_component';
import $ from '../../../core/renderer';
import { noop } from '../../../core/utils/common';
import { when } from '../../../core/utils/deferred';
import { extend } from '../../../core/utils/extend';
import { each } from '../../../core/utils/iterator';
import { getHeight, getWidth } from '../../../core/utils/size';
import { isDefined, isFunction, isNumeric, isObject as _isObject, type } from '../../../core/utils/type';
import { getWindow, hasWindow } from '../../../core/utils/window';
import eventsEngine from '../../../events/core/events_engine';
import { BaseThemeManager } from '../../../viz/core/base_theme_manager';
import { createEventTrigger, createIncidentOccurred, createResizeHandler } from '../../../viz/core/base_widget.utils';
import warnings from '../../../viz/core/errors_warnings';
import { changes, replaceInherit } from '../../../viz/core/helpers';
import _Layout from '../../../viz/core/layout';
import { Renderer } from '../../../viz/core/renderers/renderer';
import { parseScalar as _parseScalar } from '../../../viz/core/utils';
import graphicObject from '../../common/m_charts';
var {
  floor
} = Math;
var {
  log
} = warnings;
var SIZE_CHANGING_THRESHOLD = 1;
var OPTION_RTL_ENABLED = 'rtlEnabled';
var SIZED_ELEMENT_CLASS = 'dx-sized-element';
var baseOptionMethod = DOMComponent.prototype.option;
function getTrue() {
  return true;
}
function getFalse() {
  return false;
}
function areCanvasesDifferent(canvas1, canvas2) {
  return !(Math.abs(canvas1.width - canvas2.width) < SIZE_CHANGING_THRESHOLD && Math.abs(canvas1.height - canvas2.height) < SIZE_CHANGING_THRESHOLD && canvas1.left === canvas2.left && canvas1.top === canvas2.top && canvas1.right === canvas2.right && canvas1.bottom === canvas2.bottom);
}
function defaultOnIncidentOccurred(e) {
  if (!e.component._eventsStrategy.hasEvent('incidentOccurred')) {
    log.apply(null, [e.target.id].concat(e.target.args || []));
  }
}
function pickPositiveValue(values) {
  return values.reduce((result, value) => value > 0 && !result ? value : result, 0);
}
// TODO - Changes handling
// * Provide more validation - something like
//     _changes: [{
//         code: "THEME",
//         options: ["theme"],
//         type: "option",
//         handler: function () {
//             this._setThemeAndRtl();
//         }
//     }, {
//         code: "CONTAINER_SIZE",
//         options: ["size", "option"],
//         type: "layout",
//         handler: function () {
//             this._updateSize();
//         }
//     }]
var getEmptyComponent = function getEmptyComponent() {
  var emptyComponentConfig = {
    _initTemplates() {},
    ctor(element, options) {
      this.callBase(element, options);
      var sizedElement = domAdapter.createElement('div');
      var width = options && isNumeric(options.width) ? "".concat(options.width, "px") : '100%';
      var height = options && isNumeric(options.height) ? "".concat(options.height, "px") : "".concat(this._getDefaultSize().height, "px");
      domAdapter.setStyle(sizedElement, 'width', width);
      domAdapter.setStyle(sizedElement, 'height', height);
      domAdapter.setClass(sizedElement, SIZED_ELEMENT_CLASS, false);
      domAdapter.insertElement(element, sizedElement);
    }
  };
  var EmptyComponent = DOMComponent.inherit(emptyComponentConfig);
  var originalInherit = EmptyComponent.inherit;
  EmptyComponent.inherit = function (config) {
    Object.keys(config).forEach(field => {
      if (isFunction(config[field]) && field.substr(0, 1) !== '_' && field !== 'option' || field === '_dispose' || field === '_optionChanged') {
        config[field] = noop;
      }
    });
    return originalInherit.call(this, config);
  };
  return EmptyComponent;
};
function callForEach(functions) {
  functions.forEach(c => c());
}
function floorCanvasDimensions(canvas) {
  return _extends(_extends({}, canvas), {
    height: floor(canvas.height),
    width: floor(canvas.width)
  });
}
var isServerSide = !hasWindow();
function sizeIsValid(value) {
  return isDefined(value) && value > 0;
}
var baseWidget = isServerSide ? getEmptyComponent() : DOMComponent.inherit({
  _eventsMap: {
    onIncidentOccurred: {
      name: 'incidentOccurred',
      actionSettings: {
        excludeValidators: ['disabled']
      }
    },
    onDrawn: {
      name: 'drawn',
      actionSettings: {
        excludeValidators: ['disabled']
      }
    }
  },
  _getDefaultOptions() {
    return extend(this.callBase(), {
      onIncidentOccurred: defaultOnIncidentOccurred
    });
  },
  _useLinks: true,
  _init() {
    var that = this;
    that._$element.children(".".concat(SIZED_ELEMENT_CLASS)).remove();
    that._graphicObjects = {};
    that.callBase.apply(that, arguments);
    that._changesLocker = 0;
    that._optionChangedLocker = 0;
    that._asyncFirstDrawing = true;
    that._changes = changes();
    that._suspendChanges();
    that._themeManager = that._createThemeManager();
    that._themeManager.setCallback(() => {
      that._requestChange(that._themeDependentChanges);
    });
    that._renderElementAttributes();
    that._initRenderer();
    // Shouldn't "_useLinks" be passed to the renderer instead of doing 3 checks here?
    var linkTarget = that._useLinks && that._renderer.root;
    // There is an implicit relation between `_useLinks` and `loading indicator` - it uses links
    // Though this relation is not ensured in code we will immediately know when it is broken - `loading indicator` will break on construction
    linkTarget && linkTarget.enableLinks().virtualLink('core').virtualLink('peripheral');
    that._renderVisibilityChange();
    that._attachVisibilityChangeHandlers();
    that._toggleParentsScrollSubscription(this._isVisible());
    that._initEventTrigger();
    that._incidentOccurred = createIncidentOccurred(that.NAME, that._eventTrigger);
    that._layout = new _Layout();
    // Such solution is used only to avoid writing lots of "after" for all core elements in all widgets
    // May be later a proper solution would be found
    linkTarget && linkTarget.linkAfter('core');
    that._initPlugins();
    that._initCore();
    linkTarget && linkTarget.linkAfter();
    that._change(that._initialChanges);
  },
  _createThemeManager() {
    return new BaseThemeManager(this._getThemeManagerOptions());
  },
  _getThemeManagerOptions() {
    return {
      themeSection: this._themeSection,
      fontFields: this._fontFields
    };
  },
  _initialChanges: ['LAYOUT', 'RESIZE_HANDLER', 'THEME', 'DISABLED'],
  _initPlugins() {
    each(this._plugins, (_, plugin) => {
      plugin.init.call(this);
    });
  },
  _disposePlugins() {
    each(this._plugins.slice().reverse(), (_, plugin) => {
      plugin.dispose.call(this);
    });
  },
  _change(codes) {
    this._changes.add(codes);
  },
  _suspendChanges() {
    ++this._changesLocker;
  },
  _resumeChanges() {
    if (--this._changesLocker === 0 && this._changes.count() > 0 && !this._applyingChanges) {
      this._renderer.lock();
      this._applyingChanges = true;
      this._applyChanges();
      this._changes.reset();
      this._applyingChanges = false;
      this._changesApplied();
      this._renderer.unlock();
      if (this._optionsQueue) {
        this._applyQueuedOptions();
      }
      this.resolveItemsDeferred(this._legend ? [this._legend] : []);
      this._optionChangedLocker++;
      this._notify();
      this._optionChangedLocker--;
    }
  },
  resolveItemsDeferred(items) {
    this._resolveDeferred(this._getTemplatesItems(items));
  },
  _collectTemplatesFromItems(items) {
    return items.reduce((prev, i) => ({
      items: prev.items.concat(i.getTemplatesDef()),
      groups: prev.groups.concat(i.getTemplatesGroups())
    }), {
      items: [],
      groups: []
    });
  },
  _getTemplatesItems(items) {
    var elements = this._collectTemplatesFromItems(items);
    var extraItems = this._getExtraTemplatesItems();
    return {
      items: extraItems.items.concat(elements.items),
      groups: extraItems.groups.concat(elements.groups),
      launchRequest: [extraItems.launchRequest],
      doneRequest: [extraItems.doneRequest]
    };
  },
  _getExtraTemplatesItems() {
    return {
      items: [],
      groups: [],
      launchRequest: () => {},
      doneRequest: () => {}
    };
  },
  _resolveDeferred(_ref) {
    var {
      items,
      launchRequest,
      doneRequest,
      groups
    } = _ref;
    var that = this;
    that._setGroupsVisibility(groups, 'hidden');
    if (that._changesApplying) {
      that._changesApplying = false;
      callForEach(doneRequest);
      return;
    }
    var syncRendering = true;
    when.apply(that, items).done(() => {
      if (syncRendering) {
        that._setGroupsVisibility(groups, 'visible');
        return;
      }
      callForEach(launchRequest);
      that._changesApplying = true;
      var changes = ['LAYOUT', 'FULL_RENDER'];
      if (that._asyncFirstDrawing) {
        changes.push('FORCE_FIRST_DRAWING');
        that._asyncFirstDrawing = false;
      } else {
        changes.push('FORCE_DRAWING');
      }
      that._requestChange(changes);
      that._setGroupsVisibility(groups, 'visible');
    });
    syncRendering = false;
  },
  _setGroupsVisibility(groups, visibility) {
    groups.forEach(g => g.attr({
      visibility
    }));
  },
  _applyQueuedOptions() {
    var queue = this._optionsQueue;
    this._optionsQueue = null;
    this.beginUpdate();
    each(queue, (_, action) => {
      action();
    });
    this.endUpdate();
  },
  _requestChange(codes) {
    this._suspendChanges();
    this._change(codes);
    this._resumeChanges();
  },
  _applyChanges() {
    var that = this;
    var changes = that._changes;
    var order = that._totalChangesOrder;
    var i;
    var ii = order.length;
    for (i = 0; i < ii; ++i) {
      if (changes.has(order[i])) {
        that["_change_".concat(order[i])]();
      }
    }
  },
  _optionChangesOrder: ['EVENTS', 'THEME', 'RENDERER', 'RESIZE_HANDLER'],
  _layoutChangesOrder: ['ELEMENT_ATTR', 'CONTAINER_SIZE', 'LAYOUT'],
  _customChangesOrder: ['DISABLED'],
  _change_EVENTS() {
    this._eventTrigger.applyChanges();
  },
  _change_THEME() {
    this._setThemeAndRtl();
  },
  _change_RENDERER() {
    this._setRendererOptions();
  },
  _change_RESIZE_HANDLER() {
    this._setupResizeHandler();
  },
  _change_ELEMENT_ATTR() {
    this._renderElementAttributes();
    this._change(['CONTAINER_SIZE']);
  },
  _change_CONTAINER_SIZE() {
    this._updateSize();
  },
  _change_LAYOUT() {
    this._setContentSize();
  },
  _change_DISABLED() {
    var renderer = this._renderer;
    var {
      root
    } = renderer;
    if (this.option('disabled')) {
      this._initDisabledState = root.attr('pointer-events');
      root.attr({
        'pointer-events': 'none',
        filter: renderer.getGrayScaleFilter().id
      });
    } else if (root.attr('pointer-events') === 'none') {
      root.attr({
        'pointer-events': isDefined(this._initDisabledState) ? this._initDisabledState : null,
        filter: null
      });
    }
  },
  _themeDependentChanges: ['RENDERER'],
  _initRenderer() {
    var that = this;
    // Canvas is calculated before the renderer is created in order to capture actual size of the container
    var rawCanvas = that._calculateRawCanvas();
    that._canvas = floorCanvasDimensions(rawCanvas);
    that._renderer = new Renderer({
      cssClass: "".concat(that._rootClassPrefix, " ").concat(that._rootClass),
      pathModified: that.option('pathModified'),
      container: that._$element[0]
    });
    that._renderer.resize(that._canvas.width, that._canvas.height);
  },
  _disposeRenderer() {
    this._renderer.dispose();
  },
  _disposeGraphicObjects() {
    Object.keys(this._graphicObjects).forEach(id => {
      this._graphicObjects[id].dispose();
    });
    this._graphicObjects = null;
  },
  _getAnimationOptions: noop,
  render() {
    this._requestChange(['CONTAINER_SIZE']);
    var visible = this._isVisible();
    this._toggleParentsScrollSubscription(visible);
    !visible && this._stopCurrentHandling();
  },
  _toggleParentsScrollSubscription(subscribe) {
    var $parents = $(this._renderer.root.element).parents();
    var scrollEvents = 'scroll.viz_widgets';
    if (devices.real().platform === 'generic') {
      $parents = $parents.add(getWindow());
    }
    this._proxiedTargetParentsScrollHandler = this._proxiedTargetParentsScrollHandler || function () {
      this._stopCurrentHandling();
    }.bind(this);
    eventsEngine.off($('').add(this._$prevRootParents), scrollEvents, this._proxiedTargetParentsScrollHandler);
    if (subscribe) {
      eventsEngine.on($parents, scrollEvents, this._proxiedTargetParentsScrollHandler);
      this._$prevRootParents = $parents;
    }
  },
  _stopCurrentHandling: noop,
  _dispose() {
    var that = this;
    if (this._disposed) {
      return;
    }
    that.callBase.apply(that, arguments);
    that._toggleParentsScrollSubscription(false);
    that._removeResizeHandler();
    that._layout.dispose();
    that._eventTrigger.dispose();
    that._disposeCore();
    that._disposePlugins();
    that._disposeGraphicObjects();
    that._disposeRenderer();
    that._themeManager.dispose();
    that._themeManager = that._renderer = that._eventTrigger = null;
  },
  _initEventTrigger() {
    this._eventTrigger = createEventTrigger(this._eventsMap, (name, actionSettings) => this._createActionByOption(name, actionSettings));
  },
  _calculateRawCanvas() {
    var that = this;
    var size = that.option('size') || {};
    var margin = that.option('margin') || {};
    var defaultCanvas = that._getDefaultSize() || {};
    var getSizeOfSide = (size, side, getter) => {
      if (sizeIsValid(size[side]) || !hasWindow()) {
        return 0;
      }
      var elementSize = getter(that._$element);
      return elementSize <= 1 ? 0 : elementSize;
    };
    var elementWidth = getSizeOfSide(size, 'width', x => getWidth(x));
    var elementHeight = getSizeOfSide(size, 'height', x => getHeight(x));
    var canvas = {
      width: size.width <= 0 ? 0 : pickPositiveValue([size.width, elementWidth, defaultCanvas.width]),
      height: size.height <= 0 ? 0 : pickPositiveValue([size.height, elementHeight, defaultCanvas.height]),
      left: pickPositiveValue([margin.left, defaultCanvas.left]),
      top: pickPositiveValue([margin.top, defaultCanvas.top]),
      right: pickPositiveValue([margin.right, defaultCanvas.right]),
      bottom: pickPositiveValue([margin.bottom, defaultCanvas.bottom])
    };
    // This for backward compatibility - widget was not rendered when canvas is empty.
    // Now it will be rendered but because of "width" and "height" of the root both set to 0 it will not be visible.
    if (canvas.width - canvas.left - canvas.right <= 0 || canvas.height - canvas.top - canvas.bottom <= 0) {
      canvas = {
        width: 0,
        height: 0
      };
    }
    return canvas;
  },
  _updateSize() {
    var rawCanvas = this._calculateRawCanvas();
    if (areCanvasesDifferent(this._canvas, rawCanvas) || this.__forceRender /* for charts */) {
      this._canvas = floorCanvasDimensions(rawCanvas);
      this._recreateSizeDependentObjects(true);
      this._renderer.resize(this._canvas.width, this._canvas.height);
      this._change(['LAYOUT']);
    }
  },
  _recreateSizeDependentObjects: noop,
  _getMinSize() {
    return [0, 0];
  },
  _getAlignmentRect: noop,
  _setContentSize() {
    var canvas = this._canvas;
    var layout = this._layout;
    var rect = canvas.width > 0 && canvas.height > 0 ? [canvas.left, canvas.top, canvas.width - canvas.right, canvas.height - canvas.bottom] : [0, 0, 0, 0];
    rect = layout.forward(rect, this._getMinSize());
    var nextRect = this._applySize(rect) || rect;
    layout.backward(nextRect, this._getAlignmentRect() || nextRect);
  },
  _getOption(name, isScalar) {
    var theme = this._themeManager.theme(name);
    var option = this.option(name);
    return isScalar ? option !== undefined ? option : theme : extend(true, {}, theme, option);
  },
  _setupResizeHandler() {
    var redrawOnResize = _parseScalar(this._getOption('redrawOnResize', true), true);
    if (this._disposeResizeHandler) {
      this._removeResizeHandler();
    }
    this._disposeResizeHandler = createResizeHandler(this._$element[0], redrawOnResize, () => this._requestChange(['CONTAINER_SIZE']));
  },
  _removeResizeHandler() {
    if (this._disposeResizeHandler) {
      this._disposeResizeHandler();
      this._disposeResizeHandler = null;
    }
  },
  // This is actually added only to make loading indicator pluggable. This is bad but much better than entire loading indicator in BaseWidget.
  _onBeginUpdate: noop,
  beginUpdate() {
    // The "_initialized" flag is checked because first time "beginUpdate" is called in the constructor.
    if (this._initialized && this._isUpdateAllowed()) {
      this._onBeginUpdate();
      this._suspendChanges();
    }
    this.callBase.apply(this, arguments);
    return this;
  },
  endUpdate() {
    this.callBase();
    this._isUpdateAllowed() && this._resumeChanges();
    return this;
  },
  option(name) {
    // NOTE: `undefined` has to be returned because base option setter returns `undefined`.
    // `argument.length` and `isObject` checks are copypaste from Component.
    if (this._initialized && this._applyingChanges && (arguments.length > 1 || _isObject(name))) {
      this._optionsQueue = this._optionsQueue || [];
      this._optionsQueue.push(this._getActionForUpdating(arguments));
    } else {
      return baseOptionMethod.apply(this, arguments);
    }
  },
  _getActionForUpdating(args) {
    return () => {
      baseOptionMethod.apply(this, args);
    };
  },
  // For quite a long time the following method were abstract (from the Component perspective).
  // Now they are not but that basic functionality is not required here.
  _clean: noop,
  _render: noop,
  _optionChanged(arg) {
    var that = this;
    if (that._optionChangedLocker) {
      return;
    }
    var partialChanges = that.getPartialChangeOptionsName(arg);
    var changes = [];
    if (partialChanges.length > 0) {
      partialChanges.forEach(pc => changes.push(that._partialOptionChangesMap[pc]));
    } else {
      changes.push(that._optionChangesMap[arg.name]);
    }
    changes = changes.filter(c => !!c);
    if (that._eventTrigger.change(arg.name)) {
      that._change(['EVENTS']);
    } else if (changes.length > 0) {
      that._change(changes);
    } else {
      that.callBase.apply(that, arguments);
    }
  },
  _notify: noop,
  _changesApplied: noop,
  _optionChangesMap: {
    size: 'CONTAINER_SIZE',
    margin: 'CONTAINER_SIZE',
    redrawOnResize: 'RESIZE_HANDLER',
    theme: 'THEME',
    rtlEnabled: 'THEME',
    encodeHtml: 'THEME',
    elementAttr: 'ELEMENT_ATTR',
    disabled: 'DISABLED'
  },
  _partialOptionChangesMap: {},
  _partialOptionChangesPath: {},
  getPartialChangeOptionsName(changedOption) {
    var {
      fullName
    } = changedOption;
    var sections = fullName.split(/[.]/);
    var {
      name
    } = changedOption;
    var {
      value
    } = changedOption;
    var options = this._partialOptionChangesPath[name];
    var partialChangeOptionsName = [];
    if (options) {
      if (options === true) {
        partialChangeOptionsName.push(name);
      } else {
        options.forEach(op => {
          fullName.indexOf(op) >= 0 && partialChangeOptionsName.push(op);
        });
        if (sections.length === 1) {
          if (type(value) === 'object') {
            this._addOptionsNameForPartialUpdate(value, options, partialChangeOptionsName);
          } else if (type(value) === 'array') {
            if (value.length > 0 && value.every(item => this._checkOptionsForPartialUpdate(item, options))) {
              value.forEach(item => this._addOptionsNameForPartialUpdate(item, options, partialChangeOptionsName));
            }
          }
        }
      }
    }
    return partialChangeOptionsName.filter((value, index, self) => self.indexOf(value) === index);
  },
  _checkOptionsForPartialUpdate(optionObject, options) {
    return !Object.keys(optionObject).some(key => options.indexOf(key) === -1);
  },
  _addOptionsNameForPartialUpdate(optionObject, options, partialChangeOptionsName) {
    var optionKeys = Object.keys(optionObject);
    if (this._checkOptionsForPartialUpdate(optionObject, options)) {
      optionKeys.forEach(key => options.indexOf(key) > -1 && partialChangeOptionsName.push(key));
    }
  },
  _visibilityChanged() {
    this.render();
  },
  _setThemeAndRtl() {
    this._themeManager.setTheme(this.option('theme'), this.option(OPTION_RTL_ENABLED));
  },
  _getRendererOptions() {
    return {
      rtl: this.option(OPTION_RTL_ENABLED),
      encodeHtml: this.option('encodeHtml'),
      animation: this._getAnimationOptions()
    };
  },
  _setRendererOptions() {
    this._renderer.setOptions(this._getRendererOptions());
  },
  svg() {
    return this._renderer.svg();
  },
  getSize() {
    var canvas = this._canvas || {};
    return {
      width: canvas.width,
      height: canvas.height
    };
  },
  isReady: getFalse,
  _dataIsReady: getTrue,
  _resetIsReady() {
    this.isReady = getFalse;
  },
  _renderGraphicObjects() {
    var renderer = this._renderer;
    var graphics = graphicObject.getGraphicObjects();
    Object.keys(graphics).forEach(id => {
      if (!this._graphicObjects[id]) {
        var {
          type: _type,
          colors,
          rotationAngle,
          template,
          width,
          height
        } = graphics[id];
        switch (_type) {
          case 'linear':
            this._graphicObjects[id] = renderer.linearGradient(colors, id, rotationAngle);
            break;
          case 'radial':
            this._graphicObjects[id] = renderer.radialGradient(colors, id);
            break;
          case 'pattern':
            this._graphicObjects[id] = renderer.customPattern(id, this._getTemplate(template), width, height);
            break;
          default:
            break;
        }
      }
    });
  },
  _drawn() {
    this.isReady = getFalse;
    if (this._dataIsReady()) {
      this._renderer.onEndAnimation(() => {
        this.isReady = getTrue;
      });
    }
    this._eventTrigger('drawn', {});
  }
});
export default baseWidget;
replaceInherit(baseWidget);
