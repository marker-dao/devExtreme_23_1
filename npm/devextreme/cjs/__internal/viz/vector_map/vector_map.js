/**
* DevExtreme (cjs/__internal/viz/vector_map/vector_map.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("../../viz/vector_map/projection");
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _annotations = require("../../viz/core/annotations");
var _export = require("../../viz/core/export");
var _loading_indicator = require("../../viz/core/loading_indicator");
var _m_base_widget = _interopRequireDefault(require("../../viz/core/m_base_widget"));
var _title = require("../../viz/core/title");
var _tooltip = require("../../viz/core/tooltip");
var _utils = require("../../viz/core/utils");
var _control_bar = require("../../viz/vector_map/control_bar/control_bar");
var _data_exchanger = require("../../viz/vector_map/data_exchanger");
var _gesture_handler = require("../../viz/vector_map/gesture_handler");
var _layout = require("../../viz/vector_map/layout");
var _legend = require("../../viz/vector_map/legend");
var _map_layer = require("../../viz/vector_map/map_layer");
var _projection2 = require("../../viz/vector_map/projection.main");
var _tooltip_viewer = require("../../viz/vector_map/tooltip_viewer");
var _tracker = require("../../viz/vector_map/tracker");
var _vector_map = require("../../viz/vector_map/vector_map.utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable prefer-rest-params */
/* eslint-disable @stylistic/no-mixed-operators */
/* eslint-disable prefer-spread */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable no-multi-assign */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/prefer-optional-chain */

