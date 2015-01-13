/**
 * @ngdoc directive
 * @name ngTemplateTable.directive:ngTemplateTable
 *
 * @description
 * _Please update the description and restriction._
 *
 * @restrict A
 * */


angular.module('ngTemplateTable', ['ui.bootstrap','ui.bootstrap.pagination', 'ngSanitize' ])
    .run(function (paginationConfig) {
        paginationConfig.firstText = 'Primer';
        paginationConfig.previousText = 'Anterior';
        paginationConfig.nextText = 'Siguiente';
        paginationConfig.lastText = 'Último';

    })
    .directive('ngTemplateTable', function ($templateCache, $compile, $filter, $sce, $http, $parse) {
        return {
            restrict: 'AE',
            transclude: true,
            scope: {
                type: "=",
                data: "=",
                paginate: '=',
                numperpage: '=',
                order: '=',
                search: '=',
                column: '='
            },
            template: '<ng-include src="getTemplateUrl()"  />',

            controller: function ($scope, $element) {

                $scope.getTemplateUrl = function () {

                    return $scope.type + ".html";

                };


            },
            link: function (scope, element, attrs) {


                scope.ghnumperpage = 0;
                scope.ghnumperpage = scope.numperpage;

                var template = '';
                var order = '';
                scope.ghfilter = '';
                scope.ghrev = true;
                scope.ordered_columns = [];

                scope.renderTable = function () {

                    scope.ordered_columns = [];

                    for (var i in scope.resp[0]) {
                        if (i !== '$$hashKey')
                        {
                            var column=$filter('filter')(scope.column, {data:i},true);
                            if (column[0]!==undefined)
                                 scope.ordered_columns.push({id:i,name:column[0].name});
                            else
                                scope.ordered_columns.push({id:i,name:i});


                        }
                    }

                };


                scope.ghsearch = '';
                scope.ghfiltername = '';

                scope.resp = angular.copy(scope.data);

                scope.ghOrder = function (name) {
                    scope.ghrev = !scope.ghrev;
                    scope.ghfiltername = name;

                    scope.ghfilters();
                };
                scope.$watch('data', function () {
                    scope.ghfilters();
                }, true);

                scope.$watch('ghsearch', function () {
                    scope.ghfilters();
                }, true);


                if (scope.search == true) {

                    var pag = '<div class="row" >' +
                        '<div class="col-md-2">' +
                        '<select ng-model="ghnumperpage" ng-change="ghfilters()"><option ng-repeat="d in ghnumberPerPage">{{d}}</option></select>' +
                        '</div>' +
                        '<div class="col-md-7">';
                    if (scope.order == true) {
                        pag = pag + '<div class="btn-group" ng-show="type!=\'table\'" role="group" aria-label="...">';
                        for (var i in scope.resp[0]) {
                            var column=$filter('filter')(scope.column, {data:i},true);
                            var name= i;
                            if (column[0]!==undefined){
                                name=column[0].name
                            }
                            if (i !== '$$hashKey') {
                                var menu="<ul><li><input type='checkbox'/><span>hola</span></li></ul>";
                                pag = pag + '<div class="btn-group"> <button   ng-class="{\'ghboth\':ghfiltername!=\'' + i + '\',\'ghdesc\':ghfiltername==\'' + i + '\' && ghrev,\'ghasc\':ghfiltername==\'' + i + '\' && !ghrev}" type="button" ng-click="ghOrder(\'' + i + '\')" class="btn btn-default">' + name + '</button><button type="button" class="btn btn-default dropdown-toggle" popover-placement="bottom" popover-html-unsafe="'+menu+'"><span class="caret"></span></button></div>'
                            }
                        }

                        pag = pag + '</div>';

                    }

                    pag = pag + '</div>' +
                    '<div class="col-md-3">' +
                    '<input type="text" ng-model="ghsearch" class="form-control">' +
                    '</div>' +
                    '<hr/>' +
                    '</div>';
                    element.prepend($compile(pag)(scope));

                }


                if (scope.paginate == true) {
                    scope.ghtotalItems = scope.resp.length;
                    scope.ghcurrentPage = 1;

                    var pag = '<div class="text-right"><pagination boundary-links="true" items-per-page="ghnumperpage" ng-change="ghfilters()" total-items="ghtotalItems" ng-model="ghcurrentPage" ></pagination></div>';

                    element.append($compile(pag)(scope));

                }

                scope.ghfilters = function () {
                    if (scope.resp.length == 0)
                        scope.resp = scope.data;
                    if (scope.order == true) {
                        scope.data = $filter('orderBy')(scope.resp, scope.ghfiltername, scope.ghrev);


                    }
                    if (scope.search == true)
                        scope.data = $filter('filter')(scope.data, scope.ghsearch);

                    if (scope.paginate == true) {
                        var begin = ((scope.ghcurrentPage - 1) * scope.ghnumperpage);
                        var end = begin + scope.ghnumperpage;
                        scope.data = scope.data.slice(begin, end);
                    }

                    if (scope.type == 'table') {
                        scope.renderTable();
                    }


                };
                scope.$watch('type', function () {
                    if (scope.type == 'table') {
                        scope.renderTable();
                    }
                })


                scope.ghnumberPerPage = [3, 5, 10, 20, 30, 40];
            }
        }
    })
