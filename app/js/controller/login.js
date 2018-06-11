/**
 * 登录
 * @author TaNg
 * @date   2016-03-01T14:13:24+0800
 */
define(['./controller', 'MD5'], function(controller, MD5) {
  'use strict';

  controller.controller("LoginCtrl", [
    "$http", "$scope", "$location", "$timeout", "shakeMotion", "user",
    function($http, $scope, $location, $timeout, shakeMotion, user) {

      $http({
        url: '/ilink/session/user',
        method: 'GET'
      }).success(function(rep) {

        if (rep.code == 1) {
          user.set(rep.data);
          $location.path('/dashboard');
        }
      });

      $scope.login = function() {
        //浏览器自己填充的密码需要填进view
        var inputs = document.querySelectorAll('form > input[ng-model]');

        for (var i = 0, len = inputs.length; i < len; i++) {
          angular.element(inputs[i]).controller('ngModel').$setViewValue(inputs[i].value);
        }

        var username = $scope.username,
          password = $scope.password,
          checkcode = $scope.checkcode;

        if (!username) {
          shakeMotion($scope, 'usrErr');
          return;
        }

        if (!password) {
          shakeMotion($scope, 'pswErr');
          return;
        }

        if (!checkcode) {
          shakeMotion($scope, 'ckcErr');
          return;
        }

        var params = {};
        params.loginname = username;
        params.password = MD5(password);
        params.code = checkcode;

        if ($scope.autoLogin) {
          params.saveTime = 7; //自动登录时效
        }

        $http({
          url: '/ilink/login',
          method: 'POST',
          params: params
        }).success(function(rep) {

          if (rep.code == 1) {
            user.set(rep.data);
            $location.path("/dashboard");
          } else {
            alert(rep.msg);
          }
        });
      };
    }
  ]);
});
