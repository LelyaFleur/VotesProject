angular.module('VotesProject').controller('SurveyListController', function($scope, $http){
		$scope.formData = {};
		$scope.showForm = false;

	    // when landing on the page, get all surveys and show them
	    $http.get('/api/surveys')
	        .success(function(data) {
	            $scope.surveys = data;
	            console.log(data);
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });
	});