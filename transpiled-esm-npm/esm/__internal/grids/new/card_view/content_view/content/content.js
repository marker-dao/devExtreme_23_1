import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
/* eslint-disable
  spellcheck/spell-checker
*/
import { isCommandKeyPressed } from '../../../../../../common/core/events/utils';
import { combineClasses } from '../../../../../core/utils/combine_classes';
import { KbnNavigationContainer, withKbnNavigationItem, withKeyDownHandler } from '../../../../../grids/new/grid_core/keyboard_navigation/index';
import { Component, createRef } from 'inferno';
import { Card } from './card/card';
export const CLASSES = {
  content: 'dx-cardview-content',
  grid: 'dx-cardview-content-grid',
  selectCheckBoxesHidden: 'dx-cardview-select-checkboxes-hidden',
  wrapEnabled: 'dx-cardview-word-wrap-enabled'
};
const CardWithKbn = withKeyDownHandler(withKbnNavigationItem(Card));
function getInfernoCardKey(card) {
  if (typeof card.key === 'string' || typeof card.key === 'number') {
    return card.key;
  }
  return undefined;
}
export class Content extends Component {
  constructor() {
    super(...arguments);
    this.containerRef = createRef();
    this.cardElementRefs = [];
    this.focusFirstCardAfterReload = false;
  }
  getCssVariables() {
    var _this$props$cardProps, _this$props$cardProps3, _this$props$cardProps5, _this$props$cardProps7;
    const variables = {};
    if (this.props.cardsPerRow) {
      variables['--dx-cardview-cardsperrow'] = this.props.cardsPerRow;
    }
    if ((_this$props$cardProps = this.props.cardProps) !== null && _this$props$cardProps !== void 0 && _this$props$cardProps.minWidth) {
      var _this$props$cardProps2;
      variables['--dx-cardview-card-min-width'] = `${(_this$props$cardProps2 = this.props.cardProps) === null || _this$props$cardProps2 === void 0 ? void 0 : _this$props$cardProps2.minWidth}px`;
    }
    if ((_this$props$cardProps3 = this.props.cardProps) !== null && _this$props$cardProps3 !== void 0 && _this$props$cardProps3.maxWidth) {
      var _this$props$cardProps4;
      variables['--dx-cardview-card-max-width'] = `${(_this$props$cardProps4 = this.props.cardProps) === null || _this$props$cardProps4 === void 0 ? void 0 : _this$props$cardProps4.maxWidth}px`;
    }
    // @ts-expect-error
    if ((_this$props$cardProps5 = this.props.cardProps) !== null && _this$props$cardProps5 !== void 0 && (_this$props$cardProps5 = _this$props$cardProps5.cover) !== null && _this$props$cardProps5 !== void 0 && _this$props$cardProps5.maxHeight) {
      var _this$props$cardProps6;
      // @ts-expect-error
      variables['--dx-cardview-card-cover-max-height'] = `${(_this$props$cardProps6 = this.props.cardProps) === null || _this$props$cardProps6 === void 0 || (_this$props$cardProps6 = _this$props$cardProps6.cover) === null || _this$props$cardProps6 === void 0 ? void 0 : _this$props$cardProps6.maxHeight}px`;
    }
    // @ts-expect-error
    if ((_this$props$cardProps7 = this.props.cardProps) !== null && _this$props$cardProps7 !== void 0 && (_this$props$cardProps7 = _this$props$cardProps7.cover) !== null && _this$props$cardProps7 !== void 0 && _this$props$cardProps7.ratio) {
      var _this$props$cardProps8;
      // @ts-expect-error
      variables['--dx-cardview-card-cover-ratio'] = `${(_this$props$cardProps8 = this.props.cardProps) === null || _this$props$cardProps8 === void 0 || (_this$props$cardProps8 = _this$props$cardProps8.cover) === null || _this$props$cardProps8 === void 0 ? void 0 : _this$props$cardProps8.ratio}`;
    }
    return variables;
  }
  render() {
    const className = combineClasses({
      [CLASSES.content]: true,
      [CLASSES.grid]: true,
      [CLASSES.selectCheckBoxesHidden]: !!this.props.needToHiddenCheckBoxes,
      [CLASSES.wrapEnabled]: !!this.props.wordWrapEnabled
    });
    const CardItem = this.props.kbnEnabled ? CardWithKbn : Card;
    this.cardElementRefs = new Array(this.props.items.length).fill(undefined).map(() => createRef());
    return createComponentVNode(2, KbnNavigationContainer, {
      "enabled": this.props.kbnEnabled,
      "navigationStrategy": this.props.navigationStrategy,
      "onFocusMoved": (newIdx, element) => {
        this.onCardFocusMoved(newIdx, element);
      },
      children: createVNode(1, "div", className, this.props.items.map((item, idx) => normalizeProps(createComponentVNode(2, CardItem, _extends({}, this.props.cardProps, {
        "elementRef": this.cardElementRefs[idx],
        "navigationIdx": idx,
        "kbnEnabled": this.props.kbnEnabled,
        "navigationStrategy": this.props.navigationStrategy,
        "keyDownConfig": {
          PageUp: () => {
            var _this$props$onPageCha, _this$props;
            (_this$props$onPageCha = (_this$props = this.props).onPageChange) === null || _this$props$onPageCha === void 0 || _this$props$onPageCha.call(_this$props, -1);
            this.focusFirstCardAfterReload = true;
          },
          PageDown: () => {
            var _this$props$onPageCha2, _this$props2;
            (_this$props$onPageCha2 = (_this$props2 = this.props).onPageChange) === null || _this$props$onPageCha2 === void 0 || _this$props$onPageCha2.call(_this$props2, 1);
            this.focusFirstCardAfterReload = true;
          },
          Space: event => {
            var _this$props$cardProps9, _this$props$cardProps10;
            (_this$props$cardProps9 = this.props.cardProps) === null || _this$props$cardProps9 === void 0 || (_this$props$cardProps10 = _this$props$cardProps9.selectCard) === null || _this$props$cardProps10 === void 0 || _this$props$cardProps10.call(_this$props$cardProps9, item, {
              control: isCommandKeyPressed(event),
              shift: event.shiftKey,
              needToUpdateCheckboxes: true
            });
          },
          'Space+shift': event => {
            var _this$props$cardProps11, _this$props$cardProps12;
            (_this$props$cardProps11 = this.props.cardProps) === null || _this$props$cardProps11 === void 0 || (_this$props$cardProps12 = _this$props$cardProps11.selectCard) === null || _this$props$cardProps12 === void 0 || _this$props$cardProps12.call(_this$props$cardProps11, item, {
              control: isCommandKeyPressed(event),
              shift: event.shiftKey,
              needToUpdateCheckboxes: true
            });
          },
          'a+ctrl': () => {
            var _this$props$cardProps13, _this$props$cardProps14;
            (_this$props$cardProps13 = this.props.cardProps) === null || _this$props$cardProps13 === void 0 || (_this$props$cardProps14 = _this$props$cardProps13.onSelectAllCards) === null || _this$props$cardProps14 === void 0 || _this$props$cardProps14.call(_this$props$cardProps13);
          },
          'f+ctrl': () => {
            var _this$props$cardProps15, _this$props$cardProps16;
            (_this$props$cardProps15 = this.props.cardProps) === null || _this$props$cardProps15 === void 0 || (_this$props$cardProps16 = _this$props$cardProps15.onSearchFocus) === null || _this$props$cardProps16 === void 0 || _this$props$cardProps16.call(_this$props$cardProps15);
          },
          'Enter+shift': () => {
            var _this$props$cardProps17, _this$props$cardProps18;
            (_this$props$cardProps17 = this.props.cardProps) === null || _this$props$cardProps17 === void 0 || (_this$props$cardProps18 = _this$props$cardProps17.onEdit) === null || _this$props$cardProps18 === void 0 || _this$props$cardProps18.call(_this$props$cardProps17, item.key, this.cardElementRefs[idx].current ?? undefined);
          },
          Delete: () => {
            var _this$props$cardProps19, _this$props$cardProps20;
            (_this$props$cardProps19 = this.props.cardProps) === null || _this$props$cardProps19 === void 0 || (_this$props$cardProps20 = _this$props$cardProps19.onDelete) === null || _this$props$cardProps20 === void 0 || _this$props$cardProps20.call(_this$props$cardProps19, item.key, this.cardElementRefs[idx].current ?? undefined);
          }
        },
        "caughtEventPreventDefault": true,
        "card": item,
        "onContextMenu": e => {
          var _this$props$showConte, _this$props3;
          (_this$props$showConte = (_this$props3 = this.props).showContextMenu) === null || _this$props$showConte === void 0 || _this$props$showConte.call(_this$props3, e, item, idx);
        },
        "onFocusMoved": (newIdx, element) => {
          this.onCardFocusMoved(newIdx, element);
        }
      }), getInfernoCardKey(item)))), 0, {
        "style": this.getCssVariables(),
        "onContextMenu": this.props.showContextMenu
      }, null, this.containerRef)
    });
  }
  updateSizesInfo() {
    var _this$cardElementRefs, _this$props$onFirstEl, _this$props4, _this$props$onRowHeig, _this$props5;
    const firstCardElement = ((_this$cardElementRefs = this.cardElementRefs[0]) === null || _this$cardElementRefs === void 0 ? void 0 : _this$cardElementRefs.current) ?? undefined;
    (_this$props$onFirstEl = (_this$props4 = this.props).onFirstElementChange) === null || _this$props$onFirstEl === void 0 || _this$props$onFirstEl.call(_this$props4, firstCardElement);
    if (!firstCardElement || !this.containerRef.current) {
      return;
    }
    const cardHeight = firstCardElement.offsetHeight;
    const gapHeight = parseFloat(getComputedStyle(this.containerRef.current).rowGap);
    const rowHeight = cardHeight + gapHeight;
    (_this$props$onRowHeig = (_this$props5 = this.props).onRowHeightChange) === null || _this$props$onRowHeig === void 0 || _this$props$onRowHeig.call(_this$props5, rowHeight);
  }
  componentDidMount() {
    this.updateSizesInfo();
  }
  componentDidUpdate() {
    this.handleFocusPageChange();
    this.updateSizesInfo();
  }
  onCardFocusMoved(newIdx, element) {
    var _cardProps$onFocusedC;
    const {
      items,
      cardProps
    } = this.props;
    cardProps === null || cardProps === void 0 || (_cardProps$onFocusedC = cardProps.onFocusedCardChanged) === null || _cardProps$onFocusedC === void 0 || _cardProps$onFocusedC.call(cardProps, items[newIdx], newIdx, element);
  }
  handleFocusPageChange() {
    const {
      isLoading,
      navigationStrategy
    } = this.props;
    if (!isLoading && this.focusFirstCardAfterReload) {
      this.focusFirstCardAfterReload = false;
      const [, newActiveItem] = navigationStrategy.getNewActiveItem(() => navigationStrategy.setActiveItem(0, true));
      if (newActiveItem) {
        this.onCardFocusMoved(newActiveItem.idx, newActiveItem.element);
      }
    }
  }
}