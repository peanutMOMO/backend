/**
 * 页码模版
 * @author TaNg
 * @date   2016-03-01T14:35:30+0800
 */
define(['./directive'], function(directive) {
  'use strict';

  directive.directive('pageList', function() {
  return {
    restrict: "E",
    scope: {
      pageCur: '=',
      pageTotal: '=',
      pageNumbers: '=',
      resultTotal: '=',
      request: '='
    },
    templateUrl: "html/template/page-list.html",
    replace: true
  };
});
});
