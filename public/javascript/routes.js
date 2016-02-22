angular.module('VotesProject').config(['$routeProvider', function($routeProvider) {
  $routeProvider

    .when('/', {
      // redirect to the survey index
      redirectTo: '/surveys'
    })
    
    .when('/surveys', {
      templateUrl: 'templates/pages/surveys/index.html',
      controller: 'SurveyListController'
    })

    .when('/sur/:id', {
  		templateUrl: 'templates/pages/surveys/show.html',
  		controller: 'SurveysShowController'
	})

    .otherwise({redirectTo: '/'});
}]);

		