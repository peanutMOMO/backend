/**
 * 客户-考勤-部门
 * @author TaNg
 * @date   2016-03-01T14:04:15+0800
 */
define(['./controller'], function(controller) {
  'use strict';

  controller.controller("ClkqdpCtrl", [
    "$http", "$scope", "pageNumbers",
    function($http, $scope, pageNumbers) {
      $scope.getDepartments = function(page) {
        var search = $scope.search,
          params = {};

        if (search) {

          // if (search.cp_name && search.cp_name != '') {
          //   params.cp_name = search.cp_name;
          // }

          if (search.cpno && search.cpno !== '') {
            params.cpno = search.cpno;
          }
        }

        params["page.currentPage"] = page;

        $http({
          url: '/ilink/signin/dept/list',
          method: 'GET',
          params: params
        }).success(function(rep) {

          $scope.departments = rep.data.deptList;
          $scope.pageTotal = rep.data.page.totalPage;
          $scope.pageCur = rep.data.page.currentPage;
          $scope.pageNumbers = pageNumbers($scope.pageTotal, $scope.pageCur);
        });
      };
      $scope.getDepartments(1);
    }
  ]);
});
