/**
 * 权限
 * @author TaNg
 * @date   2016-03-01T14:03:17+0800
 */
define(['./controller'], function(controller) {
  'use strict';

  controller.controller("AuthorityCtrl", [
    "$http", "$scope", "getMenus",
    function($http, $scope, getMenus) {
      var getRoles = function() {
        $http({
          url: '/ilink/role/list',
          method: 'GET'
        }).success(function(rep) {

          $scope.roles = rep.data;
        });
      };
      getRoles();
      var getRole = function(id, callback) {
        $http({
          url: '/ilink/role/load',
          method: 'GET',
          params: {
            roleId: id
          }
        }).success(function(rep) {

          callback(rep.data);
        });
      };
      $scope.detail = function() {

      };
      $scope.fatherChecked = function() {
        var menu = this.menu,
          subMenus = menu.subMenu,
          i, len;

        if (subMenus.length < 1) {
          return;
        }

        if (menu.hasMenuRight) {

          for (i = 0, len = subMenus.length; i < len; i++) {
            subMenus[i].hasMenuRight = true;
          }

        } else {

          for (i = 0, len = subMenus.length; i < len; i++) {
            subMenus[i].hasMenuRight = false;
          }
        }
      };
      $scope.childChecked = function() {
        var menu = this.menu,
          subMenus = menu.subMenu,
          i, len;

        for (i = 0, len = subMenus.length; i < len; i++) {

          if (subMenus[i].hasMenuRight) {
            menu.hasMenuRight = true;
            return;
          }
        }
        menu.hasMenuRight = false;
      };
      $scope.openAdd = function() {
        $scope.form = {
          name: '',
          type: 2
        };
        getMenus(function(menus) {
          $scope.form.menus = menus;
        });
        $scope.frame = {
          show: true,
          title: "添加角色"
        };
      };
      $scope.openEdit = function(id) {
        getRole(id, function(role) {
          $scope.form = {
            id: role.roleId,
            name: role.roleName,
            menus: role.menuList,
            type: 2
          };
        });

        $scope.frame = {
          show: true,
          title: "修改角色"
        };
      };
      $scope.save = function() {
        var form = $scope.form,
          params = {
            roleName: form.name,
            menuIds: function() {
              var arr = [],
                menus = $scope.form.menus;

              for (var i = 0, len = menus.length; i < len; i++) {

                if (menus[i].hasMenuRight) { //此处hasMenuRight字段跟后台保持一致
                  arr.push(menus[i].menuId);
                }

                if (menus[i].subMenu.length > 0) {
                  var subMenus = menus[i].subMenu;

                  for (var j = 0, jLen = subMenus.length; j < jLen; j++) {

                    if (subMenus[j].hasMenuRight) { //此处hasMenuRight字段跟后台保持一致
                      arr.push(subMenus[j].menuId);
                    }
                  }
                }
              }

              return arr.join(',');
            }()
          };

        if (form.id) {
          params.roleId = form.id;
        }

        $http({
          url: '/ilink/role/save',
          method: 'POST',
          params: params
        }).success(function(rep) {

          getRoles();
          $scope.frame = true;
        });
      };
      $scope.delete = function(id) {

        if (confirm('确认删除？')) {
          $http({
            url: '/ilink/role/delete',
            method: 'GET',
            params: {
              roleId: id
            }
          }).success(function(rep) {

            getRoles();
          });
        }
      };
    }
  ]);
});
