var candidateResourceApi = '/api/v1/candidatecustom/';

app
		.controller(
				'registerUserController',
				function(notice, $scope, $http, $location, $route) {
					$scope.uploadResult = "";
					var stringMessage = "";
					// domicileCity":"","domicileStreetName":"","domicileHouseNumber":"","studyQualification":"","graduate":false,"highGraduate":false,"stillHighStudy":false,"mobile":"","cvExternalPath":"","email":"1@2.3","firstname":"bbb","lastname":"aaa","dateOfBirth":"2018-11-01","imgpath":null}]
					$scope.myForm = {
						domicileCity : "",
						domicileStreetName : "",
						domicileHouseNumber : "",
						studyQualification : "",
						graduate : "",
						highGraduate : "",
						stillHighStudy : "",
						mobile : "",
						cvExternalPath : "",
						email : "",
						firstname : "",
						lastname : "",
						dateOfBirth : "",
						imgpath : "",

						files : []
					}

					$scope.submitUserForm = function() {

						// var url = "/rest/uploadMultiFiles";

						if ($scope.validateForm()) {

							var data = new FormData();

							data.append("domicileCity",
									$scope.myForm.domicileCity);
							data.append("domicileStreetName",
									$scope.myForm.domicileStreetName);
							data.append("domicileHouseNumber",
									$scope.myForm.domicileHouseNumber);
							data.append("studyQualification",
									$scope.myForm.studyQualification);
							data.append("graduate", $scope.myForm.graduate);
							console.log("graduate" + $scope.myForm.graduate);
							data.append("highGraduate",
									$scope.myForm.highGraduate);
							console.log("highGraduate"
									+ $scope.myForm.highGraduate);
							data.append("stillHighStudy",
									$scope.myForm.stillHighStudy);
							console.log("stillHighStudy"
									+ $scope.myForm.stillHighStudy);
							data.append("mobile", $scope.myForm.mobile);
							data.append("email", $scope.myForm.email);
							data.append("firstname", $scope.myForm.firstname);
							data.append("lastname", $scope.myForm.lastname);

							data.append("dateOfBirth",
									$scope.myForm.dateOfBirth);

							// console.log("files0 "+$scope.myForm.files[0]);
							// console.log("filesname0
							// "+$scope.myForm.files[0].name);
							// console.log("files1 "+$scope.myForm.files[1]);
							// console.log("filesname1
							// "+$scope.myForm.files[0].name);

							if (typeof ($scope.myForm.files[0]) != "undefined") {
								console.log("filesname0 "
										+ $scope.myForm.files[0].name);
								data.append("files", $scope.myForm.files[0]);
								data.append("imgpath",
										$scope.myForm.files[0].name);
							}

							if (typeof ($scope.myForm.files[1]) != "undefined") {
								console.log("filesname0 "
										+ $scope.myForm.files[1].name);
								data.append("files", $scope.myForm.files[1]);
								data.append("cvExternalPath",
										$scope.myForm.files[1].name);
							}

							var config = {
								transformRequest : angular.identity,
								transformResponse : angular.identity,
								headers : {
									'Content-Type' : undefined

								}
							}

							$http
									.post(candidateResourceApi, data, config)
									.then(
											// Success
											function(response) {
												$scope.uploadResult = response.data;
												console.log(data);
												$location
														.path("/list-all-candidates");
												$route.reload();
												notice.success();
											},
											// Error
											function(response) {
												$scope.uploadResult = response.data;
												console.log(response);
												if (response.status == 500)
													notice.database();
												else
													notice
															.error(response.data.errorMessage);

											});
						} else {
							notice.error(stringMessage);
						}
					};

					$scope.resetForm = function() {
						$scope.myForm = null;
					};

					$scope.validateForm = function() {
						console.log("validateForm START");

						var firstnameTmp = $scope.myForm.firstname;
						console.log("firstnameTmp: " + firstnameTmp);

						if (firstnameTmp == undefined || firstnameTmp == null) {
							stringMessage = "nome errato";
							return false;
						}

						var lastnameTmp = $scope.myForm.lastname;
						console.log("firstnameTmp: " + lastnameTmp);

						if (lastnameTmp == undefined || lastnameTmp == null) {
							stringMessage = "cognome errato";
							return false;
						}

						var mobileTmp = $scope.myForm.mobile;
						console.log("mobileTmp: " + mobileTmp);
						if (mobileTmp == undefined || mobileTmp == null) {
							stringMessage = "cellulare errato";
							return false;
						}

						var emailTmp = $scope.myForm.email;
						console.log("emailTmp: " + emailTmp);
						if (emailTmp == undefined || emailTmp == null) {
							stringMessage = "email errata";
							return false;
						}

						var domicileCityTmp = $scope.myForm.domicileCity;
						console.log("domicileCityTmp: " + domicileCityTmp);
						if (domicileCityTmp == undefined
								|| domicileCityTmp == null) {
							stringMessage = "domicilio errato";
							return false;
						}

						var domicileStreetNameTmp = $scope.myForm.domicileStreetName;
						console.log("Mobiletmp: " + domicileStreetNameTmp);
						if (domicileStreetNameTmp == undefined
								|| domicileStreetNameTmp == null) {
							stringMessage = "via errata";
							return false;
						}

						var domicileHouseNumberTmp = $scope.myForm.domicileHouseNumber;
						console.log("Mobiletmp: " + domicileHouseNumberTmp);
						if (domicileHouseNumberTmp == undefined
								|| domicileHouseNumberTmp == null) {
							stringMessage = "numero domicilio errato";
							return false;
						}

						var studyQualificationTmp = $scope.myForm.studyQualification;
						console.log("studyQualificationTmp: "
								+ studyQualificationTmp);
						if (studyQualificationTmp == undefined
								|| studyQualificationTmp == null) {
							stringMessage = "titoli di studio errati";
							return false;
						}

						console.log("validateForm END --> true");
						return true;
					};
				});

