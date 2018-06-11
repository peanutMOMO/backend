/**
 * 客户-考勤-帐号
 * @author TaNg
 * @date   2016-03-01T14:03:37+0800
 */
define(['./controller', 'MD5'], function(controller, MD5) {
  'use strict';

  controller.controller("ClkqacCtrl", [
    "$http", "$scope", "pageNumbers", "getAreaCodes", 'prefixInteger', '$location',
    function($http, $scope, pageNumbers, getAreaCodes, prefixInteger, $location) {
      getAreaCodes(function(data) {
        $scope.areaCodes = data;
      });
      $scope.prefixInteger = prefixInteger;
      $scope.getArea = function(code) {
        var areaCodes = $scope.areaCodes || [];

        for (var i = 0, len = areaCodes.length; i < len; i++) {

          if (areaCodes[i].code == code) {
            return areaCodes[i].area;
          }
        }
        return '未知';
      };
      $scope.getCompanys = function(page) {
        var search = $scope.search,
          params = {};

        if (search) {

          if (search.cp_name && search.cp_name != '') {
            params.cp_name = search.cp_name;
          }

          if (search.code && search.code !== '') {
            params.cpno = search.code;
          }
          //编号查询覆盖地区查询
          if (search.cpno && search.cpno !== '') {
            params.cpno = search.cpno;
          }
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
      /*获得区域当前的序号*/
      $scope.getMaxNo = function(code) {
        $http({
          url: '/ilink/signin/company/maxNo',
          method: 'GET',
          params: {
            prefixNo: code
          }
        }).success(function(rep) {

          if (rep.data) {
            $scope.form.areaCode.serial = (parseInt(rep.data.slice(-6)) + 1);
          }
        });
      };
      $scope.getCompanys(1);
      $scope.openAdd = function() {
        $scope.form = {
          show: true,
          title: '添加公司帐号',
          way: 'add',
          type: 1,
          name: '',
          address: '',
          email: '',
          telephone: '',
          auth: '',
          comeHour: '09',
          comeMinute: '00',
          goHour: '18',
          goMinute: '00',
          cpno: '',
          usr: '',
          psw: '',
          zt: 1
        };
      };
      $scope.openEdit = function(cpno) {
        $http({
          url: '/ilink/signin/company/load',
          method: 'POST',
          params: {
            cpno: cpno
          }
        }).success(function(rep) {

          var company = rep.data;
          $scope.form = {
            show: true,
            title: '修改公司信息',
            way: 'edit',
            id: company.id,
            type: company.type,
            name: company.cp_name,
            address: company.cp_address,
            email: company.email,
            telephone: company.phone_no,
            auth: company.authcode,
            cpno: company.cpno,
            usr: company.account,
            psw: '******',
            zt: company.zt
          };

          if (company.type == 1) {
            $scope.form.comeHour = company.work_time.split(':')[0];
            $scope.form.comeMinute = company.work_time.split(':')[1];
            $scope.form.goHour = company.leave_time.split(':')[0];
            $scope.form.goMinute = company.leave_time.split(':')[1];
          }
        });
      };
      var fitTime = function(hour, minute) {
        hour = parseInt(hour);
        minute = parseInt(minute);

        if (isNaN(hour) || hour < 0 || hour > 23) {
          return;
        }

        if (isNaN(minute) || minute < 0 || minute > 59) {
          return;
        }

        if (hour < 10) {
          hour = '0' + hour;
        }

        if (minute < 10) {
          minute = '0' + minute;
        }

        return hour + ':' + minute;
      };
      $scope.save = function() {
        var form = $scope.form,
          params = {
            type: form.type,
            cp_name: form.name,
            phone_no: form.telephone,
            cp_address: form.address,
            work_time: fitTime($scope.comeHour, $scope.comeMinute),
            leave_time: fitTime($scope.goHour, $scope.goMinute),
            email: form.emal,
            account: form.usr,
            zt: 1
          };

        if (form.psw && form.psw != '******') {
          params.password = MD5(form.psw);
        }

        if ($scope.form.way == 'edit') {
          params.id = $scope.form.id;
          params.cpno = $scope.form.cpno;

        } else {
          params.cpno = form.areaCode.code + prefixInteger(form.areaCode.serial, 6);
        }

        $http({
          url: '/ilink/signin/company/save',
          method: 'POST',
          params: params
        }).success(function(rep) {

          $scope.getCompanys($scope.pageCur);
          $scope.form.show = false;
        });
      };
      $scope.delete = function(id) {

        if (confirm('确认删除？')) {
          $http({
            url: '/ilink/signin/company/delete',
            method: 'GET',
            params: {
              ids: id
            }
          }).success(function(rep) {

            if ($scope.pageCur > 1 && $scope.companys.length == 1) {
              $scope.getCompanys($scope.pageCur - 1);

            } else {
              $scope.getCompanys($scope.pageCur);
            }
          });
        }
      };
      $scope.openDetail = function(cpno) {
        $http({
          url: '/ilink/signin/company/load',
          method: 'GET',
          params: {
            cpno: cpno
          }
        }).success(function(rep) {

          $scope.company = rep.data;
          $scope.scan = true;
        });
      };
    }
  ]);
});
