System.register([], function (_export, _context) {
  "use strict";

  var $, GoogleStaticProvider, fx, executeAsyncMock, BOOTSTRAP_CSS_URL, applyBootstrap, dropBootstrap, ui;
  return {
    setters: [],
    execute: function () {
      $ = require('jquery');
      GoogleStaticProvider = require('ui/map/provider.google_static');
      fx = require('animation/fx');
      executeAsyncMock = require('../../helpers/executeAsyncMock.js');
      require('generic_light.css!');
      require('bundles/modules/parts/widgets-web');
      GoogleStaticProvider.remapConstant('/mapURL?');
      QUnit.testStart(function () {
        const markup = '<div id="element"></div>';
        $('#qunit-fixture').html(markup);
      });
      executeAsyncMock.setup();
      BOOTSTRAP_CSS_URL = window.ROOT_URL + 'node_modules/bootstrap/dist/css/bootstrap.css';
      applyBootstrap = function () {
        let styles = null;
        const renderStyle = function (data) {
          $('<style id=bootstrap>').html(styles).appendTo('head');
        };
        return function () {
          if (styles) {
            renderStyle(styles);
            return $.when().promise();
          } else {
            return $.get(BOOTSTRAP_CSS_URL).done(function (data) {
              styles = data;
              renderStyle(styles);
            }).promise();
          }
        };
      }();
      dropBootstrap = function () {
        $('#bootstrap').remove();
      };
      QUnit.module('widgets sizing', {
        beforeEach: function () {
          fx.off = true;
          this.$element = $('#element');
          executeAsyncMock.setup();
        },
        afterEach: function () {
          fx.off = false;
          executeAsyncMock.teardown();
          dropBootstrap();
        }
      });
      ui = DevExpress.ui;
      $.each(ui, function (componentName, componentConstructor) {
        if ($.fn[componentName] && ui[componentName] && ui[componentName].subclassOf && componentName !== 'dxDateViewRoller') {
          QUnit.test(componentName, function (assert) {
            const done = assert.async();
            const $element = this.$element;
            const sizeWithoutBootstrap = {
              width: $element.outerWidth(),
              height: $element.outerHeight()
            };
            applyBootstrap().done(function () {
              const sizeWithBootstrap = {
                width: $element.outerWidth(),
                height: $element.outerHeight()
              };
              assert.roughEqual(sizeWithBootstrap.width, sizeWithoutBootstrap.width, 1.0001);
              assert.roughEqual(sizeWithBootstrap.height, sizeWithoutBootstrap.height, 1.0001);
              done();
            });
          });
        }
      });
    }
  };
});