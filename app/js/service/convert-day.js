/**
 * 将时间戳转换为年月日
 * @Author TaNg<tangxiaokui@126.com>
 * @Date   2016-01-08
 * @param {number}  timestamp 时间戳
 */
define(['./service'], function(service) {
  'use strict';

  service.factory('convertDay', function() {
  return function(timestamp) {

    if (!timestamp) {
      return '-';
    }

    if (timestamp.toString().length < 13) {
      timestamp += parseInt(timestamp) * 1000;
    }
    var date = new Date(timestamp),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate();

    return year + '年' + month + '月' + day + '日';
  };
});
});
