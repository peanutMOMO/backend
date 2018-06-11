/**
 * 创建页码，最多10个页码
 * @Author TaNg<tangxiaokui@126.com>
 * @Date   2016-01-07
 * @param {number}  pageTotal  总页数
 * @param {number}  pageCur    当前页数
 */
define(['./service'], function(service) {
  'use strict';

  service.factory('pageNumbers', function() {
    return function(pageTotal, pageCur) {
      var pageNumbers = [],
        pageStart = pageCur > 5 ? (pageCur + 4 > pageTotal && pageTotal > 10 ? pageTotal - 9 : pageCur - 5) : 1,
        pageEnd = pageCur + 4 < pageTotal ? (pageTotal < 10 ? pageTotal : (pageCur > 6 ? pageCur + 4 : 10)) : pageTotal;

      for (var i = pageStart; i <= pageEnd; i++) {
        pageNumbers.push(i);
      }

      return pageNumbers;
    };
  });
});
