/**
* DevExtreme (cjs/__internal/viz/core/m_base_widget.js)
* Version: 23.2.0
* Build date: Fri Aug 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _dom_component = _interopRequireDefault(require("../../../core/dom_component"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _common = require("../../../core/utils/common");
var _deferred = require("../../../core/utils/deferred");
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _size = require("../../../core/utils/size");
var _type2 = require("../../../core/utils/type");
var _window = require("../../../core/utils/window");
var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));
var _base_theme_manager = require("../../../viz/core/base_theme_manager");
var _base_widget = require("../../../viz/core/base_widget.utils");
var _errors_warnings = _interopRequireDefault(require("../../../viz/core/errors_warnings"));
var _helpers = require("../../../viz/core/helpers");
var _layout = _interopRequireDefault(require("../../../viz/core/layout"));
var _renderer2 = require("../../../viz/core/renderers/renderer");
var _utils = require("../../../viz/core/utils");
var _m_charts = _interopRequireDefault(require("../../common/m_charts"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var floor = Math.floor;
var log = _errors_warnings.default.log;
var SIZE_CHANGING_THRESHOLD = 1;
var OPTION_RTL_ENABLED = 'rtlEnabled';
var SIZED_ELEMENT_CLASS = 'dx-sized-element';
var baseOptionMethod = _dom_component.default.prototype.option;
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
  return values.reduce(function (result, value) {
    return value > 0 && !result ? value : result;
  }, 0);
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
      var sizedElement = _dom_adapter.default.createElement('div');
      var width = options && (0, _type2.isNumeric)(options.width) ? "".concat(options.width, "px") : '100%';
      var height = options && (0, _type2.isNumeric)(options.height) ? "".concat(options.height, "px") : "".concat(this._getDefaultSize().height, "px");
      _dom_adapter.default.setStyle(sizedElement, 'width', width);
      _dom_adapter.default.setStyle(sizedElement, 'height', height);
      _dom_adapter.default.setClass(sizedElement, SIZED_ELEMENT_CLASS, false);
      _dom_adapter.default.insertElement(element, sizedElement);
    }
  };
  var EmptyComponent = _dom_component.default.inherit(emptyComponentConfig);
  var originalInherit = EmptyComponent.inherit;
  EmptyComponent.inherit = function (config) {
    Object.keys(config).forEach(function (field) {
      if ((0, _type2.isFunction)(config[field]) && field.substr(0, 1) !== '_' && field !== 'option' || field === '_dispose' || field === '_optionChanged') {
        config[field] = _common.noop;
      }
    });
    return originalInherit.call(this, config);
  };
  return EmptyComponent;
};
function callForEach(functions) {
  functions.forEach(function (c) {
    return c();
  });
}
function floorCanvasDimensions(canvas) {
  return _extends(_extends({}, canvas), {
    height: floor(canvas.height),
    width: floor(canvas.width)
  });
}
var isServerSide = !(0, _window.hasWindow)();
function sizeIsValid(value) {
  return (0, _type2.isDefined)(value) && value > 0;
}
var baseWidget = isServerSide ? getEmptyComponent() : _dom_component.default.inherit({
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
    return (0, _extend.extend)(this.callBase(), {
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
    that._changes = (0, _helpers.changes)();
    that._suspendChanges();
    that._themeManager = that._createThemeManager();
    that._themeManager.setCallback(function () {
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
    that._incidentOccurred = (0, _base_widget.createIncidentOccurred)(that.NAME, that._eventTrigger);
    that._layout = new _layout.default();
    // Such solution is used only to avoid writing lots of "after" for all core elements in all widgets
    // May be later a proper solution would be found
    linkTarget && linkTarget.linkAfter('core');
    that._initPlugins();
    that._initCore();
    linkTarget && linkTarget.linkAfter();
    that._change(that._initialChanges);
  },
  _createThemeManager() {
    return new _base_theme_manager.BaseThemeManager(this._getThemeManagerOptions());
  },
  _getThemeManagerOptions() {
    return {
      themeSection: this._themeSection,
      fontFields: this._fontFields
    };
  },
  _initialChanges: ['LAYOUT', 'RESIZE_HANDLER', 'THEME', 'DISABLED'],
  _initPlugins() {
    var _this = this;
    (0, _iterator.each)(this._plugins, function (_, plugin) {
      plugin.init.call(_this);
    });
  },
  _disposePlugins() {
    var _this2 = this;
    (0, _iterator.each)(this._plugins.slice().reverse(), function (_, plugin) {
      plugin.dispose.call(_this2);
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
    return items.reduce(function (prev, i) {
      return {
        items: prev.items.concat(i.getTemplatesDef()),
        groups: prev.groups.concat(i.getTemplatesGroups())
      };
    }, {
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
      launchRequest: function launchRequest() {},
      doneRequest: function doneRequest() {}
    };
  },
  _resolveDeferred(_ref) {
    var items = _ref.items,
      launchRequest = _ref.launchRequest,
      doneRequest = _ref.doneRequest,
      groups = _ref.groups;
    var that = this;
    that._setGroupsVisibility(groups, 'hidden');
    if (that._changesApplying) {
      that._changesApplying = false;
      callForEach(doneRequest);
      return;
    }
    var syncRendering = true;
    _deferred.when.apply(that, items).done(function () {
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
    groups.forEach(function (g) {
      return g.attr({
        visibility
      });
    });
  },
  _applyQueuedOptions() {
    var queue = this._optionsQueue;
    this._optionsQueue = null;
    this.beginUpdate();
    (0, _iterator.each)(queue, function (_, action) {
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
    var root = renderer.root;
    if (this.option('disabled')) {
      this._initDisabledState = root.attr('pointer-events');
      root.attr({
        'pointer-events': 'none',
        filter: renderer.getGrayScaleFilter().id
      });
    } else if (root.attr('pointer-events') === 'none') {
      root.attr({
        'pointer-events': (0, _type2.isDefined)(this._initDisabledState) ? this._initDisabledState : null,
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
    that._renderer = new _renderer2.Renderer({
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
    var _this3 = this;
    Object.keys(this._graphicObjects).forEach(function (id) {
      _this3._graphicObjects[id].dispose();
    });
    this._graphicObjects = null;
  },
  _getAnimationOptions: _common.noop,
  render() {
    this._requestChange(['CONTAINER_SIZE']);
    var visible = this._isVisible();
    this._toggleParentsScrollSubscription(visible);
    !visible && this._stopCurrentHandling();
  },
  _toggleParentsScrollSubscription(subscribe) {
    var $parents = (0, _renderer.default)(this._renderer.root.element).parents();
    var scrollEvents = 'scroll.viz_widgets';
    if (_devices.default.real().platform === 'generic') {
      $parents = $parents.add((0, _window.getWindow)());
    }
    this._proxiedTargetParentsScrollHandler = this._proxiedTargetParentsScrollHandler || function () {
      this._stopCurrentHandling();
    }.bind(this);
    _events_engine.default.off((0, _renderer.default)('').add(this._$prevRootParents), scrollEvents, this._proxiedTargetParentsScrollHandler);
    if (subscribe) {
      _events_engine.default.on($parents, scrollEvents, this._proxiedTargetParentsScrollHandler);
      this._$prevRootParents = $parents;
    }
  },
  _stopCurrentHandling: _common.noop,
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
    var _this4 = this;
    this._eventTrigger = (0, _base_widget.createEventTrigger)(this._eventsMap, function (name, actionSettings) {
      return _this4._createActionByOption(name, actionSettings);
    });
  },
  _calculateRawCanvas() {
    var that = this;
    var size = that.option('size') || {};
    var margin = that.option('margin') || {};
    var defaultCanvas = that._getDefaultSize() || {};
    var getSizeOfSide = function getSizeOfSide(size, side, getter) {
      if (sizeIsValid(size[side]) || !(0, _window.hasWindow)()) {
        return 0;
      }
      var elementSize = getter(that._$element);
      return elementSize <= 1 ? 0 : elementSize;
    };
    var elementWidth = getSizeOfSide(size, 'width', function (x) {
      return (0, _size.getWidth)(x);
    });
    var elementHeight = getSizeOfSide(size, 'height', function (x) {
      return (0, _size.getHeight)(x);
    });
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
  _recreateSizeDependentObjects: _common.noop,
  _getMinSize() {
    return [0, 0];
  },
  _getAlignmentRect: _common.noop,
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
    return isScalar ? option !== undefined ? option : theme : (0, _extend.extend)(true, {}, theme, option);
  },
  _setupResizeHandler() {
    var _this5 = this;
    var redrawOnResize = (0, _utils.parseScalar)(this._getOption('redrawOnResize', true), true);
    if (this._disposeResizeHandler) {
      this._removeResizeHandler();
    }
    this._disposeResizeHandler = (0, _base_widget.createResizeHandler)(this._$element[0], redrawOnResize, function () {
      return _this5._requestChange(['CONTAINER_SIZE']);
    });
  },
  _removeResizeHandler() {
    if (this._disposeResizeHandler) {
      this._disposeResizeHandler();
      this._disposeResizeHandler = null;
    }
  },
  // This is actually added only to make loading indicator pluggable. This is bad but much better than entire loading indicator in BaseWidget.
  _onBeginUpdate: _common.noop,
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
    if (this._initialized && this._applyingChanges && (arguments.length > 1 || (0, _type2.isObject)(name))) {
      this._optionsQueue = this._optionsQueue || [];
      this._optionsQueue.push(this._getActionForUpdating(arguments));
    } else {
      return baseOptionMethod.apply(this, arguments);
    }
  },
  _getActionForUpdating(args) {
    var _this6 = this;
    return function () {
      baseOptionMethod.apply(_this6, args);
    };
  },
  // For quite a long time the following method were abstract (from the Component perspective).
  // Now they are not but that basic functionality is not required here.
  _clean: _common.noop,
  _render: _common.noop,
  _optionChanged(arg) {
    var that = this;
    if (that._optionChangedLocker) {
      return;
    }
    var partialChanges = that.getPartialChangeOptionsName(arg);
    var changes = [];
    if (partialChanges.length > 0) {
      partialChanges.forEach(function (pc) {
        return changes.push(that._partialOptionChangesMap[pc]);
      });
    } else {
      changes.push(that._optionChangesMap[arg.name]);
    }
    changes = changes.filter(function (c) {
      return !!c;
    });
    if (that._eventTrigger.change(arg.name)) {
      that._change(['EVENTS']);
    } else if (changes.length > 0) {
      that._change(changes);
    } else {
      that.callBase.apply(that, arguments);
    }
  },
  _notify: _common.noop,
  _changesApplied: _common.noop,
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
    var _this7 = this;
    var fullName = changedOption.fullName;
    var sections = fullName.split(/[.]/);
    var name = changedOption.name;
    var value = changedOption.value;
    var options = this._partialOptionChangesPath[name];
    var partialChangeOptionsName = [];
    if (options) {
      if (options === true) {
        partialChangeOptionsName.push(name);
      } else {
        options.forEach(function (op) {
          fullName.indexOf(op) >= 0 && partialChangeOptionsName.push(op);
        });
        if (sections.length === 1) {
          if ((0, _type2.type)(value) === 'object') {
            this._addOptionsNameForPartialUpdate(value, options, partialChangeOptionsName);
          } else if ((0, _type2.type)(value) === 'array') {
            if (value.length > 0 && value.every(function (item) {
              return _this7._checkOptionsForPartialUpdate(item, options);
            })) {
              value.forEach(function (item) {
                return _this7._addOptionsNameForPartialUpdate(item, options, partialChangeOptionsName);
              });
            }
          }
        }
      }
    }
    return partialChangeOptionsName.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });
  },
  _checkOptionsForPartialUpdate(optionObject, options) {
    return !Object.keys(optionObject).some(function (key) {
      return options.indexOf(key) === -1;
    });
  },
  _addOptionsNameForPartialUpdate(optionObject, options, partialChangeOptionsName) {
    var optionKeys = Object.keys(optionObject);
    if (this._checkOptionsForPartialUpdate(optionObject, options)) {
      optionKeys.forEach(function (key) {
        return options.indexOf(key) > -1 && partialChangeOptionsName.push(key);
      });
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
    var _this8 = this;
    var renderer = this._renderer;
    var graphics = _m_charts.default.getGraphicObjects();
    Object.keys(graphics).forEach(function (id) {
      if (!_this8._graphicObjects[id]) {
        var _graphics$id = graphics[id],
          _type = _graphics$id.type,
          colors = _graphics$id.colors,
          rotationAngle = _graphics$id.rotationAngle,
          template = _graphics$id.template,
          width = _graphics$id.width,
          height = _graphics$id.height;
        switch (_type) {
          case 'linear':
            _this8._graphicObjects[id] = renderer.linearGradient(colors, id, rotationAngle);
            break;
          case 'radial':
            _this8._graphicObjects[id] = renderer.radialGradient(colors, id);
            break;
          case 'pattern':
            _this8._graphicObjects[id] = renderer.customPattern(id, _this8._getTemplate(template), width, height);
            break;
          default:
            break;
        }
      }
    });
  },
  _drawn() {
    var _this9 = this;
    this.isReady = getFalse;
    if (this._dataIsReady()) {
      this._renderer.onEndAnimation(function () {
        _this9.isReady = getTrue;
      });
    }
    this._eventTrigger('drawn', {});
  }
});
var _default = baseWidget;
exports.default = _default;
(0, _helpers.replaceInherit)(baseWidget);
