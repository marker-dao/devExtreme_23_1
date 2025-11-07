/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DiagramBar from '../../ui/diagram/diagram.bar';
import { getDiagram } from '../../ui/diagram/diagram.importer';
class DiagramOptionsUpdateBar extends DiagramBar {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(owner) {
    super(owner);
    const {
      DiagramCommand
    } = getDiagram();
    this.commandOptions = {};
    this.commandOptions[DiagramCommand.Fullscreen] = 'fullScreen';
    this.commandOptions[DiagramCommand.ZoomLevel] = value => {
      if (typeof this._getOption('zoomLevel') === 'object') {
        this._setOption('zoomLevel.value', value);
      } else {
        this._setOption('zoomLevel', value);
      }
    };
    this.commandOptions[DiagramCommand.SwitchAutoZoom] = value => {
      const {
        AutoZoomMode
      } = getDiagram();
      switch (value) {
        case AutoZoomMode.FitContent:
          this._setOption('autoZoomMode', 'fitContent');
          break;
        case AutoZoomMode.FitToWidth:
          this._setOption('autoZoomMode', 'fitWidth');
          break;
        case AutoZoomMode.Disabled:
          this._setOption('autoZoomMode', 'disabled');
          break;
        default:
          break;
      }
    };
    this.commandOptions[DiagramCommand.ToggleSimpleView] = 'simpleView';
    this.commandOptions[DiagramCommand.ShowGrid] = 'showGrid';
    this.commandOptions[DiagramCommand.SnapToGrid] = 'snapToGrid';
    this.commandOptions[DiagramCommand.GridSize] = value => {
      if (typeof this._getOption('gridSize') === 'object') {
        this._setOption('gridSize.value', value);
      } else {
        this._setOption('gridSize', value);
      }
    };
    this.commandOptions[DiagramCommand.ViewUnits] = 'viewUnits';
    this.commandOptions[DiagramCommand.PageSize] = value => {
      const pageSize = this._getOption('pageSize');
      if (pageSize === undefined || pageSize.width !== value.width || pageSize.height !== value.height) {
        this._setOption('pageSize', value);
      }
    };
    this.commandOptions[DiagramCommand.PageLandscape] = value => {
      this._setOption('pageOrientation', value ? 'landscape' : 'portrait');
    };
    this.commandOptions[DiagramCommand.ViewUnits] = value => {
      const {
        DiagramUnit
      } = getDiagram();
      switch (value) {
        case DiagramUnit.In:
          this._setOption('viewUnits', 'in');
          break;
        case DiagramUnit.Cm:
          this._setOption('viewUnits', 'cm');
          break;
        case DiagramUnit.Px:
          this._setOption('viewUnits', 'px');
          break;
        default:
          break;
      }
    };
    this.commandOptions[DiagramCommand.PageColor] = 'pageColor';
    this._updateLock = 0;
  }
  getCommandKeys() {
    // @ts-expect-error ts-error
    return Object.keys(this.commandOptions).map(key => parseInt(key, 10));
  }
  setItemValue(key, value) {
    if (this.isUpdateLocked()) return;
    this.beginUpdate();
    try {
      var _this$commandOptions;
      if (typeof ((_this$commandOptions = this.commandOptions) === null || _this$commandOptions === void 0 ? void 0 : _this$commandOptions[key]) === 'function') {
        var _this$commandOptions2;
        (_this$commandOptions2 = this.commandOptions) === null || _this$commandOptions2 === void 0 || _this$commandOptions2[key].call(this, value);
      } else {
        var _this$commandOptions3;
        this._setOption((_this$commandOptions3 = this.commandOptions) === null || _this$commandOptions3 === void 0 ? void 0 : _this$commandOptions3[key], value);
      }
    } finally {
      this.endUpdate();
    }
  }
  beginUpdate() {
    this._updateLock += 1;
  }
  endUpdate() {
    this._updateLock -= 1;
  }
  isUpdateLocked() {
    return this._updateLock > 0;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _getOption(name) {
    return this._owner.option(name);
  }
  _setOption(name, value) {
    this._owner.option(name, value);
  }
}
export default DiagramOptionsUpdateBar;