/**
 * 用户信息
 * @Author TaNg<tangxiaokui@126.com>
 * @Date   2016-01-08
 */
define(['./service'], function(service) {
  'use strict';

  service.factory('user', function() {
    var user = sessionStorage.user || '{}';

    try {
      user = JSON.parse(user);
    } catch (e) {
      sessionStorage.removeItem('user');
      user = {};
      console.log('存储的User内容格式不对');
    }

    return {
      set: function(userArg) {
        user = userArg;
        sessionStorage.user = JSON.stringify(user);
      },
      get: function() {
        return user;
      },
      remove: function() {
        sessionStorage.removeItem('user');
      }
    };
  });
});
