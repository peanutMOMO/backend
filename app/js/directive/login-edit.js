/**
 * 登录用户修改自身名称或密码
 * @author TaNg
 * @date   2016-03-01T14:35:17+0800
 */
define(['./directive', 'MD5'], function(directive, MD5) {
  'use strict';

  directive.directive('loginEdit', [
    '$http', '$location', '$route',
    function($http, $location, $route) {
      return {
        restrict: "E",
        scope: {
          loginUser: '='
        },
        templateUrl: "html/template/login-edit.html",
        replace: true,
        link: function(scope, element, attr) {
          var loginUser = scope.loginUser;
          scope.form = {
            name: loginUser.username,
            login: loginUser.loginname
          };
          scope.save = function() {
            var form = scope.form;
            var params = {
              userId: loginUser.userId,
              username: form.name
            };

            if (form.password != form.rePassword) {
              alert('两次密码不一样！');
              return;
            }

            if (form.password) {
              params.password = MD5(form.password);
            }

            $http({
              url: '/ilink/user/save',
              method: 'POST',
              params: params
            }).success(function(rep) {

              scope.loginUser.username = form.name;
              scope.loginUser.edit = false;
            });
          };
        }
      };
    }
  ]);
});
