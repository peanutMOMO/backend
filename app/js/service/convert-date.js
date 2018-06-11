/**
 * 将时间戳转换为年月日时分秒
 * @Author TaNg<tangxiaokui@126.com>
 * @Date   2016-01-08
 * @param {number}  timestamp 时间戳
 */
define(['./service'], function(service) {
  'use strict';

  service.factory('convertDate', function() {
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
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds(),
        addZero = function(num) {
          return num < 10 ? '0' + num : num;
        };

      hour = addZero(hour);
      minute = addZero(minute);
      second = addZero(second);

      return year + '年' + month + '月' + day + '日 ' + hour + ':' + minute + ':' + second;
    };
  });
});
