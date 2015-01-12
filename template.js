angular.module('ngTemplateTable').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('table.html',
    "<div class=\"row\"><div class=\"col-md-12\"><table class=\"table table-striped table-bordered\"><thead><tr><th style=\"cursor: pointer\" ng-class=\"{'ghboth':ghfiltername!=c,'ghdesc':ghfiltername==c && ghrev,'ghasc':ghfiltername==c && !ghrev}\" ng-repeat=\"c in ordered_columns\" ng-click=\"ghOrder(c)\">{{ c|capitalize }}</th></tr><tbody><tr ng-repeat=\"d in data\"><td ng-repeat=\"c in ordered_columns\">{{ d[c] }}</td></tr></tbody></thead></table></div></div>"
  );

}]);
