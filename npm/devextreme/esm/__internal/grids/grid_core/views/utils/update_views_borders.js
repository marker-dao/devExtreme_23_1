/**
* DevExtreme (esm/__internal/grids/grid_core/views/utils/update_views_borders.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["rowsView"];
import { isDefined } from '../../../../../core/utils/type';
const CLASSES = {
  borderedTop: 'dx-bordered-top-view',
  borderedBottom: 'dx-bordered-bottom-view'
};
const getFirstVisibleViewElement = _ref => {
  let {
    columnHeadersView,
    rowsView
  } = _ref;
  if (columnHeadersView !== null && columnHeadersView !== void 0 && columnHeadersView.isVisible()) {
    return columnHeadersView.element();
  }
  return rowsView.element();
};
const getLastVisibleViewElement = _ref2 => {
  let {
    filterPanelView,
    footerView,
    rowsView
  } = _ref2;
  if (filterPanelView !== null && filterPanelView !== void 0 && filterPanelView.isVisible()) {
    return filterPanelView.element();
  }
  if (footerView !== null && footerView !== void 0 && footerView.isVisible()) {
    return footerView.element();
  }
  return rowsView.element();
};
const getViewElementWithClass = (viewsWithBorder, className) => {
  const borderedView = Object.values(viewsWithBorder).find(view => {
    var _view$element;
    return view === null || view === void 0 || (_view$element = view.element()) === null || _view$element === void 0 ? void 0 : _view$element.hasClass(className);
  });
  return (borderedView === null || borderedView === void 0 ? void 0 : borderedView.element()) ?? null;
};
const shouldUpdateBorders = (viewName, viewsWithBorder) => {
  var _rowsView$element;
  if (!Object.keys(viewsWithBorder).includes(viewName)) {
    return false;
  }
  const {
      rowsView
    } = viewsWithBorder,
    otherViews = _objectWithoutPropertiesLoose(viewsWithBorder, _excluded);
  if (!isDefined(rowsView === null || rowsView === void 0 || (_rowsView$element = rowsView.element) === null || _rowsView$element === void 0 ? void 0 : _rowsView$element.call(rowsView))) {
    return false;
  }
  return Object.values(otherViews).filter(view => {
    var _view$isVisible;
    return view === null || view === void 0 || (_view$isVisible = view.isVisible) === null || _view$isVisible === void 0 ? void 0 : _view$isVisible.call(view);
  }).every(view => isDefined(view === null || view === void 0 ? void 0 : view.element()));
};
export const updateViewsBorders = (viewName, viewsWithBorder) => {
  if (!shouldUpdateBorders(viewName, viewsWithBorder)) {
    return;
  }
  const $oldFirst = getViewElementWithClass(viewsWithBorder, CLASSES.borderedTop);
  const $oldLast = getViewElementWithClass(viewsWithBorder, CLASSES.borderedBottom);
  const $newFirst = getFirstVisibleViewElement(viewsWithBorder);
  const $newLast = getLastVisibleViewElement(viewsWithBorder);
  if ($oldFirst && !$oldFirst.is($newFirst)) {
    $oldFirst.removeClass(CLASSES.borderedTop);
  }
  if ($oldLast && !$oldLast.is($newLast)) {
    $oldLast.removeClass(CLASSES.borderedBottom);
  }
  if (!$newFirst.hasClass(CLASSES.borderedTop)) {
    $newFirst.addClass(CLASSES.borderedTop);
  }
  if (!$newLast.hasClass(CLASSES.borderedBottom)) {
    $newLast.addClass(CLASSES.borderedBottom);
  }
};
