/**
 * 菜单
 * @author TaNg
 * @date   2016-03-01T14:13:36+0800
 */
define(['./controller'], function(controller) {
  'use strict';

  controller.controller("MenuCtrl", [
    "$http", "$scope", 'getMenus', '$location', 'user',
    function($http, $scope, getMenus, $location, user) {
      /**
       * 重新获取sidebar
       */
      function reload() {
        $http({
          url: '/ilink/session/user',
          method: 'GET'
        }).success(function(rep) {

          user.set(rep.data);
          location.reload();
        });
      }

      getMenus(function(menus) {
        $scope.menus = menus;
      });

      $scope.openAdd = function() {
        $scope.frame = {
          show: true,
          title: "添加菜单"
        };

        $scope.form = {
          type: 1,
          name: '',
          url: '',
          icon: 'icon-dashboard',
          parentMenu: $scope.menus[0],
          group: ''
        };
      };
      $scope.openEdit = function(id) {
        $scope.frame = {
          show: true,
          title: "修改菜单"
        };

        $http({
          url: '/ilink/menu/load',
          method: 'GET',
          params: {
            menuId: id
          }
        }).success(function(rep) {

          var menu = rep.data;
          $scope.form = {
            id: menu.menuId,
            type: !menu.parentId ? 1 : 2,
            name: menu.menuName,
            url: menu.menuUrl,
            icon: menu.icon,
            group: menu.project_name,
            parentMenu: function() {
              var menus = $scope.menus;

              for (var i = 0; i < menus.length; i++) {

                if (menus[i].menuId == menu.parentId) {
                  return menus[i];
                }
              }
              return menus[0];
            }()
          };
        });
      };
      $scope.save = function() {
        var params = null,
          form = $scope.form;

        if (form.type == 1) {
          params = {
            menuName: form.name,
            menuUrl: form.url,
            icon: form.icon
          };

        } else {
          params = {
            menuName: form.name,
            menuUrl: form.url,
            parentId: form.parentMenu.menuId,
            project_name: form.group
          };
        }

        if (form.id) {
          params.menuId = form.id;
        }

        $http({
          url: '/ilink/menu/save',
          method: 'POST',
          params: params
        }).success(function(rep) {

          reload();
        });
      };

      $scope.delete = function(id) {

        if (confirm('确认删除？')) {
          $http({
            url: '/ilink/menu/delete',
            method: 'GET',
            params: {
              menuId: id
            }
          }).success(function(rep) {

            alert('删除成功');
            reload();
          });
        }
      };
    }
  ]);
});
