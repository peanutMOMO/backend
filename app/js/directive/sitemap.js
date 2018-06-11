/**
 * [description]
 * @author TaNg
 * @date   2016-03-01T14:35:39+0800
 */
define(['./directive'], function(directive) {
  'use strict';

  directive.directive("sitemap", function() {
    return {
      restrict: "E",
      templateUrl: "html/template/sitemap.html",
      scope: {},
      replace: true,
      link: function(scope, element, attr) {
        scope.route = window.location.pathname.substr(1).split("/");
        scope.site = {
          dashboard: "概览",
          client: "客户",
          clkqac: "帐号信息",
          clkqdp: "部门信息",
          clkqin: "员工信息",
          clkqst: "考勤信息",
          system: "系统",
          menu: "菜单",
          authority: "权限",
          account: "帐号",
          equipment: "设备",
          kq_device: "考勤设备"
        };
      }
    };
  });
});
