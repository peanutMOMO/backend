/**
 * 验证码逻辑
 * @author TaNg
 * @date   2016-03-01T14:34:39+0800
 */
define(['./directive'], function(directive) {
  'use strict';

  directive.directive("checkcode", [
  '$timeout',
  function($timeout) {
    return {
      restrict: "A",
      link: function(scope, element, attr) {
        element.bind('click', function() {
          element.attr('src', '/ilink/code?v=' + (new Date().getTime()));
        });

        element.attr('src', '/ilink/code?v=' + (new Date().getTime()));
      }
    };
  }
]);
});
