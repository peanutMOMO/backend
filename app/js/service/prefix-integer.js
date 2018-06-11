/**
 * 数字前边补零
 * @Author TaNg<tangxiaokui@126.com>
 * @Date   2016-01-12
 * @param {number}  传入的数字，如果参数为空，返回空字符串
 * @param {number}  需要的位数，如果此参数为空，不作处理直接返回数字
 */
define(['./service'], function(service) {
  'use strict';

  service.factory('prefixInteger', function() {
    return function(num, n) {
      return !num ? '' : !n ? num : (Array(n).join(0) + num).slice(-n);
    };
  });
});
