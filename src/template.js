angular.module('ngTemplateTable').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('buttom-filter.html',
    "<div class=\"btn-group\" ng-repeat=\"btndata in data\"><button ng-class=\"{'ghboth':ghfiltername!=btndata.id,'ghdesc':ghfiltername==btndata.id && ghrev,'ghasc':ghfiltername==btndata.id && !ghrev}\" type=\"button\" ng-click=\"ghOrder(btndata.id)\" class=\"btn btn-default\">{{btndata.name}}</button> <button ns-popover ns-popover-template=\"popover-data.html\" ns-popover-trigger=\"click\" ns-popover-placement=\"bottom\" ns-popover-theme=\"ns-popover-tooltip-theme\" class=\"btn btn-default\"><span class=\"caret\"></span></button></div>"
  );


  $templateCache.put('popover-data-table.html',
    "<ul class=\"list-group\"><li class=\"list-group-item\"><input type=\"text\" ng-model=\"c.search\"></li><li class=\"list-group-item\"><input type=\"checkbox\" ng-change=\"selectAll(c.id,c.all)\" ng-model=\"c.all\">(Seleccionar Todos)</li><li class=\"list-group-item\" ng-repeat=\"d in c.items|filter:c.search\"><input type=\"checkbox\" ng-model=\"d.state\" ng-change=\"ngFilterCheck(c.id,d.value,d.state)\"> {{d.value}}</li></ul>"
  );


  $templateCache.put('popover-data.html',
    "<ul class=\"list-group\"><li class=\"list-group-item\"><input type=\"text\" ng-model=\"btndata.search\"></li><li class=\"list-group-item\" ng-repeat=\"d in btndata.items|filter:btndata.search\"><input type=\"checkbox\" ng-model=\"d.state\" ng-change=\"ngFilterCheck(btndata.id,d.value,d.state)\"> {{d.value}}</li></ul>"
  );


  $templateCache.put('table.html',
    "<div class=\"row\"><div class=\"col-md-12\"><table class=\"table table-striped table-bordered\"><thead><tr><th style=\"cursor: pointer\" ng-show=\"c.view\" ng-repeat=\"c in ordered_columns\" ng-class=\"{'ghboth':ghfiltername!=c.id,'ghdesc':ghfiltername==c.id && ghrev,'ghasc':ghfiltername==c.id && !ghrev}\"><div style=\"position:relative\"><div ns-popover class=\"ui-grid-column-menu-button\" ns-popover-template=\"popover-data-table.html\" ns-popover-trigger=\"click\" ns-popover-placement=\"bottom\" ns-popover-theme=\"ns-popover-tooltip-theme\"><span class=\"caret\"></span></div></div><p ng-click=\"ghOrder(c.id)\" style=\"margin-left: 8px\">{{ c.name|capitalize }}</p></th></tr><tbody><tr ng-repeat=\"d in data\"><td ng-repeat=\"c in ordered_columns\" ng-show=\"c.view\"><p class=\"{{c.class}}\">{{ d[c.id] }} <i ng-show=\"c.class=='ngtemplate-percentage'\">%</i></p></td></tr></tbody></thead></table></div></div>"
  );

}]);
