/**
 * 顶部信息
 * @author TaNg
 * @date   2016-03-01T14:34:21+0800
 */
define(['./directive'], function(directive) {
  'use strict';

  directive.directive("appHeader", [
    "$location", "$http", "$cookies", "user",
    function($location, $http, $cookies, user) {
      return {
        restrict: "E",
        templateUrl: "html/template/app-header.html",
        replace: true,
        link: function(scope, element, attr) {

          scope.loginUser = user.get();
          scope.username = scope.loginUser.username;

          scope.logout = function() {
            $http({
              url: '/ilink/logout',
              method: 'GET'
            }).success(function(rep) {

              $cookies.remove('tick');
              user.remove();
              $location.path("/");
            });
          };

          document.body.style.display = 'block';
        }
      };
    }
  ]);
});
