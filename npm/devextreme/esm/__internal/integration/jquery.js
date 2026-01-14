/**
* DevExtreme (esm/__internal/integration/jquery.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable import/first */
import errors from '../core/utils/m_error';
import { compare as compareVersions } from '../core/utils/m_version';
// eslint-disable-next-line import/no-extraneous-dependencies
import jQuery from 'jquery';
import useJQueryMethod from './jquery/use_jquery';
const useJQuery = useJQueryMethod();
if (useJQuery && compareVersions(jQuery.fn.jquery, [1, 10]) < 0) {
  // @ts-expect-error
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