app.controller('listUserController', function(notice, $scope, $http, $location,
		$route, $interval) {
	// $scope.imgFullPath="http://localhost:8080/profile/img/";
	$scope.imgFullPath = "/profile/img/";

	function listCandidate() {
		console.log("list Candidate invoked");
		Pace.restart();
		$http({
			method : 'GET',
			url : candidateResourceApi
		}).then(function(response) {
			console.log(response.data);
			$scope.list = response.data;
		});
	}
	$scope.editCandidateCustom = function(candidateCustomId) {
		$location.path("/update-candidate/" + candidateCustomId);
	}
	$scope.deleteCandidateCustom = function(candidateCustomId) {
		$http({
			method : 'DELETE',
			url : candidateResourceApi + candidateCustomId
		}).then(function(response) {
			$location.path("/list-all-candidates");
			console.log(response);
			notice.success();
			$route.reload();

		},
		// Error
		function(response) {
			$scope.uploadResult = response.data;
			console.log(response);
			if (response.status == 500)
				notice.database();
			else
				notice.error(response.data.errorMessage);

		});
	}
	$scope.reloadBool = true;
	$scope.reloadCandidate = 0;

	function incrSec() {
		if ($scope.reloadBool) {
//			console.log("autoReload: " + $scope.reloadBool);
			$scope.reloadCandidate += 10;
			if ($scope.reloadCandidate > 100) {
				$scope.reloadCandidate = 0;
				reload();
			}
		}
	}
	timer = $interval(incrSec, 1000);
	function reload() {
		$scope.reloadCandidate = 0;
		listCandidate();
	}
	$scope.listCand = function() {
		reload();
	}
	reload();
	$scope.autoReload = function autoReload() {
		if ($scope.reloadBool) {
			$scope.reloadBool = false;
			$(document).ready(function() {
				$('#candidatebar').addClass('progress-bar-reload-disabled');
			});
		} else {
			$scope.reloadBool = true;
			$(document).ready(function() {
				$('#candidatebar').removeClass('progress-bar-reload-disabled');
			});
		}
		console.log("autoReload: " + $scope.reloadBool);
	}
	$scope.$on("$destroy", function() {
        // clean up autoReload interval
		console.log("stopped Candidate autoReload: " + $interval.cancel(timer));
    });
});

