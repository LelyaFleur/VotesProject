angular.module('VotesProject').
 factory('Survey', ['$http', function SurveyFactory($http){
 	return {
 		all: function(){
 			return $http({method: 'GET', url: "/api/surveys"})
 		},
 		find: function(id){
 			return $http({method: 'GET', url: "/api/surveys" + id});
 		},
 		update: function(surveyObj) {
      		return $http({method: 'PUT', url: '/api/surveys', data: surveyObj});
    	},
 		create: function(surveyObj){
 			return $http({method: 'POST', url: "/api/surveys", data: surveyObj});
 		}
 	};
 }]);