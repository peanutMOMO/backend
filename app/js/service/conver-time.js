/**
 * 将时间戳转换为时分秒
 * @Author TaNg<tangxiaokui@126.com>
 * @Date   2016-01-07
 * @param {number}  timestamp 时间戳
 */
define(['./service'], function(service) {
  'use strict';

  service.factory('convertTime', function() {
  return function(timestamp) {

    if (!timestamp) {
      return '-';
    }

    if (timestamp.toString().length < 13) {
      timestamp += parseInt(timestamp) * 1000;
    }
    var date = new Date(timestamp),
      hour = date.getHours(),
      minute = date.getMinutes(),
      second = date.getSeconds(),
      addZero = function(num) {
        return num < 10 ? '0' + num : num;
      };

    hour = addZero(hour);
    minute = addZero(minute);
    second = addZero(second);

    return hour + ':' + minute + ':' + second;
  };
});
});
