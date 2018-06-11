/**
 * 选中子菜单时，选中父菜单
 * @author TaNg
 * @date   2016-03-01T14:35:12+0800
 */
define(['./directive'], function(directive) {
  'use strict';

  directive.directive('fatherChecked', function() {
  return {
    restrict: "A",
    link: function(scope, element, attr) {
      element.on('click', function() {

        var father = element.parent().parent().parent().find('input').eq(0),
          children = element.parent().parent().find('input');

        if (element.prop('checked')) {
          father.prop('checked', true);
          scope.$apply();
          return;
        }

        for (var i = 0, len = children.length; i < len; i++) {

          if (children.eq(i).prop('checked')) {
            scope.$apply();
            return;
          }
        }
        father.prop('checked', false);
        scope.$apply();
      });
    }
  };
});
});
