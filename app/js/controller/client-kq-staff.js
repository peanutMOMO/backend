/**
 * 客户-考勤-员工
 * @author TaNg
 * @date   2016-03-01T14:12:17+0800
 */
define(['./controller'], function(controller) {
  'use strict';

  controller.controller("ClkqstCtrl", [
    "$http", "$scope", "pageNumbers",
    function($http, $scope, pageNumbers) {
      $scope.getStaffs = function(page) {
        var search = $scope.search,
          params = {};

        params.orderby = "id";

        if (search) {

          if (search.mac && search.mac != '') {
            params.mac = search.mac;
          }

          if (search.uname && search.uname !== '') {
            params.uname = search.uname;
          }
        }

        params["page.currentPage"] = page;

        $http({
          url: '/ilink/signin/user/list',
          method: 'GET',
          params: params
        }).success(function(rep) {

          $scope.staffs = rep.data.userList;
          $scope.pageTotal = rep.data.page.totalPage;
          $scope.pageCur = rep.data.page.currentPage;
          $scope.pageNumbers = pageNumbers($scope.pageTotal, $scope.pageCur);
        });
      };
      $scope.getStaffs(1);
    }
  ]);
});
