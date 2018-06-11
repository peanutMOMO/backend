/**
 * 客户-考勤-打卡信息
 * @author TaNg
 * @date   2016-03-01T14:04:55+0800
 */
define(['./controller'], function(controller) {
  'use strict';

  controller.controller("ClkqinCtrl", [
    "$http", "$scope", "convertTime", "convertDay", "$location", "pageNumbers",
    function($http, $scope, convertTime, convertDay, $location, pageNumbers) {
      $scope.convertTime = convertTime;
      $scope.convertDay = convertDay;

      $scope.getKqInfos = function(page) {
        var search = $scope.search,
          params = {};

        params.orderby = "id";

        if (search) {

          if (search.cpName && search.cpName != '') {
            params.cp_name = search.cpName;
          }

          if (search.uname && search.uname !== '') {
            params.uname = search.uname;
          }
        }

        params["page.currentPage"] = page;

        $http({
          url: '/ilink/signin/info/list',
          method: 'GET',
          params: params
        }).success(function(rep) {

          $scope.kqInfos = rep.data.infoList;
          $scope.pageTotal = rep.data.page.totalPage;
          $scope.pageCur = rep.data.page.currentPage;
          $scope.pageNumbers = pageNumbers($scope.pageTotal, $scope.pageCur);
        });
      };
      $scope.getKqInfos(1);
    }
  ]);
});
