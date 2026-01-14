/**
* DevExtreme (esm/__internal/ui/shared/accessibility.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import eventsEngine from '../../../common/core/events/core/events_engine';
import { normalizeKeyName } from '../../../common/core/events/utils/index';
import domAdapter from '../../../core/dom_adapter';
import $ from '../../../core/renderer';
import { noop } from '../../../core/utils/common';
import { extend } from '../../../core/utils/extend';
const FOCUS_STATE_CLASS = 'dx-state-focused';
const FOCUS_DISABLED_CLASS = 'dx-cell-focus-disabled';
const FOCUSED_ROW_SELECTOR = '.dx-row-focused';
const GRID_ROW_SELECTOR = '.dx-datagrid-rowsview .dx-row';
const GRID_CELL_SELECTOR = `${GRID_ROW_SELECTOR} > td`;
const TREELIST_ROW_SELECTOR = '.dx-treelist-rowsview .dx-row';
const TREELIST_CELL_SELECTOR = `${TREELIST_ROW_SELECTOR} > td`;
const viewItemSelectorMap = {
  groupPanel: ['.dx-datagrid-group-panel .dx-group-panel-item[tabindex]'],
  columnHeaders: ['.dx-datagrid-headers .dx-header-row > td.dx-datagrid-action', '.dx-treelist-headers .dx-header-row > td.dx-treelist-action'],
  filterRow: ['.dx-datagrid-headers .dx-datagrid-filter-row .dx-editor-cell .dx-texteditor-input', '.dx-treelist-headers .dx-treelist-filter-row .dx-editor-cell .dx-texteditor-input'],
  rowsView: [`${FOCUSED_ROW_SELECTOR}`, `${GRID_ROW_SELECTOR}[tabindex]`, `${GRID_CELL_SELECTOR}[tabindex]`, `${GRID_CELL_SELECTOR}`, `${TREELIST_ROW_SELECTOR}[tabindex]`, `${TREELIST_CELL_SELECTOR}[tabindex]`, `${TREELIST_CELL_SELECTOR}`],
  footer: ['.dx-datagrid-total-footer .dx-datagrid-summary-item', '.dx-treelist-total-footer .dx-treelist-summary-item'],
  filterPanel: ['.dx-datagrid-filter-panel .dx-icon-filter', '.dx-treelist-filter-panel .dx-icon-filter'],
  pager: ['.dx-datagrid-pager [tabindex]', '.dx-treelist-pager [tabindex]']
};
let isMouseDown = false;
let isHiddenFocusing = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let focusedElementInfo = null;
let needToSkipFocusin = false;
function getActiveAccessibleElements(ariaLabel, viewElement) {
  const $viewElement = $(viewElement);
  let $activeElements = $();
  if (ariaLabel) {
    const escapedAriaLabel = ariaLabel === null || ariaLabel === void 0 ? void 0 : ariaLabel.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    $activeElements = $viewElement.find(`[aria-label="${escapedAriaLabel}"][tabindex]`);
  } else {
    $activeElements = $viewElement.find('[tabindex]');
  }
  return $activeElements;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function saveFocusedElementInfo(target, instance) {
  const $target = $(target);
  const ariaLabel = $target.attr('aria-label');
  const $activeElements = getActiveAccessibleElements(ariaLabel, instance.element());
  const targetIndex = $activeElements.index($target);
  focusedElementInfo = extend({}, {
    ariaLabel,
    index: targetIndex
  }, {
    viewInstance: instance
  });
}
function fireKeyDownEvent(instance, event, executeAction) {
  const args = {
    event,
    handled: false
  };
  if (executeAction) {
    executeAction(args);
  } else {
    instance._createActionByOption('onKeyDown')(args);
  }
  return args.handled;
}
function findFocusedViewElement(instanceRootDomNode, viewSelectors, element) {
  const root = instanceRootDomNode ?? (element === null || element === void 0 ? void 0 : element.getRootNode()) ?? domAdapter.getDocument();
  if (!root) {
    return;
  }
  const $root = $(root);
  // eslint-disable-next-line no-restricted-syntax,guard-for-in
  for (const index in viewSelectors) {
    const selector = viewSelectors[index];
    const $focusViewElement = $root.find(selector).first();
    if ($focusViewElement.length) {
      // eslint-disable-next-line consistent-return
      return $focusViewElement;
    }
  }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function selectView(viewName, instance, event) {
  const keyName = normalizeKeyName(event);
  if (event.ctrlKey && (keyName === 'upArrow' || keyName === 'downArrow')) {
    var _instance$component, _instance$component$e;
    const viewNames = Object.keys(viewItemSelectorMap);
    let viewItemIndex = viewNames.indexOf(viewName);
    const instanceRootDomNode = instance === null || instance === void 0 || (_instance$component = instance.component) === null || _instance$component === void 0 || (_instance$component$e = _instance$component.element) === null || _instance$component$e === void 0 ? void 0 : _instance$component$e.call(_instance$component);
    while (viewItemIndex >= 0 && viewItemIndex < viewNames.length) {
      viewItemIndex += keyName === 'upArrow' ? -1 : 1;
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const viewName = viewNames[viewItemIndex];
      const viewSelectors = viewItemSelectorMap[viewName];
      const $focusViewElement = findFocusedViewElement(instanceRootDomNode, viewSelectors, event.target);
      if ($focusViewElement !== null && $focusViewElement !== void 0 && $focusViewElement.length) {
        $focusViewElement.attr('tabindex', instance.option('tabindex') || 0);
        // @ts-expect-error ts-error
        eventsEngine.trigger($focusViewElement, 'focus');
        $focusViewElement.removeClass(FOCUS_DISABLED_CLASS);
        break;
      }
    }
  }
}
function processKeyDown(viewName, instance, event, action, $mainElement, executeKeyDown) {
  const isHandled = fireKeyDownEvent(instance, event.originalEvent, executeKeyDown);
  if (isHandled) {
    return;
  }
  const keyName = normalizeKeyName(event);
  if (keyName === 'enter' || keyName === 'space') {
    saveFocusedElementInfo(event.target, instance);
    action === null || action === void 0 || action({
      event
    });
  } else if (keyName === 'tab') {
    $mainElement.addClass(FOCUS_STATE_CLASS);
  } else {
    selectView(viewName, instance, event);
  }
}
function onDocumentVisibilityChange() {
  const focusedElement = domAdapter.getActiveElement();
  needToSkipFocusin = focusedElement && !focusedElement.closest(`.${FOCUS_STATE_CLASS}`);
}
export function subscribeVisibilityChange() {
  eventsEngine.on(domAdapter.getDocument(), 'visibilitychange', onDocumentVisibilityChange);
}
export function unsubscribeVisibilityChange() {
  eventsEngine.off(domAdapter.getDocument(), 'visibilitychange', onDocumentVisibilityChange);
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function hiddenFocus(element, preventScroll) {
  isHiddenFocusing = true;
  element.focus({
    preventScroll
  });
  isHiddenFocusing = false;
}
export function registerKeyboardAction(viewName,
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
instance,
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
$element,
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
selector,
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
action,
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
executeKeyDown) {
  const {
    useLegacyKeyboardNavigation
  } = instance.option();
  if (useLegacyKeyboardNavigation) {
    return noop;
  }
  const getMainElement = () => $(instance.element());
  const keyDownHandler = e => processKeyDown(viewName, instance, e, action, getMainElement(), executeKeyDown);
  const mouseDownHandler = () => {
    isMouseDown = true;
    getMainElement().removeClass(FOCUS_STATE_CLASS);
  };
  const focusinHandler = () => {
    if (needToSkipFocusin) {
      needToSkipFocusin = false;
      return;
    }
    const needShowOverlay = !isMouseDown && !isHiddenFocusing;
    if (needShowOverlay) {
      getMainElement().addClass(FOCUS_STATE_CLASS);
    }
    isMouseDown = false;
  };
  const mouseUpHandler = () => {
    isMouseDown = false;
  };
  eventsEngine.on($element, 'keydown', selector, keyDownHandler);
  eventsEngine.on($element, 'mousedown', selector, mouseDownHandler);
  eventsEngine.on($element, 'focusin', selector, focusinHandler);
  eventsEngine.on($element, 'mouseup contextmenu', selector, mouseUpHandler);
  return () => {
    // @ts-expect-error ts-error
    eventsEngine.off($element, 'keydown', selector, keyDownHandler);
    // @ts-expect-error ts-error
    eventsEngine.off($element, 'mousedown', selector, mouseDownHandler);
    // @ts-expect-error ts-error
    eventsEngine.off($element, 'focusin', selector, focusinHandler);
    // @ts-expect-error ts-error
    eventsEngine.off($element, 'mouseup contextmenu', selector, mouseUpHandler);
  };
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function restoreFocus(instance) {
  if (!instance.option('useLegacyKeyboardNavigation') && focusedElementInfo) {
    const {
      viewInstance
    } = focusedElementInfo;
    if (viewInstance) {
      const $activeElements = getActiveAccessibleElements(focusedElementInfo.ariaLabel, viewInstance.element());
      const $targetElement = $activeElements.eq(focusedElementInfo.index);
      focusedElementInfo = null;
      // @ts-expect-error ts-error
      eventsEngine.trigger($targetElement, 'focus');
    }
  }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function setTabIndex(instance, $element) {
  const {
    useLegacyKeyboardNavigation
  } = instance.option();
  if (!useLegacyKeyboardNavigation) {
    $element.attr('tabindex', instance.option('tabindex') || 0);
  }
}
