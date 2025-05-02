import { createVNode, createComponentVNode } from "inferno";
import { Component } from 'inferno';
import { Icon } from '../../grid_core/icon';
export const CLASSES = {
  item: 'dx-cardview-header-item',
  button: 'dx-cardview-header-item-button',
  sorting: {
    container: 'dx-cardview-header-item-sorting',
    order: 'dx-cardview-header-item-sorting-order'
  },
  headerFilter: {
    iconEmpty: 'dx-header-filter-icon',
    iconFilled: 'dx-header-filter-icon--selected'
  }
};
function SortIcon(props) {
  return createVNode(1, "div", CLASSES.sorting.container, [props.sortOrder === 'asc' && createComponentVNode(2, Icon, {
    "name": 'arrowsortup'
  }), props.sortOrder === 'desc' && createComponentVNode(2, Icon, {
    "name": 'arrowsortdown'
  }), props.showSortIndex && createVNode(1, "div", CLASSES.sorting.order, props.sortIndex, 0)], 0);
}
export class Item extends Component {
  constructor() {
    super(...arguments);
    this.onFilterClickHandler = event => {
      var _this$props$elementRe;
      event.stopPropagation();
      if ((_this$props$elementRe = this.props.elementRef) !== null && _this$props$elementRe !== void 0 && _this$props$elementRe.current) {
        var _this$props$onFilterC, _this$props;
        (_this$props$onFilterC = (_this$props = this.props).onFilterClick) === null || _this$props$onFilterC === void 0 || _this$props$onFilterC.call(_this$props, this.props.elementRef.current);
      }
    };
  }
  render() {
    var _this$props$column;
    const Template = this.props.column.headerItemTemplate ?? this.props.template;
    const cssClass = `${CLASSES.item} ${this.props.column.headerItemCssClass ?? ''} ${this.props.cssClass ?? ''}`;
    const {
      filterType,
      filterValues
    } = this.props.column;
    const hasHeaderFilterValue = filterType === 'exclude' || !!(filterValues !== null && filterValues !== void 0 && filterValues.length);
    const headerFilterIconClass = [CLASSES.headerFilter.iconEmpty, hasHeaderFilterValue ? CLASSES.headerFilter.iconFilled : ''].join(' ');
    const icon = this.props.status && {
      forbid: createComponentVNode(2, Icon, {
        "name": 'cursorprohibition'
      }),
      moving: createComponentVNode(2, Icon, {
        "name": 'cursormove'
      }),
      none: undefined
    }[this.props.status];
    const showSortIcon = !this.props.isDragging && this.props.column.sortOrder !== undefined;
    const showHeaderFilterIcon = !this.props.isDragging && ((_this$props$column = this.props.column) === null || _this$props$column === void 0 ? void 0 : _this$props$column.allowHeaderFiltering);
    return createVNode(1, "div", cssClass, [icon, Template && createComponentVNode(2, Template, {
      "column": this.props.column
    }), !Template && this.props.column.caption, showSortIcon && createComponentVNode(2, SortIcon, {
      "sortIndex": this.props.column.sortIndex + 1,
      "sortOrder": this.props.column.sortOrder,
      "showSortIndex": this.props.showSortIndexes ?? false
    }), showHeaderFilterIcon && createComponentVNode(2, Icon, {
      "name": 'filter',
      "className": headerFilterIconClass,
      "onClick": this.onFilterClickHandler
    })], 0, {
      "tabindex": this.props.tabIndex,
      "onClick": this.props.onSortClick,
      "onKeyDown": this.props.onKeyDown,
      "onContextMenu": this.props.onContextMenu
    }, null, this.props.elementRef);
  }
}