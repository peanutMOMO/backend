/**
 * 展开子菜单
 * @author TaNg
 * @date   2016-03-01T14:35:43+0800
 */
define(['./directive'], function(directive) {
  'use strict';

  directive.directive("unfoldSubmenu", [
  '$compile',
  function($compile) {
    return {
      restrict: "A",
      link: function(scope, element, attr) {
        var menus = scope.menu.subMenu;

        if (menus.length > 0) {
          scope.menu.subStatus = false;

          scope.toggleSub = function() {
            scope.menu.subStatus = !scope.menu.subStatus;

            if (scope.menu.subStatus) {
              var html = '';

              for (var i = 0, len = menus.length; i < len; i++) {
                html += '<tr >' +
                  '<td></td>' + //子菜单序号不填
                  '<td class="' + (i + 1 == len ? 'last' : 'join') + '">' + menus[i].menuName + '</td>' +
                  '<td></td>' +
                  '<td>' + menus[i].menuUrl + '</td>' +
                  '<td>' + menus[i].project_name + '</td>' +
                  '<td class="action">' +
                  '<a href="javascript:;" class="btn" style="visibility:hidden;"><i class="icon-minus-sign-alt"></i></a>&nbsp;' +
                  '<a class="btn btn-info" href="javascript:;" ng-click="openEdit(' + menus[i].menuId + ')"><i class="icon-edit"></i></a>&nbsp;' +
                  '<a class="btn btn-danger" href="javascript:;" ng-click="delete(' + menus[i].menuId + ')"><i class="icon-trash"></i></a>' +
                  '</td>' +
                  '</tr>';
              }
              element.after($compile(html)(scope.$parent));

            } else {

              for (i = 0, len = menus.length; i < len; i++) {
                element.next().remove();
              }
            }
          };
        }
      }
    };
  }
]);
});
