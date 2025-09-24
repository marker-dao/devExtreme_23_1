"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _pointer = _interopRequireDefault(require("../../../common/core/events/pointer"));
var _index = require("../../../common/core/events/utils/index");
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _array = require("../../../core/utils/array");
var _extend = require("../../../core/utils/extend");
var _inflector = require("../../../core/utils/inflector");
var _type = require("../../../core/utils/type");
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.errors"));
var _m_deferred = require("../../core/utils/m_deferred");
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
var _providerDynamic = _interopRequireDefault(require("./provider.dynamic.azure"));
var _providerDynamic2 = _interopRequireDefault(require("./provider.dynamic.bing"));
var _providerDynamic3 = _interopRequireDefault(require("./provider.dynamic.google"));
var _provider = _interopRequireDefault(require("./provider.google_static"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // NOTE external urls must have protocol explicitly specified
// (because inside Cordova package the protocol is "file:")
const PROVIDERS = {
  azure: _providerDynamic.default,
  googleStatic: _provider.default,
  google: _providerDynamic3.default,
  bing: _providerDynamic2.default
};
const MAP_CLASS = 'dx-map';
const MAP_CONTAINER_CLASS = 'dx-map-container';
const MAP_SHIELD_CLASS = 'dx-map-shield';
class Map extends _widget.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      bounds: {
        northEast: null,
        southWest: null
      },
      center: {
        lat: 0,
        lng: 0
      },
      zoom: 1,
      width: 300,
      height: 300,
      type: 'roadmap',
      provider: 'google',
      autoAdjust: true,
      markers: [],
      // @ts-expect-error ts-error
      markerIconSrc: null,
      // @ts-expect-error ts-error
      onMarkerAdded: null,
      // @ts-expect-error ts-error
      onMarkerRemoved: null,
      routes: [],
      // @ts-expect-error ts-error
      onRouteAdded: null,
      // @ts-expect-error ts-error
      onRouteRemoved: null,
      apiKey: {
        bing: '',
        google: '',
        googleStatic: ''
      },
      providerConfig: {
        mapId: '',
        useAdvancedMarkers: true
      },
      controls: false,
      // @ts-expect-error ts-error
      onReady: null,
      // for internal use only
      // @ts-expect-error ts-error
      onUpdated: null,
      // @ts-expect-error ts-error
      onClick: null
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }]);
  }
  ctor(element, options) {
    super.ctor(element, options);
    if (options) {
      if ('provider' in options && options.provider === 'bing') {
        this._logDeprecatedBingProvider();
      }
    }
  }
  _logDeprecatedBingProvider() {
    this._logDeprecatedOptionWarning('provider: bing', {
      since: '24.2',
      message: 'Use other map providers, such as Azure, Google, or GoogleStatic.'
    });
  }
  _setDeprecatedOptions() {
    super._setDeprecatedOptions();
    (0, _extend.extend)(this._deprecatedOptions, {
      'providerConfig.useAdvancedMarkers': {
        since: '24.2',
        message: 'Google deprecated the original map markers. Transition to advanced markers for future compatibility.'
      }
    });
  }
  _renderFocusTarget() {}
  _init() {
    super._init();
    this.$element().addClass(MAP_CLASS);
    this._lastAsyncAction = Promise.resolve();
    this._checkOption('provider');
    this._checkOption('markers');
    this._checkOption('routes');
    this._initContainer();
    this._grabEvents();
    this._rendered = {};
  }
  _useTemplates() {
    return false;
  }
  _checkOption(option) {
    const value = this.option(option);
    if (option === 'markers' && !Array.isArray(value)) {
      throw _ui.default.Error('E1022');
    }
    if (option === 'routes' && !Array.isArray(value)) {
      throw _ui.default.Error('E1023');
    }
  }
  _initContainer() {
    this._$container = (0, _renderer.default)('<div>').addClass(MAP_CONTAINER_CLASS);
    this.$element().append(this._$container);
  }
  _grabEvents() {
    // @ts-expect-error ts-error
    const eventName = (0, _index.addNamespace)(_pointer.default.down, this.NAME);
    _events_engine.default.on(this.$element(), eventName, this._cancelEvent.bind(this));
  }
  _cancelEvent(e) {
    var _this$_provider;
    const {
      disabled
    } = this.option();
    const cancelByProvider = ((_this$_provider = this._provider) === null || _this$_provider === void 0 ? void 0 : _this$_provider.isEventsCanceled(e)) && !disabled;
    if (cancelByProvider) {
      e.stopPropagation();
    }
  }
  _saveRendered(option) {
    const {
      [option]: value = []
    } = this.option();
    this._rendered[option] = value.slice();
  }
  _render() {
    super._render();
    this._renderShield();
    this._saveRendered('markers');
    this._saveRendered('routes');
    const {
      provider = 'google'
    } = this.option();
    const Provider = PROVIDERS[provider];
    this._provider = new Provider(this, this._$container);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._queueAsyncAction('render', this._rendered.markers, this._rendered.routes);
  }
  _renderShield() {
    const {
      disabled
    } = this.option();
    if (disabled) {
      const $shield = (0, _renderer.default)('<div>').addClass(MAP_SHIELD_CLASS);
      this.$element().append($shield);
      return;
    }
    this.$element().find(`.${MAP_SHIELD_CLASS}`).remove();
  }
  _clean() {
    this._cleanFocusState();
    if (this._provider) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this._provider.clean();
    }
    // @ts-expect-error ts-error
    this._provider = null;
    this._lastAsyncAction = Promise.resolve();
    this.setOptionSilent('bounds', {
      northEast: null,
      southWest: null
    });
    delete this._suppressAsyncAction;
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    const changeBag = this._optionChangeBag;
    this._optionChangeBag = null;
    switch (name) {
      case 'disabled':
        this._renderShield();
        super._optionChanged(args);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this._queueAsyncAction('updateDisabled');
        break;
      case 'width':
      case 'height':
        super._optionChanged(args);
        this._dimensionChanged();
        break;
      case 'provider':
        this._suppressAsyncAction = true;
        this._invalidate();
        if (value === 'bing') {
          this._logDeprecatedBingProvider();
        }
        break;
      case 'apiKey':
        _ui.default.log('W1001');
        break;
      case 'bounds':
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this._queueAsyncAction('updateBounds');
        break;
      case 'center':
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this._queueAsyncAction('updateCenter');
        break;
      case 'zoom':
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this._queueAsyncAction('updateZoom');
        break;
      case 'type':
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this._queueAsyncAction('updateMapType');
        break;
      case 'controls':
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this._queueAsyncAction('updateControls', this._rendered.markers, this._rendered.routes);
        break;
      case 'autoAdjust':
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this._queueAsyncAction('adjustViewport');
        break;
      case 'markers':
      case 'routes':
        {
          this._checkOption(name);
          const prevValue = this._rendered[name];
          this._saveRendered(name);
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          this._queueAsyncAction(`${name === 'markers' ? 'updateMarkers' : 'updateRoutes'}`, changeBag ? changeBag.removed : prevValue, changeBag ? changeBag.added : this._rendered[name]).then(result => {
            if (changeBag) {
              changeBag.resolve(result);
            }
          });
          break;
        }
      case 'markerIconSrc':
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this._queueAsyncAction('updateMarkers', this._rendered.markers, this._rendered.markers);
        break;
      case 'providerConfig':
        this._suppressAsyncAction = true;
        this._invalidate();
        break;
      case 'onReady':
      case 'onUpdated':
      case 'onMarkerAdded':
      case 'onMarkerRemoved':
      case 'onRouteAdded':
      case 'onRouteRemoved':
      case 'onClick':
        break;
      default:
        super._optionChanged(args);
    }
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._dimensionChanged();
    }
  }
  _dimensionChanged() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._queueAsyncAction('updateDimensions');
  }
  _queueAsyncAction(name, markers, routes) {
    const markerAndRoutes = [markers, routes].filter(Boolean);
    const isActionSuppressed = this._suppressAsyncAction;
    this._lastAsyncAction = this._lastAsyncAction.then(() => {
      if (!this._provider || isActionSuppressed) {
        /// #DEBUG
        this._asyncActionSuppressed = true;
        /// #ENDDEBUG
        return Promise.resolve();
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this._provider[name](...markerAndRoutes).then(result => {
        const arrayResult = (0, _array.wrapToArray)(result);
        const mapRefreshed = arrayResult[0];
        if (mapRefreshed && !this._disposed) {
          this._triggerReadyAction();
        }
        /// #DEBUG
        if (!mapRefreshed && name !== 'clean' && !this._disposed) {
          this._triggerUpdateAction();
        }
        /// #ENDDEBUG
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return arrayResult[1];
      });
    });
    return this._lastAsyncAction;
  }
  _triggerReadyAction() {
    this._createActionByOption('onReady')({
      originalMap: this._provider.map()
    });
  }
  _triggerUpdateAction() {
    this._createActionByOption('onUpdated')();
  }
  setOptionSilent(name, value) {
    this._setOptionWithoutOptionChange(name, value);
  }
  addMarker(marker) {
    return this._addFunction('markers', marker);
  }
  removeMarker(marker) {
    return this._removeFunction('markers', marker);
  }
  addRoute(route) {
    return this._addFunction('routes', route);
  }
  removeRoute(route) {
    return this._removeFunction('routes', route);
  }
  _addFunction(optionName, addingValue) {
    const {
      [optionName]: optionValue = []
    } = this.option();
    const addingValues = (0, _array.wrapToArray)(addingValue);
    optionValue.push(...addingValues);
    return this._partialArrayOptionChange(optionName, optionValue, addingValues, []);
  }
  _removeFunction(optionName, removingValue) {
    const {
      [optionName]: optionValue = []
    } = this.option();
    const removingValues = (0, _array.wrapToArray)(removingValue);
    removingValues.forEach((value, removingIndex) => {
      const index = (0, _type.isNumeric)(value) ? value : optionValue.indexOf(value);
      if (index !== -1) {
        const removing = optionValue.splice(index, 1)[0];
        removingValues.splice(removingIndex, 1, removing);
      } else {
        throw _ui.default.log('E1021', (0, _inflector.titleize)(optionName.substring(0, optionName.length - 1)), value);
      }
    });
    return this._partialArrayOptionChange(optionName, optionValue, [], removingValues);
  }
  _partialArrayOptionChange(optionName, optionValue, addingValues, removingValues) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (0, _m_deferred.fromPromise)(new Promise(resolve => {
      this._optionChangeBag = {
        resolve,
        added: addingValues,
        removed: removingValues
      };
      this.option(optionName, optionValue);
    }).then(result => {
      const resultArray = Array.isArray(result) ? result : [result];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return resultArray.length === 1 ? resultArray[0] : resultArray;
    }), this);
  }
}
(0, _component_registrator.default)('dxMap', Map);
var _default = exports.default = Map;