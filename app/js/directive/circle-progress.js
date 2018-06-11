/**
 * [description]
 * @author TaNg
 * @date   2016-03-01T14:34:47+0800
 */
define(['./directive'], function(directive) {
  'use strict';

  directive.directive("circleProgress", function() {
  return {
    restrict: "E",
    replace: true,
    template: '<canvas width="200" height="200"></canvas>',
    link: function(scope, element, attr) {
      var c2d = element[0].getContext("2d");
      var e = 60 * Math.PI / 180;
      c2d.clearRect(0, 0, 400, 400);
      c2d.beginPath();
      c2d.strokeStyle = "#dddddd";
      c2d.lineWidth = 30;
      c2d.arc(100, 100, 70, 0, 2 * Math.PI, false);
      c2d.stroke();
      c2d.closePath();
      c2d.beginPath();
      c2d.strokeStyle = "#1abc9c";
      c2d.arc(100, 100, 70, 0 - 180 * Math.PI / 360, e - 180 * Math.PI / 360, false);
      c2d.stroke();
      c2d.closePath();
    }
  };
});
});
