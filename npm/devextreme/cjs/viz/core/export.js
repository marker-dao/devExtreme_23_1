/**
* DevExtreme (cjs/viz/core/export.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.plugin = exports.getMarkup = exports.exportWidgets = exports.exportFromMarkup = exports.combineMarkups = exports.ExportMenu = void 0;
var _extend = require("../../core/utils/extend");
var _window = require("../../core/utils/window");
var _utils = require("./utils");
var _svg = require("../../core/utils/svg");
var _exporter = require("../../exporter");
var _message = _interopRequireDefault(require("../../common/core/localization/message"));
var _type = require("../../core/utils/type");
var _themes = require("../themes");
var _hover = require("../../common/core/events/hover");
var _pointer = _interopRequireDefault(require("../../common/core/events/pointer"));
var _console = require("../../core/utils/console");
var _size = require("../../core/utils/size");
var _renderer = require("./renderers/renderer");
var _renderer2 = _interopRequireDefault(require("../../core/renderer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const pointerActions = [_pointer.default.down, _pointer.default.move].join(' ');
const BUTTON_SIZE = 35;
const ICON_COORDS = [[9, 12, 26, 12, 26, 14, 9, 14], [9, 17, 26, 17, 26, 19, 9, 19], [9, 22, 26, 22, 26, 24, 9, 24]];
const LIST_PADDING_TOP = 4;
const LIST_WIDTH = 120;
const VERTICAL_TEXT_MARGIN = 8;
const HORIZONTAL_TEXT_MARGIN = 15;
const MENU_ITEM_HEIGHT = 30;
const LIST_STROKE_WIDTH = 1;
const MARGIN = 10;
const SHADOW_OFFSET = 2;
const SHADOW_BLUR = 3;
const DEFAULT_EXPORT_FORMAT = 'PNG';
const ALLOWED_IMAGE_FORMATS = [DEFAULT_EXPORT_FORMAT, 'JPEG', 'GIF'];
const ALLOWED_EXTRA_FORMATS = ['PDF', 'SVG'];
const EXPORT_CSS_CLASS = 'dx-export-menu';
const A4WidthCm = '21cm';
const EXPORT_DATA_KEY = 'export-element-type';
const FORMAT_DATA_KEY = 'export-element-format';
const GET_COLOR_REGEX = /data-backgroundcolor="([^"]*)"/;
function getRendererWrapper(width, height, backgroundColor) {
  const rendererContainer = (0, _renderer2.default)('<div>').get(0);
  const renderer = new _renderer.Renderer({
    container: rendererContainer
  });
  renderer.resize(width, height);
  renderer.root.element.setAttribute('data-backgroundcolor', backgroundColor);
  return {
    createGroup() {
      return renderer.g();
    },
    getRootContent() {
      return renderer.root.element.cloneNode(true);
    },
    dispose() {
      renderer.dispose();
      rendererContainer.remove();
    }
  };
}
function getValidFormats() {
  const imageFormats = _exporter.image.testFormats(ALLOWED_IMAGE_FORMATS);
  return {
    unsupported: imageFormats.unsupported,
    supported: imageFormats.supported.concat(ALLOWED_EXTRA_FORMATS)
  };
}
function validateFormat(format, incidentOccurred, validFormats) {
  validFormats = validFormats || getValidFormats();
  format = String(format).toUpperCase();
  if (validFormats.supported.indexOf(format) !== -1) {
    return format;
  }
  if (validFormats.unsupported.indexOf(format) !== -1) {
    incidentOccurred && incidentOccurred('W2108', [format]);
  }
}
function getCreatorFunc(format) {
  if (format === 'SVG') {
    return _exporter.svg.getData;
  } else if (format === 'PDF') {
    return _exporter.pdf.getData;
  } else {
    return _exporter.image.getData;
  }
}
function print(imageSrc, options) {
  const document = (0, _window.getWindow)().document;
  const iFrame = document.createElement('iframe');
  iFrame.onload = setPrint(imageSrc, options);
  iFrame.style.position = 'fixed';
  iFrame.style.width = '0';
  iFrame.style.height = '0';
  iFrame.style.right = '0';
  iFrame.style.bottom = '0';
  document.body.appendChild(iFrame);
}
function calculatePrintPageWidth(iFrameBody) {
  iFrameBody.style.width = A4WidthCm;
  const width = (0, _size.getWidth)(iFrameBody);
  iFrameBody.style.width = '';
  return width;
}
function setPrint(imageSrc, options) {
  return function () {
    let window = this.contentWindow;
    const img = window.document.createElement('img');
    window.document.body.appendChild(img);
    const widthRatio = calculatePrintPageWidth(window.document.body) / options.width;
    if (widthRatio < 1) {
      window.document.body.style.transform = `scale(${widthRatio})`;
      window.document.body.style['transform-origin'] = '0 0';
    }
    const removeFrame = () => {
      this.parentElement.removeChild(this);
    };
    img.addEventListener('load', () => {
      window.focus();
      window.print();
    });
    img.addEventListener('error', removeFrame);
    window.addEventListener('afterprint', () => {
      // T933486
      setTimeout(removeFrame, 0); // timeout needed for FF
    });
    img.src = imageSrc;
  };
}
function getItemAttributes(options, type, itemIndex) {
  const x = BUTTON_SIZE - LIST_WIDTH;
  const y = BUTTON_SIZE + LIST_PADDING_TOP + LIST_STROKE_WIDTH + itemIndex * MENU_ITEM_HEIGHT;
  const attr = {
    rect: {
      width: LIST_WIDTH - LIST_STROKE_WIDTH * 2,
      height: MENU_ITEM_HEIGHT,
      x: x + LIST_STROKE_WIDTH,
      y: y
    },
    text: {
      x: x + (options.rtl ? LIST_WIDTH - HORIZONTAL_TEXT_MARGIN : HORIZONTAL_TEXT_MARGIN),
      y: y + MENU_ITEM_HEIGHT - VERTICAL_TEXT_MARGIN
    }
  };
  if (type === 'printing') {
    attr.separator = {
      stroke: options.button.default.borderColor,
      'stroke-width': LIST_STROKE_WIDTH,
      cursor: 'pointer',
      sharp: 'v',
      d: 'M ' + x + ' ' + (y + MENU_ITEM_HEIGHT - LIST_STROKE_WIDTH) + ' ' + 'L ' + (x + LIST_WIDTH) + ' ' + (y + MENU_ITEM_HEIGHT - LIST_STROKE_WIDTH)
    };
  }
  return attr;
}
function createMenuItem(renderer, options, settings) {
  const itemData = {};
  const type = settings.type;
  const format = settings.format;
  const attr = getItemAttributes(options, type, settings.itemIndex);
  const fontStyle = (0, _utils.patchFontOptions)(options.font);
  fontStyle['pointer-events'] = 'none';
  const menuItem = renderer.g().attr({
    'class': EXPORT_CSS_CLASS + '-list-item'
  });
  itemData[EXPORT_DATA_KEY] = type;
  if (format) {
    itemData[FORMAT_DATA_KEY] = format;
  }
  const rect = renderer.rect();
  rect.attr(attr.rect).css({
    cursor: 'pointer',
    'pointer-events': 'all'
  }).data(itemData);
  rect.on(_hover.start + '.export', () => rect.attr({
    fill: options.button.hover.backgroundColor
  })).on(_hover.end + '.export', () => rect.attr({
    fill: null
  }));
  rect.append(menuItem);
  const text = renderer.text(settings.text).css(fontStyle).attr(attr.text).append(menuItem);
  if (type === 'printing') {
    renderer.path(null, 'line').attr(attr.separator).append(menuItem);
  }
  return {
    g: menuItem,
    rect: rect,
    resetState: () => rect.attr({
      fill: null
    }),
    fixPosition: () => {
      const textBBox = text.getBBox();
      text.move(attr.text.x - textBBox.x - (options.rtl ? textBBox.width : 0));
    }
  };
}
function createMenuItems(renderer, options) {
  let items = [];
  if (options.printingEnabled) {
    items.push(createMenuItem(renderer, options, {
      type: 'printing',
      text: _message.default.format('vizExport-printingButtonText'),
      itemIndex: items.length
    }));
  }
  items = options.formats.reduce((r, format) => {
    r.push(createMenuItem(renderer, options, {
      type: 'exporting',
      text: _message.default.getFormatter('vizExport-exportButtonText')(format),
      format: format,
      itemIndex: r.length
    }));
    return r;
  }, items);
  return items;
}
function getBackgroundColorFromMarkup(markup) {
  const parsedMarkup = GET_COLOR_REGEX.exec(markup);
  return parsedMarkup === null || parsedMarkup === void 0 ? void 0 : parsedMarkup[1];
}
const exportFromMarkup = function (markup, options) {
  options.format = validateFormat(options.format) || DEFAULT_EXPORT_FORMAT;
  options.fileName = options.fileName || 'file';
  options.exportingAction = options.onExporting;
  options.exportedAction = options.onExported;
  options.fileSavingAction = options.onFileSaving;
  options.margin = (0, _type.isDefined)(options.margin) ? options.margin : MARGIN;
  options.backgroundColor = (0, _type.isDefined)(options.backgroundColor) ? options.backgroundColor : getBackgroundColorFromMarkup(markup) || (0, _themes.getTheme)().backgroundColor;
  (0, _exporter.export)(markup, options, getCreatorFunc(options.format));
};
exports.exportFromMarkup = exportFromMarkup;
const getMarkup = widgets => combineMarkups(widgets).root.outerHTML;
exports.getMarkup = getMarkup;
const exportWidgets = function (widgets, options) {
  options = options || {};
  const markupInfo = combineMarkups(widgets, {
    gridLayout: options.gridLayout,
    verticalAlignment: options.verticalAlignment,
    horizontalAlignment: options.horizontalAlignment
  });
  options.width = markupInfo.width;
  options.height = markupInfo.height;
  exportFromMarkup(markupInfo.root, options);
};
exports.exportWidgets = exportWidgets;
let combineMarkups = function (widgets) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!Array.isArray(widgets)) {
    widgets = [[widgets]];
  } else if (!Array.isArray(widgets[0])) {
    widgets = widgets.map(item => [item]);
  }
  const compactView = !options.gridLayout;
  const exportItems = widgets.reduce((r, row, rowIndex) => {
    const rowInfo = row.reduce((r, item, colIndex) => {
      const size = item.getSize();
      const backgroundColor = item.option('backgroundColor') || (0, _themes.getTheme)(item.option('theme')).backgroundColor;
      const node = (0, _renderer2.default)(item.element()).find('svg').get(0).cloneNode(true);
      backgroundColor && r.backgroundColors.indexOf(backgroundColor) === -1 && r.backgroundColors.push(backgroundColor);
      r.hOffset = r.width;
      r.width += size.width;
      r.height = Math.max(r.height, size.height);
      r.itemWidth = Math.max(r.itemWidth, size.width);
      r.items.push({
        node,
        width: size.width,
        height: size.height,
        c: colIndex,
        r: rowIndex,
        hOffset: r.hOffset
      });
      return r;
    }, {
      items: [],
      height: 0,
      itemWidth: 0,
      hOffset: 0,
      width: 0,
      backgroundColors: r.backgroundColors
    });
    r.rowOffsets.push(r.totalHeight);
    r.rowHeights.push(rowInfo.height);
    r.totalHeight += rowInfo.height;
    r.items = r.items.concat(rowInfo.items);
    r.itemWidth = Math.max(r.itemWidth, rowInfo.itemWidth);
    r.maxItemLen = Math.max(r.maxItemLen, rowInfo.items.length);
    r.totalWidth = compactView ? Math.max(r.totalWidth, rowInfo.width) : r.maxItemLen * r.itemWidth;
    return r;
  }, {
    items: [],
    rowOffsets: [],
    rowHeights: [],
    itemWidth: 0,
    totalHeight: 0,
    maxItemLen: 0,
    totalWidth: 0,
    backgroundColors: []
  });
  const backgroundColor = `${exportItems.backgroundColors.length === 1 ? exportItems.backgroundColors[0] : ''}`;
  const {
    totalWidth,
    totalHeight
  } = exportItems;
  const rootElement = wrapItemsToElement(totalWidth, totalHeight, backgroundColor, {
    options,
    exportItems,
    compactView
  });
  return {
    root: rootElement,
    width: totalWidth,
    height: totalHeight
  };
};
exports.combineMarkups = combineMarkups;
function wrapItemsToElement(width, height, backgroundColor, _ref) {
  let {
    exportItems,
    options,
    compactView
  } = _ref;
  const rendererWrapper = getRendererWrapper(width, height, backgroundColor);
  const getVOffset = item => {
    const align = options.verticalAlignment;
    const dy = exportItems.rowHeights[item.r] - item.height;
    return exportItems.rowOffsets[item.r] + (align === 'bottom' ? dy : align === 'center' ? dy / 2 : 0);
  };
  const getHOffset = item => {
    if (compactView) {
      return item.hOffset;
    }
    const align = options.horizontalAlignment;
    const colWidth = exportItems.itemWidth;
    const dx = colWidth - item.width;
    return item.c * colWidth + (align === 'right' ? dx : align === 'center' ? dx / 2 : 0);
  };
  exportItems.items.forEach(item => {
    const container = rendererWrapper.createGroup();
    container.attr({
      translateX: getHOffset(item),
      translateY: getVOffset(item)
    });
    container.element.appendChild(item.node);
    container.append();
  });
  const result = rendererWrapper.getRootContent();
  rendererWrapper.dispose();
  return result;
}
let ExportMenu = function (params) {
  const renderer = this._renderer = params.renderer;
  this._incidentOccurred = params.incidentOccurred;
  this._exportTo = params.exportTo;
  this._print = params.print;
  this._shadow = renderer.shadowFilter('-50%', '-50%', '200%', '200%', SHADOW_OFFSET, 6, SHADOW_BLUR);
  this._shadow.attr({
    opacity: 0.8
  });
  this._group = renderer.g().attr({
    'class': EXPORT_CSS_CLASS,
    [_svg.HIDDEN_FOR_EXPORT]: true
  }).linkOn(renderer.root, {
    name: 'export-menu',
    after: 'peripheral'
  });
  this._buttonGroup = renderer.g().attr({
    'class': EXPORT_CSS_CLASS + '-button'
  }).append(this._group);
  this._listGroup = renderer.g().attr({
    'class': EXPORT_CSS_CLASS + '-list'
  }).append(this._group);
  this._overlay = renderer.rect(-LIST_WIDTH + BUTTON_SIZE, BUTTON_SIZE + LIST_PADDING_TOP, LIST_WIDTH, 0);
  this._overlay.attr({
    'stroke-width': LIST_STROKE_WIDTH,
    cursor: 'pointer',
    rx: 4,
    ry: 4,
    filter: this._shadow.id
  });
  this._overlay.data({
    'export-element-type': 'list'
  });
  this.validFormats = getValidFormats();
  this._subscribeEvents();
};
exports.ExportMenu = ExportMenu;
(0, _extend.extend)(ExportMenu.prototype, {
  getLayoutOptions() {
    if (this._hiddenDueToLayout) {
      return {
        width: 0,
        height: 0,
        cutSide: 'vertical',
        cutLayoutSide: 'top'
      };
    }
    const bBox = this._buttonGroup.getBBox();
    bBox.cutSide = 'vertical';
    bBox.cutLayoutSide = 'top';
    bBox.height += MARGIN;
    bBox.position = {
      vertical: 'top',
      horizontal: 'right'
    };
    bBox.verticalAlignment = 'top';
    bBox.horizontalAlignment = 'right';
    return bBox;
  },
  shift(_, y) {
    this._group.attr({
      translateY: this._group.attr('translateY') + y
    });
  },
  draw(width, height, canvas) {
    this._group.move(width - BUTTON_SIZE - SHADOW_OFFSET - SHADOW_BLUR + canvas.left, Math.floor(height / 2 - BUTTON_SIZE / 2));
    const layoutOptions = this.getLayoutOptions();
    if (layoutOptions.width > width || layoutOptions.height > height) {
      this.freeSpace();
    }
    return this;
  },
  show() {
    this._group.linkAppend();
  },
  hide() {
    this._group.linkRemove();
  },
  setOptions(options) {
    this._options = options;
    if (options.formats) {
      options.formats = options.formats.reduce((r, format) => {
        format = validateFormat(format, this._incidentOccurred, this.validFormats);
        format && r.push(format);
        return r;
      }, []);
    } else {
      options.formats = this.validFormats.supported.slice();
    }
    options.printingEnabled = options.printingEnabled === undefined ? true : options.printingEnabled;
    if (options.enabled && (options.formats.length || options.printingEnabled)) {
      this.show();
      this._updateButton();
      this._updateList();
      this._hideList();
    } else {
      this.hide();
    }
  },
  dispose() {
    this._unsubscribeEvents();
    this._group.linkRemove().linkOff();
    this._group.dispose();
    this._shadow.dispose();
  },
  // BaseWidget_layout_implementation
  layoutOptions() {
    return this._options.enabled && {
      horizontalAlignment: 'right',
      verticalAlignment: 'top',
      weak: true
    };
  },
  measure() {
    this._fillSpace();
    const margin = this._options.button.margin;
    return [BUTTON_SIZE + margin.left + margin.right, BUTTON_SIZE + margin.top + margin.bottom];
  },
  move(rect) {
    const margin = this._options.button.margin;
    this._group.attr({
      translateX: Math.round(rect[0]) + margin.left,
      translateY: Math.round(rect[1]) + margin.top
    });
  },
  _fillSpace() {
    this._hiddenDueToLayout = false;
    this.show();
  },
  freeSpace() {
    this._incidentOccurred('W2107');
    this._hiddenDueToLayout = true;
    this.hide();
  },
  // BaseWidget_layout_implementation

  _hideList() {
    this._listGroup.remove();
    this._listShown = false;
    this._setButtonState('default');
    this._menuItems.forEach(item => item.resetState());
  },
  _showList() {
    this._listGroup.append(this._group);
    this._listShown = true;
    this._menuItems.forEach(item => item.fixPosition());
  },
  _setButtonState(state) {
    const style = this._options.button[state];
    this._button.attr({
      stroke: style.borderColor,
      fill: style.backgroundColor
    });
    this._icon.attr({
      fill: style.color
    });
  },
  _subscribeEvents() {
    this._renderer.root.on(_pointer.default.up + '.export', e => {
      const elementType = e.target[EXPORT_DATA_KEY];
      if (!elementType) {
        if (this._button) {
          this._hideList();
        }
        return;
      }
      if (elementType === 'button') {
        if (this._listShown) {
          this._setButtonState('default');
          this._hideList();
        } else {
          this._setButtonState('focus');
          this._showList();
        }
      } else if (elementType === 'printing') {
        this._print();
        this._hideList();
      } else if (elementType === 'exporting') {
        this._exportTo(e.target[FORMAT_DATA_KEY]);
        this._hideList();
      }
    });
    this._listGroup.on(pointerActions, e => e.stopPropagation());
    this._buttonGroup.on(_pointer.default.enter, () => this._setButtonState('hover'));
    this._buttonGroup.on(_pointer.default.leave, () => this._setButtonState(this._listShown ? 'focus' : 'default'));
    this._buttonGroup.on(_pointer.default.down + '.export', () => this._setButtonState('active'));
  },
  _unsubscribeEvents() {
    this._renderer.root.off('.export');
    this._listGroup.off();
    this._buttonGroup.off();
  },
  _updateButton() {
    const renderer = this._renderer;
    const options = this._options;
    const exportData = {
      'export-element-type': 'button'
    };
    if (!this._button) {
      this._button = renderer.rect(0, 0, BUTTON_SIZE, BUTTON_SIZE).append(this._buttonGroup);
      this._button.attr({
        rx: 4,
        ry: 4,
        fill: options.button.default.backgroundColor,
        stroke: options.button.default.borderColor,
        'stroke-width': 1,
        cursor: 'pointer'
      });
      this._button.data(exportData);
      this._icon = renderer.path(ICON_COORDS).append(this._buttonGroup);
      this._icon.attr({
        fill: options.button.default.color,
        cursor: 'pointer'
      });
      this._icon.data(exportData);
      this._buttonGroup.setTitle(_message.default.format('vizExport-titleMenuText'));
    }
  },
  _updateList() {
    const options = this._options;
    const buttonDefault = options.button.default;
    const listGroup = this._listGroup;
    const items = createMenuItems(this._renderer, options);
    this._shadow.attr({
      color: options.shadowColor
    });
    this._overlay.attr({
      height: items.length * MENU_ITEM_HEIGHT + LIST_STROKE_WIDTH * 2,
      fill: buttonDefault.backgroundColor,
      stroke: buttonDefault.borderColor
    });
    listGroup.clear();
    this._overlay.append(listGroup);
    items.forEach(item => item.g.append(listGroup));
    this._menuItems = items;
  }
});

// BaseWidget.js
function getExportOptions(widget, exportOptions, fileName, format) {
  if (format || exportOptions.format) {
    format = validateFormat(format || exportOptions.format, widget._incidentOccurred);
  }
  const {
    width,
    height
  } = widget.getSize();
  return {
    format: format || DEFAULT_EXPORT_FORMAT,
    fileName: fileName || exportOptions.fileName || 'file',
    backgroundColor: exportOptions.backgroundColor,
    width,
    height,
    margin: exportOptions.margin,
    svgToCanvas: exportOptions.svgToCanvas,
    exportingAction: widget._createActionByOption('onExporting', {
      excludeValidators: ['disabled']
    }),
    exportedAction: widget._createActionByOption('onExported', {
      excludeValidators: ['disabled']
    }),
    fileSavingAction: widget._createActionByOption('onFileSaving', {
      excludeValidators: ['disabled']
    })
  };
}
const plugin = exports.plugin = {
  name: 'export',
  init() {
    this._exportMenu = new ExportMenu({
      renderer: this._renderer,
      incidentOccurred: this._incidentOccurred,
      print: () => this.print(),
      exportTo: format => this.exportTo(undefined, format)
    });
    this._layout.add(this._exportMenu);
  },
  dispose() {
    this._exportMenu.dispose();
  },
  members: {
    _getExportMenuOptions() {
      return (0, _extend.extend)({}, this._getOption('export'), {
        rtl: this._getOption('rtlEnabled', true)
      });
    },
    _disablePointerEvents() {
      const pointerEventsValue = this._renderer.root.attr('pointer-events');
      this._renderer.root.attr({
        'pointer-events': 'none'
      });
      return pointerEventsValue;
    },
    exportTo(fileName, format) {
      const menu = this._exportMenu;
      const options = getExportOptions(this, this._getOption('export') || {}, fileName, format);
      menu && menu.hide();
      const pointerEventsValue = this._disablePointerEvents();
      const promise = (0, _exporter.export)(this._renderer.root.element, options, getCreatorFunc(options.format)).fail(_console.logger.error).always(() => {
        this._renderer.root.attr({
          'pointer-events': pointerEventsValue
        });
      });
      menu && menu.show();
      return promise;
    },
    print() {
      const menu = this._exportMenu;
      const options = getExportOptions(this, this._getOption('export') || {});
      options.exportingAction = null;
      options.exportedAction = null;
      options.margin = 0;
      options.format = 'PNG';
      options.useBase64 = true;
      options.fileSavingAction = eventArgs => {
        print(`data:image/png;base64,${eventArgs.data}`, {
          width: options.width,
          __test: options.__test
        });
        eventArgs.cancel = true;
      };
      const pointerEventsValue = this._disablePointerEvents();
      menu && menu.hide();
      const promise = (0, _exporter.export)(this._renderer.root.element, options, getCreatorFunc(options.format)).fail(_console.logger.error).always(() => {
        this._renderer.root.attr({
          'pointer-events': pointerEventsValue
        });
      });
      menu && menu.show();
      return promise;
    }
  },
  customize(constructor) {
    const proto = constructor.prototype;
    constructor.addChange({
      code: 'EXPORT',
      handler() {
        this._exportMenu.setOptions(this._getExportMenuOptions());
        this._change(['LAYOUT']);
      },
      isThemeDependent: true,
      isOptionChange: true,
      option: 'export'
    });

    // TODO: Event options change processing either should be done by the eventTrigger or shouldn't be done at all
    proto._optionChangesMap.onExporting = 'EXPORT';
    proto._optionChangesMap.onExported = 'EXPORT';
    proto._optionChangesMap.onFileSaving = 'EXPORT';
  },
  fontFields: ['export.font']
};
