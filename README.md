## Angularjs GreenHsec Table

## Instalación desde Bower
    bower install --save ng-ghsec-table

## Modo de uso
    <div ng-greenhsec-table></div>
    <ng-greenhsec-table></ng-greenhsec-table>
    
## Parametros
    template: direccion del template 
    data: Datos para la tabla
    order: activar orden
    filter: activar filtros
    paginate: activar paginación
    numperpage: numeros por pagina en paginación
    
   
## Ejemplo    
    <div ng-greenhsec-table 
    template="template2.html" 
    data="data" 
    order="true"  
    filter="true" 
    paginate="true" 
    numperpage="currentPage" >
    </div>
    <script type="text/ng-template" id="template2.html">
        <table class="table table-hover table-striped">
        	<thead>
        		<tr>
        			<th ng-click="ghOrder('name');">nombre</th>
                    <th ng-click="ghOrder('age');">Edad</th>
        		</tr>
        	</thead>
        	<tbody>
        		<tr ng-repeat="d in data">
        			<td>{{$index+1}} - {{d.name}}</td>
                    <td>{{d.age}}</td>
        		</tr>
        	</tbody>
        </table>
    </script>
    
    