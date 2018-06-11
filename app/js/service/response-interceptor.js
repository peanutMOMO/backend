/**
 * response拦截处理
 * @author TaNg
 * @date   2016-03-07T11:15:22+0800
 */
define(['./service'], function(service) {
  'use strict';

  service.factory('responseInterceptor', [
    '$location',
    function($location) {

      return {
        response: function(rep) {

          if (!rep.data.code || rep.data.code == 1 || $location.path() == '/login') {
            return rep;

          } else if (rep.data.code == 101) {
            $location.path('/');

          } else {
            alert(rep.msg);
          }
        },
        responseError: function(rep) {

          var message = '返回' + rep.status + '错误';
          alert(message);
          return $q.reject(rep);
        }
      };
    }
  ]);
});
