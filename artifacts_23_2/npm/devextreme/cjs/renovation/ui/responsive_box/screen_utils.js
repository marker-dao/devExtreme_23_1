/**
* DevExtreme (cjs/renovation/ui/responsive_box/screen_utils.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.convertToScreenSizeQualifier = void 0;
const convertToScreenSizeQualifier = width => {
  if (width < 768) {
    return 'xs';
  }
  if (width < 992) {
    return 'sm';
  }
  if (width < 1200) {
    return 'md';
  }
  return 'lg';
};
exports.convertToScreenSizeQualifier = convertToScreenSizeQualifier;