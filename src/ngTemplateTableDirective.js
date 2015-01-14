/**
 * @ngdoc directive
 * @name ngTemplateTable.directive:ngTemplateTable
 *
 * @description
 * _Please update the description and restriction._
 *
 * @restrict A
 * */


angular.module('ngTemplateTable', ['ui.bootstrap', 'ngSanitize', 'nsPopover', 'angular.filter','ngAnimate'])
    .run(['paginationConfig',function (paginationConfig) {
        paginationConfig.firstText = 'Primer';
        paginationConfig.previousText = 'Anterior';
        paginationConfig.nextText = 'Siguiente';
        paginationConfig.lastText = 'Último';

    }])
    .directive('ngTemplateTable',['$templateCache', '$compile', '$filter', '$sce', '$http','$parse', function ($templateCache, $compile, $filter, $sce, $http, $parse) {
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
                        if (i !== '$$hashKey') {

                            var item = [];
                            var unique = $filter('unique')(scope.resp, i);
                            for (var iu = 0; iu < unique.length; iu++) {
                                var fil = $filter('filter')(scope.omit, {id: i,data:unique[iu][i]}, true);

                                var state = true;
                                if (fil[0] !== undefined)
                                    state = false;
                                item.push({value: unique[iu][i], state: state})
                            }
                            var column = $filter('filter')(scope.column, {data: i}, true);
                            if (column[0] !== undefined) {

                                scope.ordered_columns.push({
                                    id: i,
                                    name: column[0].name,
                                    view: column[0].visible,
                                    class: 'ngtemplate-' + column[0].type,
                                    items: item,
                                    all:true
                                });
                            }
                            else
                                scope.ordered_columns.push({id: i, name: i, view: true, items: item,all:true});


                        }
                    }

                };
                scope.omit = [];

                scope.selectAll=function(id,state){

                    var fil = $filter('filter')(scope.ordered_columns, {id:id});

                    var index = scope.ordered_columns.indexOf(fil[0]);

                        for (var i=0;i<scope.ordered_columns[index].items.length;i++){
                            scope.ordered_columns[index].items[i].state=state;
                            var filtro;
                            if (state)
                                filtro = id + '!=="' + scope.ordered_columns[index].items[i].value + '"';
                            else
                                filtro = id + '=="' + scope.ordered_columns[index].items[i].value + '"';
                            if (!state)
                                scope.omit.push({value: filtro, id: id,data:scope.ordered_columns[index].items[i].value});
                            else {
                                var fil = $filter('filter')(scope.omit, {id:id,data:scope.ordered_columns[index].items[i].value} );
                                var index2 = scope.omit.indexOf(fil);
                                scope.omit.splice(index2, 1);
                            }
                        }

                    scope.ghfilters();
                }
                scope.ngFilterCheck = function (id, valor, estado) {
                    console.log(id,valor+' '+estado)
                    var filtro;
                    if (estado)
                        filtro = id + '!=="' + valor + '"';
                    else
                        filtro = id + '=="' + valor + '"';
                    if (!estado)
                        scope.omit.push({value: filtro, id: id,data:valor});
                    else {
                        var fil = $filter('filter')(scope.omit, {id:id,data:valor} );
                        var index = scope.omit.indexOf(fil[0]);
                        scope.omit.splice(index, 1);
                    }
                    console.log(scope.omit)
                    scope.ghfilters();


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

                        var btn = '<div btn-order-filter data="ordered_columns"></div>';
                        pag = pag + btn;

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

                    if (scope.omit.length > 0) {
                        for (var i = 0; i < scope.omit.length; i++)
                            scope.data = $filter('omit')(scope.data, scope.omit[i].value);
                    }

                    if (scope.type == 'table') {
                        //scope.renderTable();
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
    }])
