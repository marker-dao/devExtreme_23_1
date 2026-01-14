/**
* DevExtreme (esm/__internal/integration/jquery/easing.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { setEasing } from '../../common/core/animation/easing';
// eslint-disable-next-line import/no-extraneous-dependencies
import jQuery from 'jquery';
if (jQuery) {
  setEasing(jQuery.easing);
}
