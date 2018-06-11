/**
 * 侧边栏
 * @author TaNg
 * @date   2016-03-01T14:35:35+0800
 */
define(['./directive'], function(directive) {
  'use strict';

  directive.directive("sidebar", [
  '$http', '$location', 'user',
  function($http, $location, user) {
    return {
      restrict: "E",
      templateUrl: "html/template/sidebar.html",
      scope: {},
      replace: true,
      link: function(scope, element, attr) {
        scope.path = $location.path(); // 有子集菜单的在自己菜单内处理active状态
        scope.menus = user.get().menus;
      }
    };
  }
]);
});
