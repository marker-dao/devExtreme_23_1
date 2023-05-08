!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.core/utils.size.tests.js"], ["jquery","core/utils/size","core/utils/browser"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.core/utils.size.tests.js", ["jquery", "core/utils/size", "core/utils/browser"], function($__export) {
  "use strict";
  var $,
      sizeUtils,
      getHeight,
      getWidth,
      getInnerHeight,
      getInnerWidth,
      getOuterHeight,
      getOuterWidth,
      browser,
      testStyles,
      windowHeight;
  function getScrollbarThickness() {
    if (browser.mozilla) {
      return 0;
    }
    var scrollbarTest = $('<div>').css({
      width: '100px',
      height: '100px',
      overflow: 'scroll'
    }).appendTo('#qunit-fixture').get(0);
    var scrollbarWidth = scrollbarTest.offsetWidth - scrollbarTest.clientWidth;
    $(scrollbarTest).remove();
    return scrollbarWidth;
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      sizeUtils = $__m.default;
      getHeight = $__m.getHeight;
      getWidth = $__m.getWidth;
      getInnerHeight = $__m.getInnerHeight;
      getInnerWidth = $__m.getInnerWidth;
      getOuterHeight = $__m.getOuterHeight;
      getOuterWidth = $__m.getOuterWidth;
    }, function($__m) {
      browser = $__m.default;
    }],
    execute: function() {
      testStyles = ['', 'width: 40px; height: 50px;', 'width: 50%; height: 50%;', 'width: inherit; height: inherit;', 'width: auto; height: auto;'];
      windowHeight = $(window).height();
      QUnit.module('get width and height', {
        beforeEach: function() {
          this.$parent = $('<div style=\'width: 100px; height: 110px\'></div>').appendTo('#qunit-fixture');
          this.$element = $('<div/>');
          this.$element.appendTo(this.$parent);
        },
        afterEach: function() {}
      });
      QUnit.test('element in parent with fixed size', function(assert) {
        var expected = [{
          width: 100,
          height: 0
        }, {
          width: 40,
          height: 50
        }, {
          width: 50,
          height: 55
        }, {
          width: 100,
          height: 110
        }, {
          width: 100,
          height: 0
        }];
        for (var i = 0; i < testStyles.length; i++) {
          this.$element.attr('style', testStyles[i]);
          assert.equal(getWidth(this.$element[0]), expected[i].width);
          assert.equal(getHeight(this.$element[0]), expected[i].height);
        }
      });
      QUnit.test('invisible element in parent with fixed size', function(assert) {
        var that = this;
        var testParams = [{
          style: 'display: none;',
          width: 0,
          height: 0
        }, {
          style: 'width: 40px; height: 50px; display: none;',
          width: 40,
          height: 50
        }, {
          style: 'width: inherit; height: inherit; display: none;',
          width: 100,
          height: 110
        }, {
          style: 'width: auto; height: auto; display: none;',
          width: 0,
          height: 0
        }];
        testParams.forEach(function(params) {
          that.$element.attr('style', params.style);
          assert.equal(getWidth(that.$element[0]), params.width);
          assert.equal(getHeight(that.$element[0]), params.height);
        });
      });
      QUnit.test('element with padding, marging, border without params', function(assert) {
        var expected;
        var i;
        expected = [{
          width: 80,
          height: 0
        }, {
          width: 40,
          height: 50
        }, {
          width: 50,
          height: 55
        }, {
          width: 100,
          height: 110
        }, {
          width: 80,
          height: 0
        }];
        for (i = 0; i < testStyles.length; i++) {
          this.$element.attr('style', testStyles[i] + ' padding: 10px;');
          assert.equal(getWidth(this.$element[0]), expected[i].width);
          assert.equal(getHeight(this.$element[0]), expected[i].height);
          this.$element.attr('style', testStyles[i] + ' margin: 10px;');
          assert.equal(getWidth(this.$element[0]), expected[i].width);
          assert.equal(getHeight(this.$element[0]), expected[i].height);
        }
        expected = [{
          width: 96,
          height: 0
        }, {
          width: 40,
          height: 50
        }, {
          width: 50,
          height: 55
        }, {
          width: 100,
          height: 110
        }, {
          width: 96,
          height: 0
        }];
        for (i = 0; i < testStyles.length; i++) {
          this.$element.attr('style', testStyles[i] + ' border: 2px solid black;');
          assert.equal(getWidth(this.$element[0]), expected[i].width);
          assert.equal(getHeight(this.$element[0]), expected[i].height);
        }
      });
      QUnit.test('element with padding, marging, border with params', function(assert) {
        this.$element.attr('style', 'width: 40px; height: 50px; padding: 5px; margin: 10px; border: 2px solid black;');
        assert.equal(getWidth(this.$element[0]), 40);
        assert.equal(getHeight(this.$element[0]), 50);
        assert.equal(getInnerWidth(this.$element[0]), 50);
        assert.equal(getInnerHeight(this.$element[0]), 60);
        assert.equal(getOuterWidth(this.$element[0]), 54);
        assert.equal(getOuterHeight(this.$element[0]), 64);
        assert.equal(getOuterWidth(this.$element[0], true), 74);
        assert.equal(getOuterHeight(this.$element[0], true), 84);
      });
      QUnit.test('element with box-sizing = border-box', function(assert) {
        var expected;
        var i;
        var iteration = 0;
        expected = [{
          width: 100,
          height: 0
        }, {
          width: 40,
          height: 50
        }, {
          width: 50,
          height: 55
        }, {
          width: 100,
          height: 110
        }, {
          width: 100,
          height: 0
        }];
        for (i = 0; i < testStyles.length; i++) {
          this.$element.attr('style', testStyles[i] + ' box-sizing: border-box;');
          assert.equal(getWidth(this.$element[0]), expected[i].width, (iteration + "." + i + "-width"));
          assert.equal(getHeight(this.$element[0]), expected[i].height, (iteration + "." + i + "-height"));
        }
        iteration = 1;
        expected = [{
          width: 80,
          height: 0
        }, {
          width: 40,
          height: 50
        }, {
          width: 50,
          height: 55
        }, {
          width: 100,
          height: 110
        }, {
          width: 80,
          height: 0
        }];
        for (i = 0; i < testStyles.length; i++) {
          this.$element.attr('style', testStyles[i] + ' margin: 10px; box-sizing: border-box;');
          assert.equal(getWidth(this.$element[0]), expected[i].width, (iteration + "." + i + "-width"));
          assert.equal(getHeight(this.$element[0]), expected[i].height, (iteration + "." + i + "-height"));
        }
        iteration = 2;
        expected = [{
          width: 80,
          height: 0
        }, {
          width: 20,
          height: 30
        }, {
          width: 30,
          height: 35
        }, {
          width: 80,
          height: 90
        }, {
          width: 80,
          height: 0
        }];
        for (i = 0; i < testStyles.length; i++) {
          this.$element.attr('style', testStyles[i] + ' padding: 10px; box-sizing: border-box;');
          assert.equal(getWidth(this.$element[0]), expected[i].width, (iteration + "." + i + "-width"));
          assert.equal(getHeight(this.$element[0]), expected[i].height, (iteration + "." + i + "-height"));
        }
        iteration = 3;
        expected = [{
          width: 96,
          height: 0
        }, {
          width: 36,
          height: 46
        }, {
          width: 46,
          height: 51
        }, {
          width: 96,
          height: 106
        }, {
          width: 96,
          height: 0
        }];
        for (i = 0; i < testStyles.length; i++) {
          this.$element.attr('style', testStyles[i] + ' border: 2px solid black; box-sizing: border-box;');
          assert.equal(getWidth(this.$element[0]), expected[i].width, (iteration + "." + i + "-width"));
          assert.equal(getHeight(this.$element[0]), expected[i].height), (iteration + "." + i + "-height");
        }
      });
      QUnit.test('element with box-sizing = border-box and parent is invisible', function(assert) {
        this.$parent.attr('style', 'width: 100px; height: 110px; display: none;');
        this.$element.attr('style', 'width: 100%; height: 100%; box-sizing: border-box;');
        assert.equal(getWidth(this.$element[0]), 100);
        assert.equal(getHeight(this.$element[0]), 100);
        this.$parent.attr('style', 'width: 100px; height: 110px; display: none;');
        this.$element.attr('style', 'width: 100%; height: 100%; padding: 10px; box-sizing: border-box;');
        assert.equal(getOuterWidth(this.$element[0]), 100);
        assert.equal(getOuterHeight(this.$element[0]), 100);
        this.$parent.attr('style', 'width: 100px; height: 110px; display: none;');
        this.$element.attr('style', 'width: 40px; height: 50px; padding: 10px; box-sizing: border-box;');
        assert.equal(getWidth(this.$element[0]), 20);
        assert.equal(getHeight(this.$element[0]), 30);
      });
      QUnit.test('element is not in a DOM', function(assert) {
        this.$freeElement = $('<div/>');
        var expected = [{
          width: 0,
          height: 0
        }, {
          width: 40,
          height: 50
        }, {
          width: 50,
          height: 50
        }, {
          width: 0,
          height: 0
        }, {
          width: 0,
          height: 0
        }];
        for (var i = 0; i < testStyles.length; i++) {
          this.$freeElement.attr('style', testStyles[i]);
          assert.equal(getWidth(this.$freeElement[0]), expected[i].width);
          assert.equal(getHeight(this.$freeElement[0]), expected[i].height);
          this.$freeElement.attr('style', testStyles[i] + ' display: none;');
          assert.equal(getWidth(this.$freeElement[0]), expected[i].width);
          assert.equal(getHeight(this.$freeElement[0]), expected[i].height);
          this.$freeElement.attr('style', testStyles[i] + ' box-sizing: border-box;');
          assert.equal(getWidth(this.$freeElement[0]), expected[i].width);
          assert.equal(getHeight(this.$freeElement[0]), expected[i].height);
        }
      });
      QUnit.module('getElementBoxParams');
      QUnit.test('element in parent with fixed size', function(assert) {
        var $element = $('<div>').appendTo('#qunit-fixture');
        var element = $element.get(0);
        $element.attr('style', 'width: 40px; height: 50px; border: 1px solid black; padding: 3px 4px; margin: 5px 6px');
        var computedStyles = window.getComputedStyle(element);
        assert.deepEqual(sizeUtils.getElementBoxParams('width', computedStyles), {
          border: 2,
          margin: 12,
          padding: 8
        }, 'element borders, paddings and margins were computed correctly');
        assert.deepEqual(sizeUtils.getElementBoxParams('height', computedStyles), {
          border: 2,
          margin: 10,
          padding: 6
        }, 'element borders, paddings and margins were computed correctly');
      });
      QUnit.module('calculate height', {beforeEach: function() {
          this.container = $('<div style=\'width: 100px; height: 100px; padding: 10px; box-sizing: border-box; margin: 5px\'></div>').appendTo('#qunit-fixture').get(0);
          this.invisibleElement = $('<div style=\'width: 50px; height: 50px; display: none; padding: 5px;\'></div>').get(0);
          $(this.container).append(this.invisibleElement);
        }});
      QUnit.test('check addOffsetToMaxHeight', function(assert) {
        var checkFunc = function($__1, expected) {
          var $__2 = $__1,
              value = $__2.value,
              offset = $__2.offset,
              container = $__2.container;
          assert.strictEqual(sizeUtils.addOffsetToMaxHeight(value, offset, container), expected);
        };
        checkFunc({
          value: 300,
          offset: 0,
          container: null
        }, 300);
        checkFunc({
          value: 300,
          offset: -100,
          container: null
        }, 200);
        checkFunc({
          value: '300',
          offset: -100,
          container: null
        }, 200);
        checkFunc({
          value: '300px',
          offset: -100,
          container: null
        }, 200);
        checkFunc({
          value: '100mm',
          offset: -50,
          container: null
        }, 'calc(100mm - 50px)');
        checkFunc({
          value: '100pt',
          offset: -50,
          container: null
        }, 'calc(100pt - 50px)');
        checkFunc({
          value: 'auto',
          offset: -50,
          container: null
        }, 'none');
        checkFunc({
          value: 'auto',
          offset: 0,
          container: null
        }, 'auto');
        checkFunc({
          value: null,
          offset: -50,
          container: null
        }, 'none');
        assert.roughEqual(sizeUtils.addOffsetToMaxHeight('50%', -20, window), windowHeight / 2 - 20, 1, 'string value in percent');
        assert.roughEqual(sizeUtils.addOffsetToMaxHeight('50%', -20, this.container), 30, 1, 'string value in percent with specific container');
      });
      QUnit.test('check addOffsetToMinHeight', function(assert) {
        var checkFunc = function($__1, expected) {
          var $__2 = $__1,
              value = $__2.value,
              offset = $__2.offset,
              container = $__2.container;
          assert.strictEqual(sizeUtils.addOffsetToMinHeight(value, offset, container), expected);
        };
        checkFunc({
          value: 300,
          offset: 0,
          container: null
        }, 300);
        checkFunc({
          value: 300,
          offset: -100,
          container: null
        }, 200);
        checkFunc({
          value: '300',
          offset: -100,
          container: null
        }, 200);
        checkFunc({
          value: '300px',
          offset: -100,
          container: null
        }, 200);
        checkFunc({
          value: '100mm',
          offset: -50,
          container: null
        }, 'calc(100mm - 50px)');
        checkFunc({
          value: '100pt',
          offset: -50,
          container: null
        }, 'calc(100pt - 50px)');
        checkFunc({
          value: 'auto',
          offset: -50,
          container: null
        }, 0);
        checkFunc({
          value: 'auto',
          offset: 0,
          container: null
        }, 'auto');
        checkFunc({
          value: null,
          offset: -50,
          container: null
        }, 0);
        assert.roughEqual(sizeUtils.addOffsetToMinHeight('50%', -20, window), windowHeight / 2 - 20, 1, 'string value in percent');
        assert.roughEqual(sizeUtils.addOffsetToMaxHeight('50%', -20, this.container), 30, 1, 'string value in percent with specific container');
      });
      QUnit.test('check getVerticalOffsets', function(assert) {
        assert.strictEqual(sizeUtils.getVerticalOffsets(null), 0, 'no element');
        assert.strictEqual(sizeUtils.getVerticalOffsets(this.container), 20, 'container paddings');
        assert.strictEqual(sizeUtils.getVerticalOffsets(this.container, true), 30, 'include margins');
        assert.strictEqual(sizeUtils.getVerticalOffsets(this.invisibleElement), 10, 'invisible element paddings');
      });
      QUnit.test('check getVisibleHeight', function(assert) {
        assert.strictEqual(sizeUtils.getVerticalOffsets(null), 0, 'no element');
        assert.strictEqual(sizeUtils.getVisibleHeight(this.container), 100, 'container height');
        assert.strictEqual(sizeUtils.getVisibleHeight(this.invisibleElement), 0, 'invisible element height');
      });
      QUnit.test('height for element with transform', function(assert) {
        var $root = $('<div style=\'transform: scale(1.5); width: 100px; height: 110px;\'></div>').appendTo('#qunit-fixture').get(0);
        var $child = $('<div style=\'height: 40px; display: inline-block\'/>').appendTo($root).get(0);
        var jqHeight = $($child).height();
        var dxHeight = getHeight($child);
        assert.strictEqual(dxHeight, jqHeight, 'getHeight should be equal to $.height');
      });
      QUnit.test('size helpers should return the same value as jquery. Params: (box-sizing: border-box; overflow: hidden)', function(assert) {
        var $target = $('<div style=\'height: 40px; width: 50px; padding: 3px; margin: 7px; border: 9px solid black; display: inline-block; box-sizing: border-box; overflow: hidden;\'/>').appendTo('#qunit-fixture').get(0);
        $('<div style=\'width: 100px; height: 100px\'>').appendTo($target);
        assert.strictEqual(getHeight($target), 16, 'getHeight');
        assert.strictEqual(getWidth($target), 26, 'getWidth');
        assert.strictEqual(getInnerHeight($target), 22, 'getInnerHeight');
        assert.strictEqual(getInnerWidth($target), 32, 'getInnerWidth');
        assert.strictEqual(getOuterHeight($target), 40, 'getOuterHeight');
        assert.strictEqual(getOuterWidth($target), 50, 'getOuterWidth');
        assert.strictEqual(getOuterHeight($target, true), 54, 'getOuterHeight(true)');
        assert.strictEqual(getOuterWidth($target, true), 64, 'getOuterWidth(true)');
      });
      QUnit.test('size helpers should return the same value as jquery. Params: (box-sizing: border-box; overflow: auto)', function(assert) {
        var $target = $('<div style=\'height: 40px; width: 50px; padding: 3px; margin: 7px; border: 9px solid black; display: inline-block; box-sizing: border-box; overflow: auto;\'/>').appendTo('#qunit-fixture').get(0);
        $('<div style=\'width: 100px; height: 100px\'>').appendTo($target);
        assert.strictEqual(getHeight($target), 16, 'getHeight');
        assert.strictEqual(getWidth($target), 26, 'getWidth');
        assert.strictEqual(getInnerHeight($target), 22, 'getInnerHeight');
        assert.strictEqual(getInnerWidth($target), 32, 'getInnerWidth');
        assert.strictEqual(getOuterHeight($target), 40, 'getOuterHeight');
        assert.strictEqual(getOuterWidth($target), 50, 'getOuterWidth');
        assert.strictEqual(getOuterHeight($target, true), 54, 'getOuterHeight(true)');
        assert.strictEqual(getOuterWidth($target, true), 64, 'getOuterWidth(true)');
      });
      QUnit.test('size helpers should return the same value as jquery. Params: (box-sizing: content-box, overflow: hidden)', function(assert) {
        var $target = $('<div style=\'height: 40px; width: 50px; padding: 3px; margin: 7px; border: 9px solid black; display: inline-block; box-sizing: content-box; overflow: hidden};\'/>').appendTo('#qunit-fixture').get(0);
        $('<div style=\'width: 100px; height: 100px\'>').appendTo($target);
        assert.strictEqual(getHeight($target), 40, 'getHeight');
        assert.strictEqual(getWidth($target), 50, 'getWidth');
        assert.strictEqual(getInnerHeight($target), 46, 'getInnerHeight');
        assert.strictEqual(getInnerWidth($target), 56, 'getInnerWidth');
        assert.strictEqual(getOuterHeight($target), 64, 'getOuterHeight');
        assert.strictEqual(getOuterWidth($target), 74, 'getOuterWidth');
        assert.strictEqual(getOuterHeight($target, true), 78, 'getOuterHeight(true)');
        assert.strictEqual(getOuterWidth($target, true), 88, 'getOuterWidth(true)');
      });
      QUnit.test('height helpers should return the same value as jquery. Params: (box-sizing: content-box, overflow: auto)', function(assert) {
        var $target = $('<div style=\'height: 40px; width: 50px; padding: 3px; margin: 7px; border: 9px solid black; display: inline-block; box-sizing: content-box; overflow: auto;\'/>').appendTo('#qunit-fixture').get(0);
        $('<div style=\'width: 100px; height: 100px\'>').appendTo($target);
        var scrollbarThickness = getScrollbarThickness();
        assert.strictEqual(getHeight($target), 40 - scrollbarThickness, 'getHeight');
        assert.strictEqual(getWidth($target), 50 - scrollbarThickness, 'getWidth');
        assert.strictEqual(getInnerHeight($target), 46, 'getInnerHeight');
        assert.strictEqual(getInnerWidth($target), 56, 'getInnerWidth');
        assert.strictEqual(getOuterHeight($target), 64, 'getOuterHeight');
        assert.strictEqual(getOuterWidth($target), 74, 'getOuterWidth');
        assert.strictEqual(getOuterHeight($target, true), 78, 'getOuterHeight(true)');
        assert.strictEqual(getOuterWidth($target, true), 88, 'getOuterWidth(true)');
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/size","core/utils/browser"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/size"), require("core/utils/browser"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.size.tests.js.map