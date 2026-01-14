/**
* DevExtreme (esm/__internal/integration/knockout.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable import/first */
import errors from '../core/utils/m_error';
import { compare as compareVersion } from '../core/utils/m_version';
// eslint-disable-next-line import/no-extraneous-dependencies
import ko from 'knockout';
// Check availability in global environment
if (ko) {
  if (compareVersion(ko.version, [2, 3]) < 0) {
    // @ts-expect-error
    throw errors.Error('E0013');
  }
}
import './knockout/component_registrator';
import './knockout/event_registrator';
import './knockout/components';
import './knockout/validation';
import './knockout/variable_wrapper_utils';
import './knockout/clean_node';
import './knockout/clean_node_old';
