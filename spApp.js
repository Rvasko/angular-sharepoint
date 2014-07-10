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

function GetSiteUrl() {

	var urlParts = document.location.href.split(".");
	
	return urlParts[0] + "//" + urlParts[2] + "/" + urlParts[3] + "/" + urlParts[4];

}