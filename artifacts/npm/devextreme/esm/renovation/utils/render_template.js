/**
* DevExtreme (esm/renovation/utils/render_template.js)
* Version: 23.2.2
* Build date: Mon Nov 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { render } from 'inferno';
import { createElement } from 'inferno-create-element';
export function renderTemplate(template, props, container) {
  setTimeout(() => {
    render(createElement(template, props), container === null || container === void 0 ? void 0 : container.get(0));
  }, 0);
}
