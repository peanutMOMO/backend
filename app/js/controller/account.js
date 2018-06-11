/**
 * 管理员账户
 * @author TaNg
 * @date   2016-03-01T14:02:15+0800
 */
define(['./controller', 'MD5'], function(controller, MD5) {
  'use strict';

  controller.controller("AccountCtrl", [
    "$http", "$scope", "$location", "convertDate", 'pageNumbers',
    function($http, $scope, $location, convertDate, pageNumbers) {
      $scope.convertDate = convertDate;
      var getAccounts = $scope.getAccounts = function(page) {
        $http({
          url: '/ilink/user/list',
          method: 'GET',
          params: {
            "page.currentPage": page
          }
        }).success(function(rep) {

          $scope.accounts = rep.data.userlist;
          $scope.pageTotal = rep.data.page.totalPage;
          $scope.pageCur = rep.data.page.currentPage;
          $scope.pageNumbers = pageNumbers($scope.pageTotal, $scope.pageCur);
        });
      };
      getAccounts(1);
      var getRoles = function(callback) {
        $http({
          url: '/ilink/role/list',
          method: 'GET'
        }).success(function(rep) {

          $scope.roles = rep.data;
          callback(rep.data);
        });
      };
      var getDetail = function(id, callback) {
        $http({
          url: '/ilink/user/load',
          method: 'GET',
          params: {
            userId: id
          }
        }).success(function(rep) {

          callback(rep.data);
        });
      };
      $scope.openAdd = function() {
        $scope.form = {
          name: '',
          login: '',
          password: '',
          status: 1
        };
        getRoles(function(roles) {
          $scope.form.role = roles[0];
        });
        $scope.frame = {
          show: true,
          title: "添加角色"
        };
      };
      $scope.openEdit = function(id) {
        getRoles(function(roles) {

          getDetail(id, function(user) {
            $scope.form = {
              id: id,
              name: user.username,
              login: user.loginname,
              password: '******',
              status: user.status,
              role: function() {

                for (var i = 0, len = roles.length; i < len; i++) {
                  if (user.role && roles[i].roleId == user.role.roleId) {
                    return roles[i];
                  }
                }
                return roles[0];
              }()
            };
          });
        });

        $scope.frame = {
          show: true,
          title: "修改角色"
        };
      };
      $scope.save = function(id) {
        var form = $scope.form,
          params = {
            username: form.name,
            loginname: form.login,
            roleId: form.role.roleId,
            status: form.status
          };

        if (form.password && form.password != '******') {
          params.password = MD5(form.password);
        }

        if (form.id) {
          params.userId = form.id;
        }

        $http({
          url: '/ilink/user/save',
          method: 'POST',
          params: params
        }).success(function(rep) {

          getAccounts($scope.pageCur);
          $scope.frame.show = false;
        });
      };
      $scope.delete = function(id) {

        if (confirm('确认删除？')) {
          $http({
            url: '/ilink/user/delete',
            method: 'GET',
            params: {
              userIds: id
            }
          }).success(function(rep) {

            getAccounts($scope.pageCur);
          });
        }
      };
    }
  ]);
});
