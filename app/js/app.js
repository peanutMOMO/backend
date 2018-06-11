define([
  'angular',
  'angular-route',
  'angular-cookies',
  './controller/main',
  './directive/main',
  './service/main',
], function(angular) {
  'use strict';

  var app = angular.module('app', [
    'ngRoute',
    'ngCookies',
    'controller',
    'directive',
    'service'
  ]);

  app.config([
    '$routeProvider', '$locationProvider', '$httpProvider', "$compileProvider",
    function($routeProvider, $locationProvider, $httpProvider, $compileProvider) {
      //IE中有ajax缓存。。。
      if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
      }
      // Enables Request.IsAjaxRequest() in ASP.NET MVC
      $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
      // Disable IE ajax request caching
      $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
      $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

      // 统一处理response返回码
      $httpProvider.interceptors.push('responseInterceptor');

      //网站路由
      $routeProvider.when("/", { //登录页，作为首页
        redirectTo: "/login"

      }).when("/login", { //登录页
        templateUrl: "html/login.html",
        controller: "LoginCtrl"

      }).when("/dashboard", { //概览页
        templateUrl: "html/dashboard.html",
        controller: "DashboardCtrl",
        authenticate: true

      }).when("/client/clkqac", { //考勤账户，公司
        templateUrl: "../html/client-kq-account.html",
        controller: "ClkqacCtrl",
        authenticate: true

      }).when("/client/clkqdp", { //考勤部门信息
        templateUrl: "../html/client-kq-department.html",
        controller: "ClkqdpCtrl",
        authenticate: true

      }).when("/client/clkqst", { //考勤员工信息
        templateUrl: "../html/client-kq-staff.html",
        controller: "ClkqstCtrl",
        authenticate: true

      }).when("/client/clkqin", { //考勤打卡信息
        templateUrl: "../html/client-kq-signin.html",
        controller: "ClkqinCtrl",
        authenticate: true

        /**
         * 后台离职，我联无限的都不加了，恢复了之前的后台管理，用的是废弃的库，真无卵用
         */
        // }).when("/client/clwxac", { //我联无限帐号
        //   templateUrl: "../html/client-wx-account.html",
        //   controller: "ClwxacCtrl",
        //   authenticate: true

        /**
         * 唯一一个添加的我联无限的接口
         */
      }).when("/client/add-path", { //添加采集路径
        templateUrl: "../html/client-add-path.html",
        controller: "AddPathCtrl",
        authenticate: true

      }).when("/equipment/kq_device", { //我联考勤设备信息
        templateUrl: "html/equipment.html",
        controller: "EquipmentKqCtrl",
        authenticate: true

      }).when("/equipment/wx_device", { //我联无限设备信息
        templateUrl: "html/equipment-wx.html",
        controller: "EquipmentWxCtrl",
        authenticate: true

      }).when("/system/menu", {
        templateUrl: "html/menu.html",
        controller: "MenuCtrl",
        authenticate: true

      }).when("/system/authority", {
        templateUrl: "html/authority.html",
        controller: "AuthorityCtrl",
        authenticate: true

      }).when("/system/account", {
        templateUrl: "html/account.html",
        controller: "AccountCtrl",
        authenticate: true

      }).when("/demo", {
        templateUrl: "html/demo/index.html",
        controller: "DemoCtrl",
        authenticate: true

      }).when("/404", {
        templateUrl: "html/404.html",
        authenticate: true

      }).otherwise({
        redirectTo: "/404"
      });

      $locationProvider.html5Mode(true);

      //防止ng-href出现unsafe
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
    }
  ]);

  //权限判断
  app.run([
    '$rootScope', '$location', 'user',
    function($rootScope, $location, user) {

      $rootScope.$on('$routeChangeStart', function(event, next) {

        if (next.authenticate && JSON.stringify(user.get()) == '{}') {
          $location.path('/');
        }
      });
    }
  ]);

  return app;
});
