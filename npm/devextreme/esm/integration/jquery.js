/**
* DevExtreme (esm/integration/jquery.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// eslint-disable-next-line no-restricted-imports
import jQuery from 'jquery';
import { compare as compareVersions } from '../core/utils/version';
import errors from '../core/utils/error';
import useJQueryMethod from './jquery/use_jquery';
const useJQuery = useJQueryMethod();
if (useJQuery && compareVersions(jQuery.fn.jquery, [1, 10]) < 0) {
  throw errors.Error('E0012');
}
import './jquery/renderer';
import './jquery/hooks';
import './jquery/deferred';
import './jquery/hold_ready';
import './jquery/events';
import './jquery/easing';
import './jquery/element_data';
import './jquery/element';
import './jquery/component_registrator';
import './jquery/ajax';
