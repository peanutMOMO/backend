/**
 * 在Session中缓存的输入信息
 * @param {string}  key 键
 * @param {string}  value 值
 * 
 * @Author TaNg<tangxiaokui@126.com>
 * @Date   2016-01-07
 * @Modify 2016-01-11
 */
define(['./service'], function(service) {
  'use strict';

  service.factory('inputHistory', function() {
    var inputHistory = {
      data: {},
      get: function(key) {
        var data = sessionStorage.getItem('inputHistory');

        if (data) {
          this.data = JSON.parse(data);
          return this.data[key];
        }
        return null;
      },
      set: function(key, value) {
        this.data[key] = value;
        sessionStorage.setItem('inputHistory', JSON.stringify(this.data));
      }
    };

    return {
      get: function(key) {
        return inputHistory.get(key);
      },
      set: function(key, value) {
        inputHistory.set(key, value);
      }
    };
  });
});
