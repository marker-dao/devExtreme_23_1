"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _animation = require("../../../common/core/animation");
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _bindable_template = require("../../../core/templates/bindable_template");
var _iterator = require("../../../core/utils/iterator");
var _position = require("../../../core/utils/position");
var _size = require("../../../core/utils/size");
var _type = require("../../../core/utils/type");
var _themes = require("../../../ui/themes");
var _collection_widget = _interopRequireDefault(require("../../ui/collection/collection_widget.async"));
var _constants = require("./constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TOOLBAR_BEFORE_CLASS = 'dx-toolbar-before';
const TOOLBAR_CENTER_CLASS = 'dx-toolbar-center';
const TOOLBAR_AFTER_CLASS = 'dx-toolbar-after';
const TOOLBAR_MINI_CLASS = 'dx-toolbar-mini';
const TOOLBAR_ITEM_CLASS = 'dx-toolbar-item';
const TOOLBAR_LABEL_CLASS = 'dx-toolbar-label';
const TOOLBAR_BUTTON_CLASS = 'dx-toolbar-button';
const TOOLBAR_ITEMS_CONTAINER_CLASS = 'dx-toolbar-items-container';
const TOOLBAR_GROUP_CLASS = 'dx-toolbar-group';
const TOOLBAR_COMPACT_CLASS = 'dx-toolbar-compact';
const TEXT_BUTTON_MODE = 'text';
const DEFAULT_BUTTON_TYPE = 'default';
const DEFAULT_DROPDOWNBUTTON_STYLING_MODE = 'contained';
const TOOLBAR_ITEM_DATA_KEY = 'dxToolbarItemDataKey';
const ANIMATION_TIMEOUT = 15;
class ToolbarBase extends _collection_widget.default {
  _getSynchronizableOptionsForCreateComponent() {
    return super._getSynchronizableOptionsForCreateComponent().filter(item => item !== 'disabled');
  }
  _initTemplates() {
    super._initTemplates();
    const template = new _bindable_template.BindableTemplate(($container, data, rawModel) => {
      if ((0, _type.isPlainObject)(data)) {
        const {
          text,
          html,
          widget
        } = data;
        if (text) {
          $container.text(text).wrapInner('<div>');
        }
        if (html) {
          $container.html(html);
        }
        if (widget === 'dxDropDownButton') {
          data.options = data.options ?? {};
          if (!(0, _type.isDefined)(data.options.stylingMode)) {
            data.options.stylingMode = this.option('useFlatButtons') ? TEXT_BUTTON_MODE : DEFAULT_DROPDOWNBUTTON_STYLING_MODE;
          }
        }
        if (widget === 'dxButton') {
          if (this.option('useFlatButtons')) {
            data.options = data.options ?? {};
            data.options.stylingMode = data.options.stylingMode ?? TEXT_BUTTON_MODE;
          }
          if (this.option('useDefaultButtons')) {
            data.options = data.options ?? {};
            data.options.type = data.options.type ?? DEFAULT_BUTTON_TYPE;
          }
        }
      } else {
        $container.text(String(data));
      }
      this._getTemplate('dx-polymorph-widget').render({
        container: $container,
        model: rawModel,
        parent: this
      });
    }, ['text', 'html', 'widget', 'options'], this.option('integrationOptions.watchMethod'));
    this._templateManager.addDefaultTemplates({
      item: template,
      menuItem: template
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      renderAs: 'topToolbar',
      grouped: false,
      useFlatButtons: false,
      useDefaultButtons: false
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        return (0, _themes.isMaterialBased)((0, _themes.current)());
      },
      // @ts-expect-error ts-error
      options: {
        useFlatButtons: true
      }
    }]);
  }
  _itemContainer() {
    return this._$toolbarItemsContainer.find([`.${TOOLBAR_BEFORE_CLASS}`, `.${TOOLBAR_CENTER_CLASS}`, `.${TOOLBAR_AFTER_CLASS}`].join(','));
  }
  _itemClass() {
    return TOOLBAR_ITEM_CLASS;
  }
  _itemDataKey() {
    return TOOLBAR_ITEM_DATA_KEY;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _dimensionChanged(dimension) {
    if (this._disposed) {
      return;
    }
    this._arrangeItems();
    this._applyCompactMode();
  }
  _initMarkup() {
    this._renderToolbar();
    this._renderSections();
    super._initMarkup();
  }
  _render() {
    super._render();
    this._updateDimensionsInMaterial();
  }
  _postProcessRenderItems() {
    this._arrangeItems();
  }
  _renderToolbar() {
    this.$element().addClass(_constants.TOOLBAR_CLASS);
    this._$toolbarItemsContainer = (0, _renderer.default)('<div>').addClass(TOOLBAR_ITEMS_CONTAINER_CLASS).appendTo(this.$element());
    this.setAria('role', 'toolbar');
  }
  _renderSections() {
    const $container = this._$toolbarItemsContainer;
    (0, _iterator.each)(['before', 'center', 'after'], (_, section) => {
      const sectionClass = `dx-toolbar-${section}`;
      const $section = $container.find(`.${sectionClass}`);
      if (!$section.length) {
        this[`_$${section}Section`] = (0, _renderer.default)('<div>').addClass(sectionClass).attr('role', 'presentation').appendTo($container);
      }
    });
  }
  _arrangeItems(width) {
    var _this$_$centerSection, _this$_$beforeSection, _this$_$afterSection, _$label$position;
    const elementWidth = width ?? (0, _size.getWidth)(this.$element());
    (_this$_$centerSection = this._$centerSection) === null || _this$_$centerSection === void 0 || _this$_$centerSection.css({
      margin: '0 auto',
      float: 'none'
    });
    const beforeRect = (0, _position.getBoundingRect)((_this$_$beforeSection = this._$beforeSection) === null || _this$_$beforeSection === void 0 ? void 0 : _this$_$beforeSection.get(0));
    const afterRect = (0, _position.getBoundingRect)((_this$_$afterSection = this._$afterSection) === null || _this$_$afterSection === void 0 ? void 0 : _this$_$afterSection.get(0));
    this._alignCenterSection(beforeRect, afterRect, elementWidth);
    const $label = this._$toolbarItemsContainer.find(`.${TOOLBAR_LABEL_CLASS}`).eq(0);
    const $section = $label.parent();
    if (!$label.length) {
      return;
    }
    const labelOffset = beforeRect.width ? beforeRect.width : (_$label$position = $label.position()) === null || _$label$position === void 0 ? void 0 : _$label$position.left;
    const widthBeforeSection = $section.hasClass(TOOLBAR_BEFORE_CLASS) ? 0 : labelOffset;
    const widthAfterSection = $section.hasClass(TOOLBAR_AFTER_CLASS) ? 0 : afterRect.width;
    let elemsAtSectionWidth = 0;
    // @ts-expect-error ts error
    $section.children().not(`.${TOOLBAR_LABEL_CLASS}`).each((_, element) => {
      elemsAtSectionWidth += (0, _size.getOuterWidth)(element);
    });
    const freeSpace = elementWidth - elemsAtSectionWidth;
    const sectionMaxWidth = Math.max(freeSpace - widthBeforeSection - widthAfterSection, 0);
    if ($section.hasClass(TOOLBAR_BEFORE_CLASS)) {
      if (this._$beforeSection) {
        this._alignSection(this._$beforeSection, sectionMaxWidth);
      }
    } else {
      const labelPaddings = (0, _size.getOuterWidth)($label) - (0, _size.getWidth)($label);
      $label.css('maxWidth', sectionMaxWidth - labelPaddings);
    }
  }
  _alignCenterSection(beforeRect, afterRect, elementWidth) {
    if (!this._$centerSection) {
      return;
    }
    this._alignSection(this._$centerSection, elementWidth - beforeRect.width - afterRect.width);
    const isRTL = this.option('rtlEnabled');
    const leftRect = isRTL ? afterRect : beforeRect;
    const rightRect = isRTL ? beforeRect : afterRect;
    const centerRect = (0, _position.getBoundingRect)(this._$centerSection.get(0));
    if (leftRect.right > centerRect.left || centerRect.right > rightRect.left) {
      this._$centerSection.css({
        marginLeft: leftRect.width,
        marginRight: rightRect.width,
        float: leftRect.width > rightRect.width ? 'none' : 'right'
      });
    }
  }
  _alignSection($section, maxWidth) {
    const $labels = $section.find(`.${TOOLBAR_LABEL_CLASS}`);
    const labels = $labels.toArray();
    const maxWidthWithoutPaddings = maxWidth - this._getCurrentLabelsPaddings(labels);
    const currentWidth = this._getCurrentLabelsWidth(labels);
    const difference = Math.abs(currentWidth - maxWidthWithoutPaddings);
    if (maxWidthWithoutPaddings < currentWidth) {
      const reversedLabels = labels.reverse();
      this._alignSectionLabels(reversedLabels, difference, false);
    } else {
      this._alignSectionLabels(labels, difference, true);
    }
  }
  _alignSectionLabels(labels, difference, expanding) {
    const getRealLabelWidth = label => (0, _position.getBoundingRect)(label).width;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of, no-plusplus
    for (let i = 0; i < labels.length; i++) {
      const $label = (0, _renderer.default)(labels[i]);
      const currentLabelWidth = Math.ceil(getRealLabelWidth(labels[i]));
      let labelMaxWidth = 0;
      if (expanding) {
        $label.css('maxWidth', 'inherit');
      }
      const width = expanding ? getRealLabelWidth(labels[i]) : currentLabelWidth;
      const possibleLabelWidth = Math.ceil(width);
      if (possibleLabelWidth < difference) {
        labelMaxWidth = expanding ? possibleLabelWidth : 0;
        // eslint-disable-next-line no-param-reassign
        difference -= possibleLabelWidth;
      } else {
        labelMaxWidth = expanding ? currentLabelWidth + difference : currentLabelWidth - difference;
        $label.css('maxWidth', labelMaxWidth);
        break;
      }
      $label.css('maxWidth', labelMaxWidth);
    }
  }
  _applyCompactMode() {
    const $element = (0, _renderer.default)(this.element());
    $element.removeClass(TOOLBAR_COMPACT_CLASS);
    if (this.option('compactMode') && this._getSummaryItemsSize('width', this._itemElements(), true) > (0, _size.getWidth)($element)) {
      $element.addClass(TOOLBAR_COMPACT_CLASS);
    }
  }
  _getCurrentLabelsWidth(labels) {
    let width = 0;
    labels.forEach(label => {
      width += (0, _size.getOuterWidth)(label);
    });
    return width;
  }
  _getCurrentLabelsPaddings(labels) {
    let padding = 0;
    labels.forEach(label => {
      padding += (0, _size.getOuterWidth)(label) - (0, _size.getWidth)(label);
    });
    return padding;
  }
  _renderItem(index, itemData, $container, $itemToReplace) {
    const location = itemData.location ?? 'center';
    const container = $container ?? this[`_$${location}Section`];
    const itemHasText = !!(itemData.text ?? itemData.html);
    const $itemElement = super._renderItem(index, itemData, container, $itemToReplace);
    $itemElement.toggleClass(TOOLBAR_BUTTON_CLASS, !itemHasText).toggleClass(TOOLBAR_LABEL_CLASS, itemHasText).addClass(itemData.cssClass ?? '');
    return $itemElement;
  }
  _renderGroupedItems() {
    (0, _iterator.each)(this.option('items'), (groupIndex, group) => {
      const groupItems = group.items;
      const $container = (0, _renderer.default)('<div>').addClass(TOOLBAR_GROUP_CLASS);
      const location = group.location ?? 'center';
      if (!(groupItems !== null && groupItems !== void 0 && groupItems.length)) {
        return;
      }
      (0, _iterator.each)(groupItems, (itemIndex, item) => {
        this._renderItem(itemIndex, item, $container);
      });
      this._$toolbarItemsContainer.find(`.dx-toolbar-${location}`).append($container);
    });
  }
  _renderItems(items) {
    // @ts-expect-error ts-error
    const grouped = this.option('grouped') && items.length && items[0].items;
    if (grouped) {
      this._renderGroupedItems();
    } else {
      super._renderItems(items);
    }
  }
  _getToolbarItems() {
    const {
      items = []
    } = this.option();
    return items;
  }
  _renderContentImpl() {
    const items = this._getToolbarItems();
    this.$element().toggleClass(TOOLBAR_MINI_CLASS, items.length === 0);
    if (this._renderedItemsCount) {
      this._renderItems(items.slice(this._renderedItemsCount));
    } else {
      this._renderItems(items);
    }
    this._applyCompactMode();
  }
  _renderEmptyMessage() {}
  _clean() {
    this._$toolbarItemsContainer.children().empty();
    this.$element().empty();
    // @ts-expect-error ts-error
    delete this._$beforeSection;
    // @ts-expect-error ts-error
    delete this._$centerSection;
    // @ts-expect-error ts-error
    delete this._$afterSection;
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._arrangeItems();
    }
  }
  _isVisible() {
    return (0, _size.getWidth)(this.$element()) > 0 && (0, _size.getHeight)(this.$element()) > 0;
  }
  _getIndexByItem(item) {
    return this._getToolbarItems().indexOf(item);
  }
  _itemOptionChanged(item, property, value, prevValue) {
    super._itemOptionChanged(item, property, value, prevValue);
    this._arrangeItems();
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case 'width':
        super._optionChanged(args);
        this._dimensionChanged();
        break;
      case 'renderAs':
      case 'useFlatButtons':
      case 'useDefaultButtons':
        this._invalidate();
        break;
      case 'compactMode':
        this._applyCompactMode();
        break;
      case 'grouped':
        break;
      default:
        super._optionChanged(args);
    }
  }
  _dispose() {
    super._dispose();
    clearTimeout(this._waitParentAnimationTimeout);
  }
  _updateDimensionsInMaterial() {
    if ((0, _themes.isMaterial)((0, _themes.current)())) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const _waitParentAnimationFinished = () => new Promise(resolve => {
        const check = () => {
          let readyToResolve = true;
          this.$element().parents().each((_, parent) => {
            // @ts-expect-error ts-error
            if (_animation.fx.isAnimating((0, _renderer.default)(parent))) {
              readyToResolve = false;
              return false;
            }
            return true;
          });
          if (readyToResolve) {
            resolve();
          }
          return readyToResolve;
        };
        const runCheck = () => {
          clearTimeout(this._waitParentAnimationTimeout);
          // eslint-disable-next-line no-restricted-globals
          this._waitParentAnimationTimeout = setTimeout(() => check() || runCheck(), ANIMATION_TIMEOUT);
        };
        runCheck();
      });
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const _checkWebFontForLabelsLoaded = () => {
        const $labels = this.$element().find(`.${TOOLBAR_LABEL_CLASS}`);
        const promises = [];
        $labels.each((_, label) => {
          const text = (0, _renderer.default)(label).text();
          // @ts-expect-error ts-error
          const fontWeight = (0, _renderer.default)(label).css('fontWeight');
          promises.push((0, _themes.waitWebFont)(text, fontWeight));
          return true;
        });
        return Promise.all(promises);
      };
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      Promise.all([_waitParentAnimationFinished(), _checkWebFontForLabelsLoaded()]).then(() => {
        this._dimensionChanged();
      });
    }
  }
}
(0, _component_registrator.default)('dxToolbarBase', ToolbarBase);
var _default = exports.default = ToolbarBase;