app
		.controller(
				'candidateDetailsController',
				function(notice, $scope, $http, $location, $routeParams, $route) {
					var getImg = "";
					var getCV = "";

					$scope.candidateCustomId = $routeParams.id;
					$http({
						method : 'GET',
						url : candidateResourceApi + $scope.candidateCustomId
					}).then(function(response) {
						$scope.candidateCustom = response.data;
						getImg = $scope.candidateCustom.imgpath;
						getCV = $scope.candidateCustom.cvExternalPath;
						console.log($scope.candidateCustom);
					});

					$scope.candidateCustom = {
						userId : "",
						domicileCity : "",
						domicileStreetName : "",
						domicileHouseNumber : "",
						studyQualification : "",
						graduate : "",
						highGraduate : "",
						stillHighStudy : "",
						mobile : "",
						cvExternalPath : null,
						email : "",
						firstname : "",
						lastname : "",
						dateOfBirth : "",
						imgpath : null,
						oldImg : null,
						oldCV : null,

						files : []
					}

					$scope.submitUserForm = function() {

						console.log("getImg " + getImg);
						console.log("getCV " + getCV);

						if ($scope.validateForm()) {
							var data = new FormData();

							data
									.append("userId",
											$scope.candidateCustom.userId);
							console.log("$scope.candidateCustom.userId "
									+ $scope.candidateCustom.userId);

							data.append("domicileCity",
									$scope.candidateCustom.domicileCity);
							data.append("domicileStreetName",
									$scope.candidateCustom.domicileStreetName);
							data.append("domicileHouseNumber",
									$scope.candidateCustom.domicileHouseNumber);
							data.append("studyQualification",
									$scope.candidateCustom.studyQualification);

							if ($scope.candidateCustom.graduate == null) {
								data.append("graduate", false);
							} else {
								data.append("graduate",
										$scope.candidateCustom.graduate);
								console.log("graduate"
										+ $scope.candidateCustom.graduate);
							}

							if ($scope.candidateCustom.highGraduate == null) {
								data.append("highGraduate", false);
							} else {
								data.append("highGraduate",
										$scope.candidateCustom.highGraduate);
								console.log("highGraduate"
										+ $scope.candidateCustom.highGraduate);
							}

							if ($scope.candidateCustom.stillHighStudy == null) {
								data.append("stillHighStudy", false);
							} else {
								data.append("stillHighStudy",
										$scope.candidateCustom.stillHighStudy);
								console
										.log("stillHighStudy"
												+ $scope.candidateCustom.stillHighStudy);
							}

							data
									.append("mobile",
											$scope.candidateCustom.mobile);
							data.append("email", $scope.candidateCustom.email);
							data.append("firstname",
									$scope.candidateCustom.firstname);
							data.append("lastname",
									$scope.candidateCustom.lastname);

							console.log("$scope.candidateCustom.dateOfBirth "
									+ $scope.candidateCustom.dateOfBirth); // old
																			// dateOfBirth
							console.log("$scope.dateOfBirth : "
									+ $scope.dateOfBirth); // new dateOfBirth

							if ($scope.dateOfBirth == null) {

								// var inputDate =
								// $scope.candidateCustom.dateOfBirth;
								// var d = new Date(inputDate);
								// console.log("inputDate " + d);
								// data.append("dateOfBirth", d);
							} else {

								var inputDate = $scope.dateOfBirth;
								var d = new Date(inputDate);
								console.log("inputDate " + d);
								data.append("dateOfBirth", d);
							}

							data.append("oldImg", getImg);
							data.append("oldCV", getCV);

							console.log("oldImg " + getImg);
							console.log("oldCV " + getCV);

							console.log("$scope.candidateCustom.files"
									+ $scope.candidateCustom.files);
							var fileIsPresent = $scope.candidateCustom.files;

							if (fileIsPresent) {

								if (typeof ($scope.candidateCustom.files[0]) != "undefined") {
									console
											.log("Filesname0 IMG IS PRESENT "
													+ $scope.candidateCustom.files[0].name);
									data.append("files",
											$scope.candidateCustom.files[0]);
									data
											.append(
													"imgpath",
													$scope.candidateCustom.files[0].name);
								} else {
									data.append("imgpath", null);
								}

								if (typeof ($scope.candidateCustom.files[1]) != "undefined") {
									console
											.log("Filesname1 CV IS PRESENT"
													+ $scope.candidateCustom.files[1].name);
									data.append("files",
											$scope.candidateCustom.files[1]);
									data
											.append(
													"cvExternalPath",
													$scope.candidateCustom.files[1].name);
								} else {
									data.append("cvExternalPath", null);
								}

							}

							var config = {
								transformRequest : angular.identity,
								transformResponse : angular.identity,
								headers : {
									'Content-Type' : undefined

								}
							}

							$http.put(
									candidateResourceApi
											+ $scope.candidateCustomId, data,
									config).then(
							// Success
							function(response) {
								console.log(data);
								$location.path("/list-all-candidates");
								$route.reload();
								notice.success();
							},
							// Error
							function(response) {
								$scope.uploadResult = response.data;
								console.log(response);
								if (response.status == 500)
									notice.database();
								else
									notice.error(response.data.errorMessage);

							});
						} else {
							notice.error(stringMessage);
						}

					}

					$scope.validateForm = function() {
						console.log("validateForm START");

						var firstnameTmp = $scope.candidateCustom.firstname;
						console.log("firstnameTmp: " + firstnameTmp);

						if (firstnameTmp == undefined || firstnameTmp == null
								|| firstnameTmp == "") {
							stringMessage = "nome errato";
							return false;
						}

						var lastnameTmp = $scope.candidateCustom.lastname;
						console.log("firstnameTmp: " + lastnameTmp);

						if (lastnameTmp == undefined || lastnameTmp == null
								|| lastnameTmp == "") {
							stringMessage = "cognome errato";
							return false;
						}

						var mobileTmp = $scope.candidateCustom.mobile;
						console.log("mobileTmp: " + mobileTmp);
						if (mobileTmp == undefined || mobileTmp == null
								|| mobileTmp == "") {
							stringMessage = "cellulare errato";
							return false;
						}

						var emailTmp = $scope.candidateCustom.email;
						console.log("emailTmp: " + emailTmp);
						if (emailTmp == undefined || emailTmp == null
								|| emailTmp == "") {
							stringMessage = "email errata";
							return false;
						}

						var domicileCityTmp = $scope.candidateCustom.domicileCity;
						console.log("domicileCityTmp: " + domicileCityTmp);
						if (domicileCityTmp == undefined
								|| domicileCityTmp == null
								|| domicileCityTmp == "") {
							stringMessage = "domicilio errato";
							return false;
						}

						var domicileStreetNameTmp = $scope.candidateCustom.domicileStreetName;
						console.log("Mobiletmp: " + domicileStreetNameTmp);
						if (domicileStreetNameTmp == undefined
								|| domicileStreetNameTmp == null
								|| domicileStreetNameTmp == "") {
							stringMessage = "via errata";
							return false;
						}

						var domicileHouseNumberTmp = $scope.candidateCustom.domicileHouseNumber;
						console.log("Mobiletmp: " + domicileHouseNumberTmp);
						if (domicileHouseNumberTmp == undefined
								|| domicileHouseNumberTmp == null
								|| domicileHouseNumberTmp == "") {
							stringMessage = "numero domicilio errato";
							return false;
						}

						var studyQualificationTmp = $scope.candidateCustom.studyQualification;
						console.log("studyQualificationTmp: "
								+ studyQualificationTmp);
						if (studyQualificationTmp == undefined
								|| studyQualificationTmp == null
								|| studyQualificationTmp == "") {
							stringMessage = "titoli di studio errati";
							return false;
						}

						console.log("validateForm END --> true");
						return true;
					};
				});





app.controller('CandCtrl', function($scope, $http) {
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
	   
	   $scope.getSelectedCandidates = function(){
		   console.log("invoked getSelectedCandidates");
				   if($scope.data.selectedOption.id!=0){
					   if($scope.totalElements < $scope.data.selectedOption.size)
						   $scope.pageSize = $scope.totalElements;
					   else
						   $scope.pageSize = $scope.data.selectedOption.size;
				   } else
					   $scope.pageSize = $scope.totalElements;
				   
				   
				   $http({
						method : 'GET',
						url : candidateResourceApi+"/paginated/"+$scope.pageSize+"/"+$scope.numberOfPages+"/"
					}).then(function(response) {
						$scope.list = response.data.content;
						$scope.totalPages = response.data.totalPages;
						$scope.totalElements = response.data.totalElements;
					});
			    };

	    
	    
	    $scope.nextPage = function(){
	    	$scope.numberOfPages+=1;
	    	$scope.currentPage+=1;
	    	$scope.getSelectedCandidates();
	    };
	    $scope.prevPage = function(){
	    	$scope.numberOfPages-=1;
	    	$scope.currentPage-=1;
	    	$scope.getSelectedCandidates();
	    };
});




