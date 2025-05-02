"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Card = exports.CLASSES = void 0;
var _inferno = require("inferno");
var _index = require("../../../../../../../common/core/events/utils/index");
var _index2 = require("../../../../../../../events/index");
var _combine_classes = require("../../../../../../core/utils/combine_classes");
var _index3 = require("../../../../../../grids/new/grid_core/keyboard_navigation/index");
var _cover = require("./cover");
var _field = require("./field");
var _header = require("./header");
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
    this.handleMouseEnter = () => {
      const {
        onHoverChanged,
        card
      } = this.props;
      onHoverChanged === null || onHoverChanged === void 0 || onHoverChanged({
        isHovered: true,
        card
      });
    };
    this.handleMouseLeave = () => {
      const {
        onHoverChanged,
        card
      } = this.props;
      onHoverChanged === null || onHoverChanged === void 0 || onHoverChanged({
        isHovered: false,
        card
      });
    };
    this.handleClick = event => {
      const {
        allowSelectOnClick,
        onClick,
        selectCard,
        card
      } = this.props;
      onClick === null || onClick === void 0 || onClick({
        event,
        card
      });
      if (allowSelectOnClick) {
        selectCard === null || selectCard === void 0 || selectCard(card, {
          control: (0, _index.isCommandKeyPressed)(event),
          shift: event.shiftKey
        });
      }
    };
    this.handleDoubleClick = event => {
      const {
        onDblClick,
        card
      } = this.props;
      onDblClick === null || onDblClick === void 0 || onDblClick({
        event,
        card
      });
    };
    this.handleHold = event => {
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
    const hasCover = cover === null || cover === void 0 ? void 0 : cover.imageExpr;
    const imageSrc = cover === null || cover === void 0 || (_cover$imageExpr = cover.imageExpr) === null || _cover$imageExpr === void 0 ? void 0 : _cover$imageExpr.call(cover, this.props.card.data);
    const alt = cover === null || cover === void 0 || (_cover$altExpr = cover.altExpr) === null || _cover$altExpr === void 0 ? void 0 : _cover$altExpr.call(cover, this.props.card.data);
    return (0, _inferno.createComponentVNode)(2, _index3.KbnFocusTrap, {
      "elementRef": this.containerRef,
      "enabled": this.props.kbnEnabled,
      "tabIndex": this.props.tabIndex,
      "className": className,
      "onDblClick": this.handleDoubleClick,
      "onMouseEnter": this.handleMouseEnter,
      "onMouseLeave": this.handleMouseLeave,
      "onContextMenu": this.props.onContextMenu,
      "onKeyDown": this.props.onKeyDown,
      children: Template ? (0, _inferno.createComponentVNode)(2, Template, {
        "card": card
      }) : (0, _inferno.createFragment)([(0, _inferno.createComponentVNode)(2, _header.CardHeader, {
        "template": (_this$props$header = this.props.header) === null || _this$props$header === void 0 ? void 0 : _this$props$header.template,
        "visible": (_this$props$header2 = this.props.header) === null || _this$props$header2 === void 0 ? void 0 : _this$props$header2.visible,
        "card": card,
        "items": ((_this$props$header3 = this.props.header) === null || _this$props$header3 === void 0 ? void 0 : _this$props$header3.items) ?? [],
        "isCheckBoxesRendered": this.props.isCheckBoxesRendered,
        "selectCard": this.props.selectCard,
        "onEdit": () => {
          var _this$props$onEdit, _this$props;
          (_this$props$onEdit = (_this$props = this.props).onEdit) === null || _this$props$onEdit === void 0 || _this$props$onEdit.call(_this$props, this.props.card.key);
        },
        "onDelete": () => {
          var _this$props$onDelete, _this$props2;
          (_this$props$onDelete = (_this$props2 = this.props).onDelete) === null || _this$props$onDelete === void 0 || _this$props$onDelete.call(_this$props2, this.props.card.key);
        },
        "allowUpdating": this.props.allowUpdating,
        "allowDeleting": this.props.allowDeleting
      }), hasCover && (0, _inferno.createComponentVNode)(2, _cover.Cover, {
        "card": card,
        "template": (_this$props$cover = this.props.cover) === null || _this$props$cover === void 0 ? void 0 : _this$props$cover.template,
        "imageSrc": imageSrc,
        "alt": alt
      }), !!this.props.card.fields.length && (0, _inferno.createVNode)(1, "div", CLASSES.content, ContentTemplate ? (0, _inferno.createComponentVNode)(2, ContentTemplate, {
        "card": card
      }) : this.props.card.fields.map(field => (0, _inferno.createComponentVNode)(2, _field.Field, {
        "fieldHintEnabled": this.props.fieldHintEnabled,
        "field": field,
        "template": field.column.fieldTemplate,
        "captionTemplate": field.column.fieldCaptionTemplate,
        "valueTemplate": field.column.fieldValueTemplate
      })), 0), FooterTemplate && (0, _inferno.createVNode)(1, "div", CLASSES.footer, (0, _inferno.createComponentVNode)(2, FooterTemplate, {
        "card": card
      }), 2)], 0)
    });
  }
  componentDidMount() {
    const {
      onPrepared
    } = this.props;
    if (onPrepared) {
      onPrepared({
        instance: this
      });
    }
    (0, _index2.on)(this.containerRef.current, 'dxclick', this.handleClick);
    if (this.props.onHold) {
      (0, _index2.on)(this.containerRef.current, 'dxhold', this.handleHold);
    }
  }
  componentWillUnmount() {
    (0, _index2.off)(this.containerRef.current, 'dxclick', this.handleClick);
    if (this.props.onHold) {
      (0, _index2.off)(this.containerRef.current, 'dxhold', this.handleHold);
    }
  }
}
exports.Card = Card;