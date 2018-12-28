var userSurveyTokenResourceApi = '/api/v1/usersurveytokencustom/';
var userSurveyTokenExpiredResourceApi = '/api/v1/usersurveytokencustom/expired/';
var userSurveyTokenActiveResourceApi = '/api/v1/usersurveytokencustom/active/';
var userResourceApi = '/api/v1/user/javacoursecandidate/';
var surveyResourceApi = '/api/v1/survey/';
var userSurveyTokenAppResourceApi = '/api/v1/usersurveytoken/';
var sendEmailPartialResourceApi = 'sendEmail/'

app.controller('insertUserSurveyTokenController', function(notice, $scope,
		$http, $location, $route) {

	// getAllUsers for selectTag
	$http({
		method : 'GET',
		url : userResourceApi
	}).then(function(response) {
		$scope.users = response.data;
	});

	// getAllSurvey for selectTag
	$http({
		method : 'GET',
		url : surveyResourceApi
	}).then(function(response) {
		$scope.surveys = response.data;
	});

	$scope.submitUserForm = function() {
		console.log("user id: " + $scope.userToken);
		console.log("survey id: " + $scope.surveyToken);
		console.log($scope.expirationdate);

		var data = {
			"userid" : $scope.userToken,
			"surveyid" : $scope.surveyToken,
			"expirationdate" : $scope.expirationdate
		// + "T00:00:00" statusCode 400
		};
		console.log(data);
		$http({
			method : 'POST',
			url : userSurveyTokenAppResourceApi,
			data : data,

		}).then(function(response) {
			$location.path("/list-all-usersurveytoken");
			console.log(data);
			$route.reload();
			notice.success();
		}, function(errResponse) {
            if(errResponse.status==500)
            	notice.database();
            else
            	notice.error(errResponse.data.errorMessage);
		});
	}
	$scope.resetForm = function() {
		$scope.userToken = null;
		$scope.surveyToken = null;
		$scope.expirationdate = null;
	};
});

app.controller('listUserSurveyTokenController', function(notice, $scope, $http,
		$location, $route, $interval) {
	
	function listUSTokenActive(){
		console.log("list UserSurveyToken active invoked");
		$http({
			method : 'GET',
			url : userSurveyTokenActiveResourceApi
		}).then(function(response) {
			console.log(response.data);
			$scope.list = response.data;
		});
	}
	
	function listUSTokenExpired(){
		console.log("list UserSurveyToken expired invoked");
		$http({
			method : 'GET',
			url : userSurveyTokenExpiredResourceApi
		}).then(function(response) {
			console.log(response.data);
			$scope.listexpired = response.data;
		});
	}
	
	$scope.deleteUserSurveyToken = function(userSurveyTokenId)  {
		
		$http({
			method : 'DELETE',
			url : userSurveyTokenAppResourceApi + userSurveyTokenId
		}).then(function(response) {
			$location.path("/list-all-usersurveytoken");
			$route.reload();
			notice.success();
        },
        function (response) {
            $scope.uploadResult = response.data;
            console.log(response);
            if(response.status==500)
            	notice.database();
            else
            	notice.error(response.data.errorMessage);

		});
	}
	$scope.sendEmail = function(userSurveyTokenId) {
		$http({
			method : 'GET',
			url : userSurveyTokenAppResourceApi + sendEmailPartialResourceApi + userSurveyTokenId
		}).then(function(response) {
			$location.path("/list-all-usersurveytoken");
			$route.reload();
			notice.success();
        },
        function (response) {
            $scope.uploadResult = response.data;
            console.log(response);
            if(response.status==500)
            	notice.database();
            else
            	notice.error(response.data.errorMessage);

		});
	}
	$scope.reloadBool = true;
	$scope.reloadUSToken = 0;

	function incrSec() {
		if ($scope.reloadBool) {
//			console.log("autoReload: " + $scope.reloadBool);
			$scope.reloadUSToken += 10;
			if ($scope.reloadUSToken > 100) {
				$scope.reloadUSToken = 0;
				reload();
			}
		}
	}
	timer = $interval(incrSec, 1000);
	function reload() {
		Pace.restart();
		$scope.reloadUSToken = 0;
		listUSTokenActive();
		listUSTokenExpired();
	}
	$scope.listUSToken = function() {
		reload();
	}
	reload();
	$scope.autoReload = function autoReload() {
		if ($scope.reloadBool) {
			$scope.reloadBool = false;
			$(document).ready(function() {
				$('#ustokenbar').addClass('progress-bar-reload-disabled');
				$('#ustokenexpiredbar').addClass('progress-bar-reload-disabled');
			});
		} else {
			$scope.reloadBool = true;
			$(document).ready(function() {
				$('#ustokenbar').removeClass('progress-bar-reload-disabled');
				$('#ustokenexpiredbar').removeClass('progress-bar-reload-disabled');
			});
		}
		console.log("autoReload: " + $scope.reloadBool);
	}
	$scope.$on("$destroy", function() {
        // clean up autoReload interval
		console.log("stopped USToken autoReload: " + $interval.cancel(timer));
    });
});


app.controller('UserCtrl', function($scope, $http) {
	   $scope.data = {
			   availableOptions: [
				  {id: '0', value: 'tutti', size:''},
			      {id: '1', value: '5', size:5},
			      {id: '2', value: '10', size:10},
			      {id: '3', value: '50',size:50},
			      {id: '4', value: '100',size:100},
			   ],
			   selectedOption: {id: '0', value: 'tutti', size:''} //This sets the default value of the select in the ui
	   };  
	   
	   //initialization of the showed values 
	   $scope.totalPages=1;
	   $scope.currentPage=1;
	   $scope.numberOfPages = 0;
	   
	   $scope.getSelectedItems = function(){
		   if($scope.data.selectedOption.id!=0){
			   if($scope.totalElements < $scope.data.selectedOption.size)
				   $scope.pageSize = $scope.totalElements;
			   else
				   $scope.pageSize = $scope.data.selectedOption.size;
		   } else
			   $scope.pageSize = $scope.totalElements;
		   
		   $http({
				method : 'GET',
				url : userSurveyTokenResourceApi+"/paginated/"+$scope.pageSize+"/"+$scope.numberOfPages+"/"
			}).then(function(response) {
				$scope.list = response.data.content;
				$scope.totalPages = response.data.totalPages;
				$scope.totalElements = response.data.totalElements;
			});
	    };

	    $scope.nextPage = function(){
	    	$scope.numberOfPages+=1;
	    	$scope.currentPage+=1;
	    	$scope.getSelectedItems();
	    };
	    $scope.prevPage = function(){
	    	$scope.numberOfPages-=1;
	    	$scope.currentPage-=1;
	    	$scope.getSelectedItems();
	    };
});