// PLUGINS_SECTION

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 400;
function mergeBounds(sumBounds, dataBounds) {
  return dataBounds ? [Math.min(dataBounds[0], dataBounds[2], sumBounds[0]), Math.min(dataBounds[1], dataBounds[3], sumBounds[3]), Math.max(dataBounds[0], dataBounds[2], sumBounds[2]), Math.max(dataBounds[1], dataBounds[3], sumBounds[1])] : sumBounds;
}
const dxVectorMap = _m_base_widget.default.inherit({
  _eventsMap: {
    onClick: {
      name: 'click'
    },
    onCenterChanged: {
      name: 'centerChanged'
    },
    onZoomFactorChanged: {
      name: 'zoomFactorChanged'
    },
    onHoverChanged: {
      name: 'hoverChanged'
    },
    onSelectionChanged: {
      name: 'selectionChanged'
    }
  },
  _rootClassPrefix: 'dxm',
  _rootClass: 'dxm-vector-map',
  _themeSection: 'map',
  _fontFields: ['layer:area.label.font', 'layer:marker:dot.label.font', 'layer:marker:bubble.label.font', 'layer:marker:pie.label.font', 'layer:marker:image.label.font', 'legend.font', 'legend.title.font', 'legend.title.subtitle.font'],
  _initLayerCollection(dataKey) {
    const that = this;
    that._layerCollection = new _map_layer.MapLayerCollection({
      renderer: that._renderer,
      projection: that._projection,
      themeManager: that._themeManager,
      tracker: that._tracker,
      dataKey,
      eventTrigger: that._eventTrigger,
      dataExchanger: that._dataExchanger,
      tooltip: that._tooltip,
      notifyDirty: that._notifyDirty,
      notifyReady: that._notifyReady,
      dataReady() {
        let bounds;
        if (that.option('getBoundsFromData') && !that.option('bounds')) {
          that._preventProjectionEvents();
          bounds = that._getBoundsFromData();
          that._projection.setBounds(bounds);
          that._allowProjectionEvents();
        }
        if (!that.option('projection')) {
          bounds = bounds || that._getBoundsFromData();
          if (Math.ceil(bounds[0]) < -180 || Math.ceil(bounds[3]) < -90 || Math.floor(bounds[2]) > 180 || Math.floor(bounds[1]) > 90) {
            const longitudeLength = bounds[2] - bounds[0];
            const latitudeLength = bounds[1] - bounds[3];
            that._projection.setEngine({
              to(coordinates) {
                return [(coordinates[0] - bounds[0]) * 2 / longitudeLength - 1, (coordinates[1] - bounds[3]) * 2 / latitudeLength - 1];
              },
              from(coordinates) {
                return [(coordinates[0] + 1) * longitudeLength / 2 + bounds[0], (coordinates[1] + 1) * latitudeLength / 2 + bounds[3]];
              }
            });
          }
        }
      }
    });
  },
  _getBoundsFromData() {
    let bounds = this._getBoundingBoxFromDataSource();
    if (!bounds) {
      const layersBounds = this.getLayers().map(l => l.getBounds()).filter(x => x !== undefined);
      const boundsByData = (0, _map_layer.getMaxBound)(layersBounds);
      if (boundsByData) {
        bounds = boundsByData;
      }
    }
    bounds = bounds || [];
    bounds = [bounds[0], bounds[3], bounds[2], bounds[1]];
    return bounds;
  },
  _initLegendsControl() {
    const that = this;
    that._legendsControl = new _legend.LegendsControl({
      renderer: that._renderer,
      container: that._root,
      widget: that,
      layoutControl: that._layoutControl,
      themeManager: that._themeManager,
      dataExchanger: that._dataExchanger,
      notifyDirty: that._notifyDirty,
      notifyReady: that._notifyReady
    });
  },
  _initControlBar(dataKey) {
    const that = this;
    that._controlBar = new _control_bar.ControlBar({
      renderer: that._renderer,
      container: that._root,
      layoutControl: that._layoutControl,
      projection: that._projection,
      tracker: that._tracker,
      dataKey
    });
  },
  _initElements() {
    const that = this;
    const dataKey = (0, _vector_map.generateDataKey)();
    let notifyCounter = 0;
    let preventProjectionEvents;
    that._preventProjectionEvents = function () {
      preventProjectionEvents = true;
    };
    that._allowProjectionEvents = function () {
      preventProjectionEvents = false;
    };
    that._notifyDirty = function () {
      that._resetIsReady();
      ++notifyCounter;
    };
    that._notifyReady = function () {
      that._allowProjectionEvents();
      if (--notifyCounter === 0) {
        that._drawn();
      }
    };
    that._preventProjectionEvents();
    that._dataExchanger = new _data_exchanger.DataExchanger();
    // The `{ eventTrigger: that._eventTrigger }` object cannot be passed to the Projection because later backward option updating is going to be added.
    that._projection = new _projection2.Projection({
      centerChanged(value) {
        if (!preventProjectionEvents) {
          that._eventTrigger('centerChanged', {
            center: value
          });
        }
      },
      zoomChanged(value) {
        if (!preventProjectionEvents) {
          that._eventTrigger('zoomFactorChanged', {
            zoomFactor: value
          });
        }
      }
    });
    that._tracker = new _tracker.Tracker({
      root: that._root,
      projection: that._projection,
      dataKey
    });
    that._gestureHandler = new _gesture_handler.GestureHandler({
      projection: that._projection,
      renderer: that._renderer,
      tracker: that._tracker
    });
    that._layoutControl = new _layout.LayoutControl(that);
    that._layoutControl.suspend();
    that._initLayerCollection(dataKey);
    that._createHtmlStructure();
    that._initControlBar(dataKey);
    that._initLegendsControl();
    that._prepareExtraElements();
    that._tooltipViewer = new _tooltip_viewer.TooltipViewer({
      tracker: that._tracker,
      tooltip: that._tooltip,
      layerCollection: that._layerCollection
    });
  },
  _change_RESUME_LAYOUT() {
    this._layoutControl.resume();
  },
  _initialChanges: ['PROJECTION', 'RESUME_LAYOUT', 'LAYOUT_INIT', 'BOUNDS', 'MAX_ZOOM_FACTOR', 'ZOOM_FACTOR', 'CENTER'],
  _layoutChangesOrder: ['RESUME_LAYOUT', 'LAYERS'],
  _customChangesOrder: ['EXTRA_ELEMENTS'],
  _initCore() {
    this._root = this._renderer.root.attr({
      align: 'center',
      cursor: 'default'
    });
    this._initElements();
  },
  _disposeCore() {
    const that = this;
    that._controlBar.dispose();
    that._gestureHandler.dispose();
    that._tracker.dispose();
    that._legendsControl.dispose();
    that._layerCollection.dispose();
    that._layoutControl.dispose();
    that._tooltipViewer.dispose();
    that._dataExchanger.dispose();
    that._projection.dispose();
    that._dataExchanger = that._gestureHandler = that._projection = that._tracker = that._layoutControl = that._root = that._layerCollection = that._controlBar = that._legendsControl = null;
  },
  _setupInteraction() {
    const options = {
      centeringEnabled: !!(0, _utils.parseScalar)(this._getOption('panningEnabled', true), true),
      zoomingEnabled: !!(0, _utils.parseScalar)(this._getOption('zoomingEnabled', true), true)
    };
    this._gestureHandler.setInteraction(options);
    this._controlBar.setInteraction(options);
  },
  _getDefaultSize() {
    return {
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT
    };
  },
  _applySize(rect) {
    const layout = {
      left: rect[0],
      top: rect[1],
      width: rect[2] - rect[0],
      height: rect[3] - rect[1],
      right: 0,
      bottom: 0
    };
    this._projection.setSize(layout);
    this._layoutControl.setSize(layout);
    this._layerCollection.setRect([layout.left, layout.top, layout.width, layout.height]);
    this._requestChange(['EXTRA_ELEMENTS']);
  },
  // The "layers_data", "mapData", "markers" options must never be merged (because of their meaning)
  // For "layers_data" there are special cases: "layers", "layers.data", "layers[i]", "layers[i].data"
  // Because of the cases (1) and (3) "option by reference" mechanism cannot be used -
  // so separate (for dxVectorMap only by now) mechanism is introduced - it handles all cases (including "option by reference")
  // T318992
  // Previously mechanism used the "_optionValuesEqual" method but after T318992 usage of "_optionValuesEqual" was stopped
  // and new (more meaningful) method was added - "_optionChanging"
  _optionChanging(name, currentValue, nextValue) {
    if (currentValue && nextValue) {
      if (name.startsWith('layers')) {
        if (currentValue.dataSource && nextValue.dataSource && currentValue !== nextValue) {
          currentValue.dataSource = null;
        } else if (name.endsWith('.dataSource')) {
          this.option(name, null);
        }
      }
    }
  },
  _applyChanges() {
    this._notifyDirty();
    this.callBase.apply(this, arguments);
    this._notifyReady();
  },
  _optionChangesMap: {
    background: 'BACKGROUND',
    layers: 'LAYERS',
    extraElements: 'EXTRA_ELEMENTS',
    controlBar: 'CONTROL_BAR',
    legends: 'LEGENDS',
    touchEnabled: 'TRACKER',
    wheelEnabled: 'TRACKER',
    panningEnabled: 'INTERACTION',
    zoomingEnabled: 'INTERACTION',
    projection: 'PROJECTION',
    bounds: 'BOUNDS',
    maxZoomFactor: 'MAX_ZOOM_FACTOR',
    zoomFactor: 'ZOOM_FACTOR',
    center: 'CENTER'
  },
  _optionChangesOrder: ['PROJECTION', 'BOUNDS', 'MAX_ZOOM_FACTOR', 'ZOOM_FACTOR', 'CENTER', 'BACKGROUND', 'CONTROL_BAR', 'LEGENDS', 'TRACKER', 'INTERACTION'],
  _change_PROJECTION() {
    this._setProjection();
  },
  _change_BOUNDS() {
    this._setBounds();
  },
  _change_MAX_ZOOM_FACTOR() {
    this._setMaxZoom();
  },
  _change_ZOOM_FACTOR() {
    this._setZoom();
  },
  _change_CENTER() {
    this._setCenter();
  },
  _change_BACKGROUND() {
    this._setBackgroundOptions();
  },
  _change_LAYERS() {
    this._setLayerCollectionOptions();
  },
  _change_CONTROL_BAR() {
    this._setControlBarOptions();
  },
  _change_EXTRA_ELEMENTS() {
    this._renderExtraElements();
  },
  _change_LEGENDS() {
    this._setLegendsOptions();
  },
  _change_TRACKER() {
    this._setTrackerOptions();
  },
  _change_INTERACTION() {
    this._setupInteraction();
  },
  _themeDependentChanges: ['BACKGROUND', 'LAYERS', 'CONTROL_BAR', 'LEGENDS', 'TRACKER', 'INTERACTION'],
  _setProjection() {
    this._projection.setEngine(this.option('projection'));
  },
  _setBounds() {
    this._projection.setBounds(this.option('bounds'));
  },
  _setMaxZoom() {
    this._projection.setMaxZoom(this.option('maxZoomFactor'));
  },
  _setZoom() {
    this._projection.setZoom(this.option('zoomFactor'));
  },
  _setCenter() {
    this._projection.setCenter(this.option('center'));
  },
  _setBackgroundOptions() {
    this._layerCollection.setBackgroundOptions(this._getOption('background'));
  },
  _setLayerCollectionOptions() {
    this._layerCollection.setOptions(this.option('layers'));
  },
  _getBoundingBoxFromDataSource() {
    const that = this;
    const layers = that._layerCollection.items();
    const infinityBounds = [Infinity, -Infinity, -Infinity, Infinity];
    const resultBBox = layers && layers.length ? layers.reduce((sumBBox, l) => {
      const layerData = l.getData();
      const itemCount = layerData.count();
      if (itemCount > 0) {
        const rootBBox = layerData.getBBox();
        if (rootBBox) {
          sumBBox = mergeBounds(sumBBox, rootBBox);
        } else {
          for (let i = 0; i < itemCount; i++) {
            sumBBox = mergeBounds(sumBBox, layerData.getBBox(i));
          }
        }
      }
      return sumBBox;
    }, infinityBounds) : undefined;
    return resultBBox === infinityBounds ? undefined : resultBBox;
  },
  _setControlBarOptions() {
    this._controlBar.setOptions(this._getOption('controlBar'));
  },
  _setLegendsOptions() {
    this._legendsControl.setOptions(this.option('legends'));
  },
  _setTrackerOptions() {
    this._tracker.setOptions({
      touchEnabled: this._getOption('touchEnabled', true),
      wheelEnabled: this._getOption('wheelEnabled', true)
    });
  },
  getLayers() {
    return this._layerCollection.items().map(l => l.proxy);
  },
  getLayerByIndex(index) {
    const layer = this._layerCollection.byIndex(index);
    return layer ? layer.proxy : null;
  },
  getLayerByName(name) {
    const layer = this._layerCollection.byName(name);
    return layer ? layer.proxy : null;
  },
  clearSelection(_noEvent) {
    const layers = this._layerCollection.items();
    let i;
    const ii = layers.length;
    for (i = 0; i < ii; ++i) {
      layers[i].clearSelection(_noEvent);
    }
    return this;
  },
  center(value) {
    const that = this;
    if (value === undefined) {
      return that._projection.getCenter();
    } else {
      that._projection.setCenter(value);
      return that;
    }
  },
  zoomFactor(value) {
    const that = this;
    if (value === undefined) {
      return that._projection.getZoom();
    } else {
      that._projection.setZoom(value);
      return that;
    }
  },
  viewport(value) {
    const that = this;
    if (value === undefined) {
      return that._projection.getViewport();
    } else {
      that._projection.setViewport(value);
      return that;
    }
  },
  convertToGeo(x, y) {
    return this._projection.fromScreenPoint([x, y]);
  },
  convertToXY(longitude, latitude) {
    return this._projection.toScreenPoint([longitude, latitude]);
  }
});
(0, _component_registrator.default)('dxVectorMap', dxVectorMap);
var _default = exports.default = dxVectorMap;
dxVectorMap.addPlugin(_export.plugin);
dxVectorMap.addPlugin(_title.plugin);
dxVectorMap.addPlugin(_tooltip.plugin);
dxVectorMap.addPlugin(_loading_indicator.plugin);
dxVectorMap.addPlugin(_annotations.plugins.core);
dxVectorMap.addPlugin(_annotations.plugins.vectorMap);
