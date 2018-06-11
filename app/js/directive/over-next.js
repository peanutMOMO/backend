/**
 * [description]
 * @author TaNg
 * @date   2016-03-01T14:35:25+0800
 */
define(['./directive'], function(directive) {
  'use strict';

  directive.directive("overNext", function() {
  return {
    restrict: "A",
    link: function(scope, element, attr) {
      element.bind('change', function(e) {

        if (e.target.value >= 2) {
          e.target.nextElementSibling.focus();
        }
      });
    }
  };
});
});
