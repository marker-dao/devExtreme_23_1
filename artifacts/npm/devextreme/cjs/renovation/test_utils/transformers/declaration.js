/**
* DevExtreme (cjs/renovation/test_utils/transformers/declaration.js)
* Version: 23.2.2
* Build date: Mon Nov 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

const {
  compileCode
} = require('@devextreme-generator/core');
const {
  getTsConfig
} = require('@devextreme-generator/build-helpers');
const generator = require('@devextreme-generator/inferno').default;
const ts = require('typescript');
const path = require('path');
const fs = require('fs');
const tsJest = require('ts-jest');
const getCacheKey = require('./get_cache_key');
const {
  BASE_GENERATOR_OPTIONS_WITH_JQUERY
} = require('../../../../build/gulp/generator/generator-options');
const THIS_FILE = fs.readFileSync(__filename);
const jestTransformer = tsJest.createTransformer();
const TS_CONFIG_PATH = 'build/gulp/generator/ts-configs/jest.tsconfig.json';
const tsConfig = getTsConfig(TS_CONFIG_PATH);
generator.options = BASE_GENERATOR_OPTIONS_WITH_JQUERY;
module.exports = {
  process(src, filename, config) {
    if (filename.indexOf('test_components') !== -1 && path.extname(filename) === '.tsx') {
      const result = compileCode(generator, src, {
        path: filename,
        dirname: path.dirname(filename)
      }, {
        includeExtraComponents: true
      });
      if (result && result[1]) {
        const componentName = (result[1].code.match(/export default class (\w+) extends/) || [])[1];
        if (!componentName) {
          return '';
        }
        return jestTransformer.process(
        // eslint-disable-next-line spellcheck/spell-checker
        ts.transpileModule( // Vitik: jest.tsconfig set jsxFactory to h. Add import for support it.
        // In propduction jsx transpaled by babel-plugin-inferno
        "import { createElement as h } from \"inferno-create-element\";\n                        ".concat(result[0].code, "\n                ").concat(result[1].code.replace('export default', 'export ').replace(new RegExp("\\b".concat(componentName, "\\b"), 'g'), "".concat(componentName, "Class")).replace(new RegExp("import ".concat(componentName, "Component from\\s+\\S+")), "const ".concat(componentName, "Component = ").concat(componentName))), tsConfig).outputText, filename, config);
      }
    }
    return jestTransformer.process(src, filename, config);
  },
  getCacheKey(fileData, filePath, configStr) {
    return getCacheKey(fileData, filePath, configStr, THIS_FILE);
  }
};
