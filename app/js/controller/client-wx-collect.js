define(['./controller', 'jquery'], function(controller, $) {
  'use strict';

  controller.controller("ClwxcoCtrl", [
    "$http", "$scope", "pageNumbers", "getAreaCodes", 'prefixInteger', '$location',
    function($http, $scope, pageNumbers, getAreaCodes, prefixInteger, $location) {

      $scope.getCompanys = function(page) {
        var search = $scope.search,
          params = {};

        if (search && search.cp_name && search.cp_name != '') {
          params.cp_name = search.cp_name;
        }

        params["page.currentPage"] = page;

        $http({
          url: '/ilink/signin/company/list',
          method: 'GET',
          params: params
        }).success(function(rep) {

          if (rep.data == '') {
            $scope.companys = [];
            return;
          }

          $scope.companys = rep.data.companyList;
          $scope.pageCur = rep.data.page.currentPage;
          $scope.pageTotal = rep.data.page.totalPage;
          $scope.pageNumbers = pageNumbers($scope.pageTotal, $scope.pageCur);
          $scope.totalResult = rep.data.page.totalResult;
        });
      };

      $scope.getCompanys();

      $scope.openEdit = function(id) {
        $scope.showEdit = true;
        $scope.editSrc = 'img/kuangda.jpg';

        var img = $('#pathEditWrap img');

        img.load(function() {

          var w = img.outerWidth(),
            h = img.outerHeight();
          $('canvas').width(w).height(h).
          attr({
            width: w,
            height: h
          });
        });
      };
    }
  ]);
});
