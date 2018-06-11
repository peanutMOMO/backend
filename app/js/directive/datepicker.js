/**
 * 日历控件
 * @author TaNg
 * @date   2016-03-01T14:34:57+0800
 */
define(['./directive', 'WdatePicker'], function(directive) {

  directive.directive("datepicker", function() {
    return {
      restrict: "A",
      link: function(scope, element, attr) {
        element.bind("click", function() {
          WdatePicker({
            dateFmt: attr.datefmt,
            maxDate: "%y-%M-%d",
            minDate: "2015-10-27",
            isShowToday: false,
            isShowClear: false,
            qsEnabled: false,
            isShowOK: false
          });
        });
      }
    };
  });
});
