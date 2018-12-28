var app = angular.module('userregistrationsystem', [ 'ngRoute', 'ngResource' ]);

app.config(function($routeProvider) {
	$routeProvider.when('/input-csv', {
		templateUrl : '/a/template/csv/form.html',
		controller : 'saveCsv'
	}).when('/list-all-candidates', {
		templateUrl : '/a/template/candidate/list.html',
		controller : 'listUserController'
	}).when('/insert-new-candidate', {
		templateUrl : '/a/template/candidate/new.html',
		controller : 'registerUserController'
	}).when('/update-candidate/:id', {
		templateUrl : '/a/template/candidate/update.html',
		controller : 'candidateDetailsController'
	}).when('/list-all-usersurveytoken', {
		templateUrl : '/a/template/usersurveytoken/list.html',
		controller : 'listUserSurveyTokenController'
	}).when('/insert-new-usersurveytoken', {
		templateUrl : '/a/template/usersurveytoken/new.html',
		controller : 'insertUserSurveyTokenController'
	}).otherwise({
		redirectTo : '/home',
		templateUrl : '/a/template/statistics.html',
		controller : 'statisticsController'
	});
	

});

// ################# START SERVICE NOTICE OPERATION #################
var timeNotice = 2000; // time in milliseconds (1000 = 1sec)

app.service('notice', function($rootScope) {
	
	this.success = function noticeSuccess() {
		console.log("noticeSuccess invoked");
		$rootScope.successMessageBool = true;
		setTimeout(function() {
			$('#noticeModalSuccess').fadeOut('fast');
			$rootScope.successMessageBool = false;
		}, timeNotice);
	}

	this.error = function noticeError(msg) {
		console.log("noticeError invoked");
		console.log("error message received: "+msg);
		$rootScope.errorMessage = msg;
		$rootScope.errorMessageBool = true;
		setTimeout(function() {
			$('#noticeModalError').fadeOut('fast');
			$rootScope.errorMessageBool = false;
			$rootScope.errorMessage = "";
		}, timeNotice);
	}
	
	this.database = function noticeErrorDB() {
		console.log("noticeErrorDB invoked");
		$rootScope.errorDBMessageBool = true;
		setTimeout(function() {
			$('#noticeModalErrorDB').fadeOut('fast');
			$rootScope.errorDBMessageBool = false;
		}, timeNotice);
	}
});
//################# END SERVICE NOTICE OPERATION #################

// DIRECTIVE - FILE MODEL
app.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
           
          element.bind('change', function(){
             scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
     
}]);

// DIRECTIVE - TOOLTIP

app.directive('toggle', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      if (attrs.toggle=="tooltip"){
        $(element).tooltip();
      }
      if (attrs.toggle=="popover"){
        $(element).popover();
      }
    }
  };
})