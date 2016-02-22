angular.module('VotesProject').directive('newSurvey', function(){
	return {
      restrict: 'E',
      templateUrl: 'templates/directives/new-survey.html',
      controller: function(Survey, $scope){
        
        this.survey = { title: '',
                      questions: [{text: '',
                                      choices: [{text:''}]}
                       ]};  

              this.addQuestion = function(){
                this.survey.questions.push({text: '', choices: [{text:''}]});
              };  

              this.addChoice = function(choices){
                choices.push({text:''});
              } 

        this.addSurvey = function(surveys){
          surveys.push(this.survey);

          Survey.create(this.survey)
                  .success(function(data) {
                      $scope.formData = {}; // clear the form so our user is ready to enter another
                      $scope.surveys = data;
                      $scope.showForm = false;
                      console.log(data);
                  })
                  .error(function(data) {
                      console.log('Error: ' + data);
                });

          this.survey = { title: '',
                        questions: [{text: '',
                                           choices: [{text:''}]}
                        ]}; 
        };
      },
      controllerAs: 'newSurveyCtrl'
    }
})
