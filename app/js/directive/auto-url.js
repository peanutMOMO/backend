/**
 * 添加菜单时，选择父菜单，url自动填充
 * @author TaNg
 * @date   2016-03-01T14:34:35+0800
 */
define(['./directive'], function(directive) {
  'use strict';

  directive.directive('autoUrl', function() {
  return {
    restrict: "A",
    link: function(scope, element, attr) {
      element.bind('change', function() {
        scope.form.url = scope.form.parentMenu.menuUrl;
        scope.$apply();
      });
    }
  };
});
});
