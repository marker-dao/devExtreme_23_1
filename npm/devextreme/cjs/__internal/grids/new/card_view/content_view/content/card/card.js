/**
* DevExtreme (cjs/__internal/grids/new/card_view/content_view/content/card/card.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Card = exports.CLASSES = void 0;
var _inferno = require("inferno");
var _index = require("../../../../../../../common/core/events/utils/index");
var _element = require("../../../../../../../core/element");
var _renderer = _interopRequireDefault(require("../../../../../../../core/renderer"));
var _index2 = require("../../../../../../../events/index");
var _m_guid = require("../../../../../../core/m_guid");
var _combine_classes = require("../../../../../../core/utils/combine_classes");
var _utils = require("../../../../../../grids/new/grid_core/accessibility/utils");
var _index3 = require("../../../../../../grids/new/grid_core/keyboard_navigation/index");
var _cover = require("./cover");
var _field = require("./field");
var _header = require("./header");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable
  @typescript-eslint/no-non-null-assertion,
  spellcheck/spell-checker
*/

const CLASSES = exports.CLASSES = {
  card: 'dx-cardview-card',
  cardHover: 'dx-cardview-card-hoverable',
  content: 'dx-cardview-card-content',
  footer: 'dx-cardview-card-footer',
  selectCard: 'dx-cardview-card-selection'
};
class Card extends _inferno.Component {
  constructor() {
    super(...arguments);
    this.containerRef = (0, _inferno.createRef)();
    this.onHoverChanged = event => {
      var _this$props$onHoverCh, _this$props;
      const args = {
        eventType: event.type,
        card: this.props.card,
        cardElement: (0, _element.getPublicElement)((0, _renderer.default)(this.containerRef.current)),
        event
      };
      (_this$props$onHoverCh = (_this$props = this.props).onHoverChanged) === null || _this$props$onHoverCh === void 0 || _this$props$onHoverCh.call(_this$props, args);
    };
    this.onClick = event => {
      var _this$props$onClick, _this$props2;
      const args = {
        card: this.props.card,
        cardElement: (0, _element.getPublicElement)((0, _renderer.default)(this.containerRef.current)),
        event
      };
      (_this$props$onClick = (_this$props2 = this.props).onClick) === null || _this$props$onClick === void 0 || _this$props$onClick.call(_this$props2, args);
      if (this.props.allowSelectOnClick) {
        var _this$props$selectCar, _this$props3;
        (_this$props$selectCar = (_this$props3 = this.props).selectCard) === null || _this$props$selectCar === void 0 || _this$props$selectCar.call(_this$props3, this.props.card, {
          control: (0, _index.isCommandKeyPressed)(event),
          shift: event.shiftKey
        });
      }
    };
    this.onDblClick = event => {
      var _this$props$onDblClic, _this$props4;
      const args = {
        card: this.props.card,
        cardElement: (0, _element.getPublicElement)((0, _renderer.default)(this.containerRef.current)),
        event
      };
      (_this$props$onDblClic = (_this$props4 = this.props).onDblClick) === null || _this$props$onDblClic === void 0 || _this$props$onDblClic.call(_this$props4, args);
    };
    this.onHold = event => {
      const {
        onHold,
        card
      } = this.props;
      onHold === null || onHold === void 0 || onHold({
        event,
        card
      });
      event.stopPropagation();
    };
  }
  render() {
    var _cover$imageExpr, _cover$altExpr, _this$props$header, _this$props$header2, _this$props$header3, _this$props$cover;
    if (this.props.elementRef) {
      this.containerRef = this.props.elementRef;
    }
    const {
      hoverStateEnabled,
      cover,
      card,
      footerTemplate: FooterTemplate,
      template: Template,
      contentTemplate: ContentTemplate
    } = this.props;
    const className = (0, _combine_classes.combineClasses)({
      [CLASSES.card]: true,
      [CLASSES.cardHover]: !!hoverStateEnabled,
      [CLASSES.selectCard]: !!card.isSelected
    });
    const hasCover = !!(cover !== null && cover !== void 0 && cover.imageExpr) || !!(cover !== null && cover !== void 0 && cover.template);
    const imageSrc = cover === null || cover === void 0 || (_cover$imageExpr = cover.imageExpr) === null || _cover$imageExpr === void 0 ? void 0 : _cover$imageExpr.call(cover, this.props.card.data);
    const alt = cover === null || cover === void 0 || (_cover$altExpr = cover.altExpr) === null || _cover$altExpr === void 0 ? void 0 : _cover$altExpr.call(cover, this.props.card.data);
    const cardRole = Template ? 'presentation' : 'application';
    const coverId = new _m_guid.Guid();
    const contentId = new _m_guid.Guid();
    return (0, _inferno.createComponentVNode)(2, _index3.KbnFocusTrap, {
      "elementRef": this.containerRef,
      "enabled": this.props.kbnEnabled,
      "tabIndex": this.props.tabIndex,
      "className": className,
      "onDblClick": this.onDblClick,
      "onMouseEnter": this.onHoverChanged,
      "onMouseLeave": this.onHoverChanged,
      "onContextMenu": this.props.onContextMenu,
      "onKeyDown": this.props.onKeyDown,
      "role": cardRole,
      "aria-roledescription": (0, _utils.getCardRoleDescription)(this.props.allowUpdating),
      "aria-label": (0, _utils.getCardStateDescription)(this.props.position, this.props.isCheckBoxesRendered, this.props.card.isSelected),
      "aria-describedby": (0, _utils.getCardDescriptiveLabel)(hasCover, coverId, contentId),
      children: Template ? (0, _inferno.createComponentVNode)(2, Template, {
        "card": card
      }) : (0, _inferno.createFragment)([(0, _inferno.createComponentVNode)(2, _header.CardHeader, {
        "template": (_this$props$header = this.props.header) === null || _this$props$header === void 0 ? void 0 : _this$props$header.template,
        "visible": (_this$props$header2 = this.props.header) === null || _this$props$header2 === void 0 ? void 0 : _this$props$header2.visible,
        "card": card,
        "items": (_this$props$header3 = this.props.header) === null || _this$props$header3 === void 0 ? void 0 : _this$props$header3.items,
        "isCheckBoxesRendered": this.props.isCheckBoxesRendered,
        "selectCard": this.props.selectCard,
        "onEdit": () => {
          var _this$props$onEdit, _this$props5;
          (_this$props$onEdit = (_this$props5 = this.props).onEdit) === null || _this$props$onEdit === void 0 || _this$props$onEdit.call(_this$props5, this.props.card.key);
        },
        "onDelete": () => {
          var _this$props$onDelete, _this$props6;
          (_this$props$onDelete = (_this$props6 = this.props).onDelete) === null || _this$props$onDelete === void 0 || _this$props$onDelete.call(_this$props6, this.props.card.key);
        },
        "allowUpdating": this.props.allowUpdating,
        "allowDeleting": this.props.allowDeleting
      }), hasCover && (0, _inferno.createComponentVNode)(2, _cover.Cover, {
        "id": coverId,
        "card": card,
        "template": (_this$props$cover = this.props.cover) === null || _this$props$cover === void 0 ? void 0 : _this$props$cover.template,
        "imageSrc": imageSrc,
        "alt": alt
      }), !!this.props.card.fields.length && (0, _inferno.createVNode)(1, "div", CLASSES.content, ContentTemplate ? (0, _inferno.createComponentVNode)(2, ContentTemplate, {
        "card": card
      }) : this.props.card.fields.map(field => {
        var _this$props$fieldProp, _this$props$fieldProp2;
        return (0, _inferno.createComponentVNode)(2, _field.Field, {
          "fieldHintEnabled": this.props.fieldHintEnabled,
          "field": field,
          "template": field.column.fieldTemplate,
          "captionTemplate": field.column.fieldCaptionTemplate,
          "valueTemplate": field.column.fieldValueTemplate,
          "captionProps": (_this$props$fieldProp = this.props.fieldProps) === null || _this$props$fieldProp === void 0 ? void 0 : _this$props$fieldProp.captionProps,
          "valueProps": (_this$props$fieldProp2 = this.props.fieldProps) === null || _this$props$fieldProp2 === void 0 ? void 0 : _this$props$fieldProp2.valueProps
        });
      }), 0, {
        "id": contentId
      }), FooterTemplate && (0, _inferno.createVNode)(1, "div", CLASSES.footer, (0, _inferno.createComponentVNode)(2, FooterTemplate, {
        "card": card
      }), 2)], 0)
    });
  }
  componentDidMount() {
    var _this$props$onPrepare, _this$props7;
    const onPreparedArgs = {
      cardElement: (0, _element.getPublicElement)((0, _renderer.default)(this.containerRef.current)),
      card: this.props.card
    };
    (_this$props$onPrepare = (_this$props7 = this.props).onPrepared) === null || _this$props$onPrepare === void 0 || _this$props$onPrepare.call(_this$props7, onPreparedArgs);
    (0, _index2.on)(this.containerRef.current, 'dxclick', this.onClick);
    if (this.props.onHold) {
      (0, _index2.on)(this.containerRef.current, 'dxhold', this.onHold);
    }
  }
  componentWillUnmount() {
    (0, _index2.off)(this.containerRef.current, 'dxclick', this.onClick);
    if (this.props.onHold) {
      (0, _index2.off)(this.containerRef.current, 'dxhold', this.onHold);
    }
  }
}
exports.Card = Card;
