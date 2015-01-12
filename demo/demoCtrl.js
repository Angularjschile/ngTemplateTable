/**
 * @ngdoc controller
 * @name demo.controller:demoCtrl
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */


angular.module('demo', ['ngTemplateTable'])
    .controller('demoCtrl', function ($scope) {
        $scope.tipo = 'table';
        $scope.currentPage = 10;
        $scope.rojo =   Math.floor(Math.random() * 101) ;
        $scope.verde =   Math.floor(Math.random() * 101) ;

        $scope.data =

            [{

                "plan": "plan 348",
                "descripcion": "plan 348",
                "area": "Vantaz 1.1.1",
                "proyecto": "Gesti\u00f3n HSEC Vantaz",
                "contrato": "Gesti\u00f3n HSEC",
                "responsable": "Eduardo Chand\u00eda",
                "estado": "Ejecucci\u00f3n",
                "inicio": null,
                "termino": null,
                "progreso": "0 %",
                "alcance": "H S E",
                "semaforo": null
            }, {
                "plan": "demo 4",
                "descripcion": "demo",
                "area": "Vantaz 1.3",
                "proyecto": "Gesti\u00f3n HSEC Vantaz",
                "contrato": "Gesti\u00f3n HSEC",
                "responsable": "German Rodriguez",
                "estado": "Registrado",
                "inicio": "04-01-2015",
                "termino": "13-01-2015",
                "progreso": "50 %",
                "alcance": "H S E C",
                "semaforo": "#bd362f"
            }, {
                "plan": "asd",
                "descripcion": "asd",
                "area": "Vantaz 1.1.1",
                "proyecto": "Gesti\u00f3n HSEC Vantaz",
                "contrato": "Gesti\u00f3n HSEC",
                "responsable": "Claudio Lemus",
                "estado": "Creaci\u00f3n",
                "inicio": null,
                "termino": null,
                "progreso": "0 %",
                "alcance": "H",
                "semaforo": null
            }, {

                "plan": "plan 3",
                "descripcion": "plan",
                "area": "Vantaz",
                "proyecto": "Gesti\u00f3n HSEC Vantaz",
                "contrato": "Gesti\u00f3n HSEC",
                "responsable": "GABRIEL MU\u00d1OZ",
                "estado": "Creaci\u00f3n",
                "inicio": "04-01-2015",
                "termino": "15-01-2015",
                "progreso": "25 %",
                "alcance": "H",
                "semaforo": "#bd362f"
            }, {

                "plan": "plan depasd",
                "descripcion": "asdasd",
                "area": "Vantaz",
                "proyecto": "Gesti\u00f3n HSEC Vantaz",
                "contrato": "Gesti\u00f3n HSEC",
                "responsable": "Sim\u00f3n Sagredo",
                "estado": "Creaci\u00f3n",
                "inicio": "09-01-2015",
                "termino": "16-07-2015",
                "progreso": "0 %",
                "alcance": " S",
                "semaforo": "#51a351"
            }]


    });
