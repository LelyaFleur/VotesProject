angular.module('VotesProject').directive('newSurvey', function(){
	return {
      restrict: 'E',
      templateUrl: 'templates/directives/new-survey.html',
      scope: {
        surveys: "="
      },
      controller: 'NewSurveyController'
    }
})
