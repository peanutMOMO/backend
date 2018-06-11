/**
 * 采集路径动作
 * @author TaNg
 * @date   2016-03-04T17:16:29+0800
 */
define(['./directive', 'jquery'], function(directive, $) {
  'use strict';

  directive.directive('pathCollect', [
    '$http', '$location', '$route',
    function($http, $location, $route) {
      return {
        restrict: "A",
        link: function(scope, element, attr) {

          function getObjectURL(file) {
            var url = null;
            if (window.createObjectURL !== undefined) {
              url = window.createObjectURL(file);
            } else if (window.URL !== undefined) {
              url = window.URL.createObjectURL(file);
            } else if (window.webkitURL !== undefined) {
              url = window.webkitURL.createObjectURL(file);
            }
            return url;
          }

          var storeId = null;

          element.on('click', function() {
            storeId = scope.storeId;

            if (!scope.storeId || scope.storeId == '') {
              alert('店铺ID未填');
              return;
            }

            scope.showEdit = true;
            var blob = getObjectURL($('#imgInput')[0].files[0]);
            var img = $('#pathEditWrap img');
            img.attr('src', blob);

            img.load(function() {

              var w = img.outerWidth(),
                h = img.outerHeight();
              $('canvas').width(w).height(h).
              attr({
                width: w,
                height: h
              });
            });
          });

          var halfPoint = 10,
            pointIndex = 1;

          function Point(x, y) {
            var point = document.createElement('div');
            point.index = pointIndex++;

            $(point).addClass('point').
            css({
              left: x,
              top: y
            }).
            html(point.index).
            mousedown(function(e) {

              var _this = $(this),
                wrap = $('#pathEditWrap'),
                wrapX = wrap.offset().left + halfPoint,
                wrapY = wrap.offset().top + halfPoint;

              wrap.mousemove(function(e) {
                var mouseX = e.pageX,
                  mouseY = e.pageY;

                _this.css({
                  left: mouseX - wrapX,
                  top: mouseY - wrapY
                });
              }).mouseup(function() {
                $(this).off('mousemove');
                linePoint();
                printPoint();
              });

              return false;
            });

            this.point = point;
          }

          function linePoint() {
            var points = $('.point');

            if (points.length % 2 == 0) {

              var myCanvas = $('#pathEditWrap').find('canvas')[0],
                context = myCanvas.getContext("2d");

              context.clearRect(0, 0, $(myCanvas).width(), $(myCanvas).height());

              points.each(function(i) {

                if (i % 2 == 0) {

                  var startX = $(this).position().left + halfPoint,
                    startY = $(this).position().top + halfPoint,
                    endX = points.eq(i + 1).position().left + halfPoint,
                    endY = points.eq(i + 1).position().top + halfPoint;

                  context.strokeStyle = "red";
                  context.lineWidth = 2;
                  context.beginPath();
                  context.moveTo(startX, startY);
                  context.lineTo(endX, endY);
                  context.stroke();
                }
              });
            }
          }

          function printPoint() {
            var points = $('.point'),
              html = '';

            if (points.length % 2 === 0) {

              points.each(function(i) {

                if (i % 2 == 0) {
                  var nextPoint = points.eq(i + 1),
                    pointIndex = this.index - 64;

                  html +=
                    '<li>' +
                    pointIndex + ':(' + $(this).position().left + ',' + $(this).position().top + ')到(' + nextPoint.position().left + ',' + nextPoint.position().top + ')' +
                    '</li>' +
                    '<li>' +
                    (pointIndex + 1) + ':(' + nextPoint.position().left + ',' + nextPoint.position().top + ')到(' + $(this).position().left + ',' + $(this).position().top + ')' +
                    '</li>';
                }
              });
            }
          }

          $('#pathEditWrap').mousedown(function(e) {
            var pointWidth = 20,
              x = e.offsetX - halfPoint,
              y = e.offsetY - halfPoint,
              point = new Point(x, y).point;

            $(this).append(point);

            linePoint();
            printPoint();
          });

          $('#back').mousedown(function() {
            var points = $('.point');

            if (points.length == 0) {
              return false;
            }

            points.eq(points.length - 1).remove();
            pointIndex--;
            linePoint();
            printPoint();
            return false;
          });

          $('#result').mousedown(function() {
            var points = $('.point'),
              result = [];

            points.each(function(i) {

              if (i % 2 == 0) {

                var nextPoint = points.eq(i + 1);

                result.push({
                  "store_id": storeId,
                  "number": this.index,
                  "start": $(this).position().left + ',' + $(this).position().top,
                  "end": nextPoint.position().left + ',' + nextPoint.position().top
                });

                result.push({
                  "store_id": storeId,
                  "number": this.index + 1,
                  "start": nextPoint.position().left + ',' + nextPoint.position().top,
                  "end": $(this).position().left + ',' + $(this).position().top
                });
              }
            });

            $.ajax({
              url: '/ilink/path/save',
              type: 'POST',
              dataType: 'json',
              data: {
                list: JSON.stringify(result)
              },
              success: function(rep) {

                alert(rep.msg);
                window.location.reload();
              }
            });

            return false;
          });

          scope.reload = function() {

            if (confirm('退出，信息将清空，不予保存')) {
              window.location.reload();
            }
          };
        }
      };
    }
  ]);
});
