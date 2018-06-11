/**
 * 设备
 * @author TaNg
 * @date   2016-03-01T14:13:09+0800
 * @modify 2016-03-03
 */
define(['./controller'], function(controller) {
  'use strict';

  controller.controller("EquipmentKqCtrl", [
    "$http", "$scope", "pageNumbers", "$location", 'getAreaCodes', 'inputHistory', 'prefixInteger',
    function($http, $scope, pageNumbers, $location, getAreaCodes, inputHistory, prefixInteger) {
      $scope.search = {
        cpno: $location.search().cpno || ''
      };
      getAreaCodes(function(data) {
        $scope.areaCodes = data;
      });
      $scope.prefixInteger = prefixInteger;
      $scope.getDevices = function(page) {
        var search = $scope.search,
          params = {
            'page.currentPage': page,
            type: 2, //获取我联考勤的type为2
            orderby: 'id',
            way: 'asc',
            mac: search.mac,
            cpno: search.cpno,
            cpName: search.cpName,
            zt: search.zt
          };

        $http({
          url: '/ilink/device/list',
          method: 'GET',
          params: params
        }).success(function(rep) {

          if (rep.data == '') {
            $scope.devices = [];
            return;
          }

          $scope.devices = rep.data.equipmentList;
          $scope.pageCur = rep.data.page.currentPage;
          $scope.pageTotal = rep.data.page.totalPage;
          $scope.pageNumbers = pageNumbers($scope.pageTotal, $scope.pageCur);
          $scope.totalResult = rep.data.page.totalResult;
        });
      };
      $scope.getDevices(1);
      var getDevice = function(id, callback) {
        $http({
          url: '/ilink/device/load',
          method: 'GET',
          params: {
            id: id
          }
        }).success(function(rep) {

          callback(rep.data);
        });
      };
      $scope.openAdd = function() {
        $scope.form = {
          show: true,
          title: "添加设备",
          way: 'add',
          type: 2,
          mac: '',
          cpno: '',
          sbmc: ''
        };

        if (inputHistory.get('areaCode')) {
          var areaCodes = $scope.areaCodes,
            areaCode = inputHistory.get('areaCode'),
            serial = areaCode.serial;

          areaCode.serial = parseInt(serial) + 1;

          for (var i = 0, len = areaCodes.length; i < len; i++) {

            if (areaCodes[i].code == areaCode.code) {
              areaCodes[i] = areaCode;
              $scope.form.areaCode = areaCode;
            }
          }
        }
      };
      $scope.openEdit = function(id) {
        getDevice(id, function(device) {
          $scope.form = {
            show: true,
            title: "修改设备",
            way: 'edit',
            id: device.id,
            type: 2,
            mac: device.mac,
            cpno: device.cpno,
            sbmc: device.sbmc,
            number: device.number,
          };
        });
      };
      $scope.save = function() {
        var form = $scope.form,
          params = {
            type: 2,
            mac: form.mac,
            sbmc: form.sbmc,
            number: form.number
          };

        if (form.way == 'edit') {
          params.id = form.id;
          params.cpno = form.cpno;

        } else {
          params.cpno = form.areaCode.code + prefixInteger(form.areaCode.serial, 6);
        }

        $http({
          url: '/ilink/device/save',
          method: 'POST',
          params: params
        }).success(function(rep) {

          $scope.getDevices($scope.pageCur);
          $scope.form.show = false;
          inputHistory.set('areaCode', form.areaCode);
        });
      };
      $scope.delete = function(id) {

        if (confirm('确认删除？')) {
          $http({
            url: '/ilink/device/delete',
            method: 'GET',
            params: {
              ids: id
            }
          }).success(function(rep) {

            if ($scope.devices.length == 1 && $scope.pageCur > 1) {
              $scope.getDevices($scope.pageCur - 1);

            } else {
              $scope.getDevices($scope.pageCur);
            }
          });
        }
      };
    }
  ]);
});
