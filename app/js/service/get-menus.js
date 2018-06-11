/**
 * 获取菜单列表
 * @Author TaNg<tangxiaokui@126.com>
 * @Date   2016-01-07
 * @param {function}  callback  回调函数，会将菜单列表放入callback的参数中
 * @param {string}    arg       带有值为'anew'的参数时，则重新向服务器获取值
 */
define(['./service'], function(service) {
  'use strict';

  service.factory('getMenus', [
    '$http', '$location',
    function($http, $location) {
      var menus = null,
        getFromBack = function(callback) {
          $http({
            url: '/ilink/menu/list',
            method: 'GET'
          }).success(function(rep) {

            menus = rep.data;
            callback(menus);
          });
        };

      return function(callback, arg) {

        //已有menus,不用重取，直接返回
        if (menus && arg != 'anew') {
          callback(menus);

          //有anew参数，以及没有menus，重新获取
        } else {
          getFromBack(callback);
        }
      };
    }
  ]);
});
