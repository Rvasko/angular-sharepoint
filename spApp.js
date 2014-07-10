var spApp = angular.module('spApp', []);

spApp.controller('spListCtrl', function($scope, $http) {
	$http(
	{
		method: "GET",
		url: "http://sp2013/sites/dev/strategy/_api/web/lists/getByTitle('Performance Measures')/items?select=Id,Title,Target_x0020_Value",
		headers: { "Accept": "application/json;odata=verbose" }	
	}
	).success(function (data, status, headers, config) {
		$scope.Measures = data.d.results;
	}).error(function (data, status, headers, config) {
	});
});

spApp.directive('jqGrid', function ($compile) {
    return function (scope, element, attrs) {
        // apply the plugin
        var jqGrid = element.jqGrid({
            //data:  [{ id: 1,  amount: 200}],
            datatype: "local",
            height: 400,
            colNames: ['ID', 'KPI', 'Taget Value'],
            colModel: [{
                name: 'Id',
                index: 'Id',
                width: 60
            }, {
                name: 'Title',
                index: 'Title',
                width: 500
            },{ 
				name: 'Target_x0020_Value',
				index: 'Target_x0020_Value',
				width: 60
			}],
            caption: "Performance Measures"
        });
        scope.$watch(attrs.uiItems, function (values) {
            // watch for changes
            var val = values || null;
            if (val) {
                jqGrid.setGridParam({
                    'data': val
                }).trigger('reloadGrid');
                var element = $compile('<p>{{total}}</p>')(scope);
                console.log(element);
            }

        }, true);
    };
});

function GetSiteUrl() {

	var urlParts = document.location.href.split(".");
	
	return urlParts[0] + "//" + urlParts[2] + "/" + urlParts[3] + "/" + urlParts[4];

}