angular.module('ngTemplateTable').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('buttom-filter.html',
    "<div class=\"btn-group\"><button ng-class=\"{'ghboth':ghfiltername!=btndata.id,'ghdesc':ghfiltername==btndata.id && ghrev,'ghasc':ghfiltername==btndata.id && !ghrev}\" type=\"button\" ng-click=\"ghOrder(btndata.id)\" class=\"btn btn-default\">{{btndata.name}}</button> <button type=\"button\" class=\"btn btn-default dropdown-toggle\" popover-placement=\"bottom\" popover-html-unsafe=\"On the <b>Bottom</b>!\"><span class=\"caret\"></span></button></div>"
  );


  $templateCache.put('popover-html-unsafe-popup.html',
    "<div class=\"popover {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\"><div class=\"arrow\"></div><div class=\"popover-inner\"><h3 class=\"popover-title\" ng-bind=\"title\" ng-show=\"title\"></h3><div class=\"popover-content\" bind-html-unsafe=\"content\"></div></div></div>"
  );


  $templateCache.put('table.html',
    "<div class=\"row\"><div class=\"col-md-12\"><table class=\"table table-striped table-bordered\"><thead><tr><th style=\"cursor: pointer\" ng-class=\"{'ghboth':ghfiltername!=c.id,'ghdesc':ghfiltername==c.id && ghrev,'ghasc':ghfiltername==c.id && !ghrev}\" ng-repeat=\"c in ordered_columns\" ng-click=\"ghOrder(c.id)\">{{ c.name|capitalize }}</th></tr><tbody><tr ng-repeat=\"d in data\"><td ng-repeat=\"c in ordered_columns\">{{ d[c.id] }}</td></tr></tbody></thead></table></div></div>"
  );

}]);
