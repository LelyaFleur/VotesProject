angular.module('VotesProject').controller('SurveysShowController', function($http, $routeParams,$scope) {
	$http({method:'GET', url: 'api/sur/' + $routeParams.id })
		.success(function(data){
			$scope.survey = data;
		})
});