/**
 * 晃动事件
 * @Author TaNg<tangxiaokui@126.com>
 * @Date   2016-01-07
 * @param {object}  scope  scope对象
 * @param {string}  key    键名
 */
define(['./service'], function(service) {
  'use strict';

  service.factory('shakeMotion', [
    '$timeout',
    function($timeout) {
      return function(scope, key) {
        $timeout(function() {
          scope[key] = false;
        }, 400);

        scope[key] = true;
      };
    }
  ]);
});
