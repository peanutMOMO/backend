/**
 * 选中父菜单时，选中所有子菜单
 * @author TaNg
 * @date   2016-03-01T14:34:15+0800
 */
define(['./directive'], function(directive) {
  'use strict';

  directive.directive('allChecked', function() {
  return {
    restrict: "A",
    link: function(scope, element, attr) {
      element.on('click', function() {
        var children = element.parent().parent().next().find('input');

        if (element.prop('checked')) {
          children.prop('checked', true);

        } else {
          children.prop('checked', false);
        }

        scope.$apply();
      });
    }
  };
});
});
