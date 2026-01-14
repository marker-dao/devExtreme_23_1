/**
* DevExtreme (esm/__internal/integration/knockout/clean_node.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { afterCleanData, cleanData, strategyChanging } from '../../core/m_element_data';
import { compare as compareVersion } from '../../core/utils/m_version';
// eslint-disable-next-line import/no-extraneous-dependencies
import ko from 'knockout';
import { getClosestNodeWithKoCreation } from './utils';
if (ko) {
  const originalKOCleanExternalData = ko.utils.domNodeDisposal.cleanExternalData;
  const patchCleanData = () => {
    afterCleanData(nodes => {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < nodes.length; i += 1) {
        nodes[i].cleanedByJquery = true;
      }
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < nodes.length; i += 1) {
        if (!nodes[i].cleanedByKo) {
          ko.cleanNode(nodes[i]);
        }
        delete nodes[i].cleanedByKo;
      }
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < nodes.length; i += 1) {
        delete nodes[i].cleanedByJquery;
      }
    });
    ko.utils.domNodeDisposal.cleanExternalData = node => {
      node.cleanedByKo = true;
      if (getClosestNodeWithKoCreation(node)) {
        if (!node.cleanedByJquery) {
          cleanData([node]);
        }
      }
    };
  };
  const restoreOriginCleanData = () => {
    afterCleanData(() => {});
    ko.utils.domNodeDisposal.cleanExternalData = originalKOCleanExternalData;
  };
  patchCleanData();
  strategyChanging.add(strategy => {
    const isJQuery = !!strategy.fn;
    if (isJQuery && compareVersion(strategy.fn.jquery, [2, 0]) < 0) {
      restoreOriginCleanData();
    }
  });
}
