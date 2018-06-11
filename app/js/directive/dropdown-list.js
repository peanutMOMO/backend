/**
 * 产生sidebar的二级菜单
 **
 * 布局中dropdown-header跟dropdown-list是同级的布局
 * 数据只有dropdown-list，所以这样处理
 * 
 * @author TaNg
 * @date   2016-03-01T14:35:08+0800
 */
define(['./directive'], function(directive) {
  'use strict';

  directive.directive("dropdownList", function() {
  return {
    restrict: "A",
    link: function(scope, element, attr) {
      //判断数组中是否存在元素
      var isContains = function(set, e) {

        for (var i = 0; i < set.length; i++) {

          if (set[i] == e) {
            return true;
          }
        }
        return false;
      };

      var subMenus = scope.menu.subMenu,
        route = window.location.pathname,
        subTitle = [],
        html = '';
      //找出所有的title
      for (var i = 0; i < subMenus.length; i++) {
        var title = subMenus[i].project_name;

        if (!isContains(subTitle, title)) {
          subTitle.push(title);
        }
      }
      //根据title产生列表
      for (i = 0; i < subTitle.length; i++) {
        html += '<li class="dropdown-header">' + subTitle[i] + '</li>';

        for (var j = 0; j < subMenus.length; j++) {
          var subMenu = subMenus[j],
            url = subMenu.menuUrl;

          if (subMenu.project_name == subTitle[i]) {
            var attrClass = '';

            if (route == url) {
              attrClass = 'class="active"';
              element.parent().addClass('active');
            }
            html += '<li ' + attrClass + '>' +
              '<a href="' + url + '">' + subMenu.menuName + '</a>' +
              '</li>';
          }
        }
      }

      element.html(html);
    }
  };
});
});
