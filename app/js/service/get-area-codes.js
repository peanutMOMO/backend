/**
 * 获得区号跟地区的映射
 * @Author TaNg<tangxiaokui@126.com>
 * @Date   2016-01-07
 * @Modify 2016-01-11
 */
define(['./service'], function(service) {
  'use strict';

  service.factory('getAreaCodes', [
    '$http',
    function($http) {
      var areaCodes = null;

      return function(callback) {

        if (!areaCodes) {
          $http.get('/json/area-code.json').
          success(function(data) {
            areaCodes = data;
            callback(data);
          });

        } else {
          return callback(areaCodes);
        }
      };
    }
  ]);
});
