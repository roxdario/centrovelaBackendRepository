var statisticsResourceApiWeek = '/api/v1/surveyreply/lastweek';
var statisticsResourceApiMonth = '/api/v1/surveyreply/lastmonth';
var statisticsResourceApiYear = '/api/v1/surveyreply/lastyear';
var statisticsResourceApiToday = '/api/v1/surveyreply/today';

var statisticsResourceApiTodaySurveyReply = '/api/v1/surveyreply/todayFilled';
var statisticsResourceApiSevenDaysSurveyReply = '/api/v1/surveyreply/lastSevenDaysFilled';
var statisticsResourceApiTodayUser = '/api/v1/user/todayRegistrated';
var statisticsResourceApiSevenDaysUser = '/api/v1/user/lastSevenDaysRegistrated';

var statisticsResourceApiYesterdaySurveyReply = '/api/v1/surveyreply/yesterdayFilled';
var statisticsResourceApiLastWeekSurveyReply = '/api/v1/surveyreply/lastWeekFilled';
var statisticsResourceApiYesterdayUser = '/api/v1/user/yesterdayRegistrated';
var statisticsResourceApiLastWeekUser = '/api/v1/user/lastWeekRegistrated';


app.controller('statisticsController', function($scope, $http, $location,$route,notice) {
var x = 0;
var y = 0;
var j = 0;
var k = 0; 

//	SurveyReply todayFilled
	$scope.surveyReplyFilledToday=0;
	$http({
		method : 'GET',
		url : statisticsResourceApiTodaySurveyReply
	}).then(function (response) {
        console.log("surveyReplyFilledToday : " + response.data);
       $scope.surveyReplyFilledToday=(response.data);
       j = $scope.surveyReplyFilledToday;
	}, function(errResponse) {
		console.log(errResponse.data);
		logger.info("() end");
	});
	
//	SurveyReply yesterdayFilled
	$scope.surveyReplyFilledYesterday=0;
	$http({
		method : 'GET',
		url : statisticsResourceApiYesterdaySurveyReply
	}).then(function (response) {
        console.log("surveyReplyFilledYesterday : " + response.data);
       $scope.surveyReplyFilledYesterday=(response.data);
       k =  $scope.surveyReplyFilledYesterday;
       calcolaPercentualeSRD();
	}, function(errResponse) {
		console.log(errResponse.data);
		logger.info("() end");
	});
	
//	surveyReplyFilledLastSevenDays
	$scope.surveyReplyFilledLastSevenDays=0;
	$http({
		method : 'GET',
		url : statisticsResourceApiSevenDaysSurveyReply
	}).then(function (response) {
		console.log("surveyReplyFilledLastSevenDays : " + response.data);	
       $scope.surveyReplyFilledLastSevenDays=(response.data);
       x = $scope.surveyReplyFilledLastSevenDays;
	}, function(errResponse) {
		console.log(errResponse.data);
	});
//	surveyReplyFilledLastWeek
	$scope.surveyReplyFilledLastWeek=0;
	$http({
		method : 'GET',
		url : statisticsResourceApiLastWeekUser
	}).then(function (response) {
		console.log("surveyReplyFilledLastWeek : " + response.data);
       $scope.surveyReplyFilledLastWeek=(response.data);  
       y = $scope.surveyReplyFilledLastWeek;
 //    console.log("y : " + y);
      calcolaPercentualeSRW();
  //     console.log(y);
	}, function(errResponse) {
		console.log(errResponse.data);
	});
	
	//SurveyReply percentuale fra due settimane
	function calcolaPercentualeSRW(){
		var q = 0;
		if(y > 0){
			q = (x/y)*100;
		}
		else{
			q = 100;
		}
		q = q.toFixed(0);
		$scope.compareWeeks = q;
		console.log("x, y : " + x + " " + y + " " + $scope.compareWeeks);
	}
	//SurveyReply percentuale fra due giorni
	$scope.compareDays= 0;
	function calcolaPercentualeSRD(){
		var q = 0;
		if(k> 0){
			q = (j/k)*100;
		}
		else{
			q = 100;
		}		
		q = q.toFixed(0);
		$scope.compareDays = q;
		console.log("j, k : " + j + " " + k + " " + $scope.compareDays);
	}

	
//	USERS todayRegistrated
	var n = 0;
	$scope.todayRegistrated=0;
	$http({
		method : 'GET',
		url : statisticsResourceApiTodayUser
	}).then(function (response) {
//		  console.log("USERS todayRegistrated " + response.data);
       $scope.todayRegistrated=(response.data);
       n = $scope.todayRegistrated;
	}, function(errResponse) {
		console.log(errResponse.data);
	});
	
	//	USERS yesterdayRegistrated
	var m = 0;
	$scope.yesterdaRegistrated=0;
	$http({
		method : 'GET',
		url : statisticsResourceApiYesterdayUser
	}).then(function (response) {
//		  console.log("USERS todayRegistrated " + response.data);
       $scope.yesterdaRegistrated=(response.data);
       m = $scope.yesterdaRegistrated;
       calcolaPercentualeYT();
	}, function(errResponse) {
		console.log(errResponse.data);
	});
	
//  USERS lastSevenDaysRegistrated
	var u = 0;
	$scope.lastSevenDaysRegistrated=0;
	$http({
		method : 'GET',
		url : statisticsResourceApiSevenDaysUser
	}).then(function (response) {
//        console.log("USERS lastSevenDaysRegistrated " + response.data);
       $scope.lastSevenDaysRegistrated=(response.data);
       u = $scope.lastSevenDaysRegistrated;
       calcolaPercentualeYT();
	}, function(errResponse) {
		console.log(errResponse.data);
	});
	
//  USERS lastWeekRegistrated
	var v = 0;
	$scope.lastWeekRegistrated=0;
	$http({
		method : 'GET',
		url : statisticsResourceApiLastWeekUser
	}).then(function (response) {
//        console.log("USERS lastSevenDaysRegistrated " + response.data);
       $scope.lastWeekRegistrated=(response.data);
       v =  $scope.lastWeekRegistrated;
       calcolaPercentualeWW();
	}, function(errResponse) {
		console.log(errResponse.data);
	});
	
	//USERS percentuale fra due giorni
	function calcolaPercentualeYT(){
		var q = 0;
		if(m > 0){
			q = (n/m)*100;
		}
		else {
			q = 100;
		}	
		q = q.toFixed(0);
		$scope.compareUsersDays = q;
		console.log("compareUsersDays n, m : " + x + " " + y + " " + $scope.compareUsersDays);
	}
	//USERS percentuale fra due settimane
	function calcolaPercentualeWW(){
		var q = 0;
		if(v > 0){
			q = (u/v)*100;
		}
		else{
			q = 100;
		}
		q = q.toFixed(0);
		$scope.compareUsersWeek = q;
		console.log(" compareUsersWeek u, v : " + u + " " + v + " " + $scope.compareUsersWeek);
	}

// web site analitics Week
		$http({
			method : 'GET',
			url : statisticsResourceApiWeek
		}).then(function (response) {
//            console.log("response.data: " + response.data);
            
//            $scope.buf = {};
//            $scope.chart = {};
//            $scope.buf['chartData'] = response.data;
////         	sort dates ascending
//			$scope.buf['chartData'].sort(function(a, b) {
//				return a.date.localeCompare(b.date);
//			});
//
////			preparing array to draw
//			var dim = $scope.buf['chartData'].length;
//			var x = new Array(dim);
//			var y = new Array(dim);
//			for (var i = 0; i < dim; i++) {
//				x[i] = $scope.buf['chartData'][i].date;
//				y[i] = $scope.buf['chartData'][i].number;
//			}
            
            var dataToDraw = preparingData(response.data);
			
			// drawing the chart
			$scope.canvas = document.getElementById("lastWeekCandidatesRegistrationFlow");
			drawChart(dataToDraw[0],dataToDraw[1],'Candidati registrati negli ultimi 7 giorni','rgba(0, 204, 163,1)');
          
		}, function(errResponse) {
			notice.error(errResponse.data.errorMessage);
		});
		
// web site analitics Month	
		$http({
			method : 'GET',
			url : statisticsResourceApiMonth
		}).then(function (response) {
//            console.log("response.data: " + response.data);
            
            var dataToDraw = preparingData(response.data);
			
			// drawing the chart
			$scope.canvas = document.getElementById("lastMonthCandidatesRegistrationFlow");
			drawChart(dataToDraw[0],dataToDraw[1],'Candidati registrati negli ultimi 30 giorni','rgba(81, 166, 255,1)');
					
		}, function(errResponse) {
			notice.error(errResponse.data.errorMessage);
		});
		
// web site analitics Year
		$http({
			method : 'GET',
			url : statisticsResourceApiYear
		}).then(function (response) {
//            console.log("response.data: " + response.data);
            
            var dataToDraw = preparingData(response.data);
			
			// drawing the chart
			$scope.canvas = document.getElementById("lastYearCandidatesRegistrationFlow");
			drawChart(dataToDraw[0],dataToDraw[1],'Candidati registrati  negll\'ultimo anno','rgba(81,136,218,1)');
						          
		}, function(errResponse) {
			notice.error(errResponse.data.errorMessage);
		});
		
		
		function preparingData(data) {
			// sort dates ascending
			data.sort(function(a, b) {
				return a.date.localeCompare(b.date);
			});
			// preparing array to draw
			var dim = data.length;
			var x = new Array(dim);
			var y = new Array(dim);
			for (var i = 0; i < dim; i++) {
				x[i] = data[i].date;
				y[i] = data[i].number;
			}
			var arr = [x,y];
			return arr;
		}
		
		function drawChart(x,y,label,color){
			$scope.ctx = $scope.canvas.getContext("2d");
			$scope.chart = new Chart($scope.ctx, {
				type : 'line',
				data : {
					labels : x,
					datasets : [ {
						data : y,
//						label : label,
						label : "Candidati",
						borderColor : color, // line color
						backgroundColor : 'rgba(0,0,0,0.1)', // fill color
						fill : true, // no fill
						lineTension : 0.3
					}
					]
				},
				options : {
					tooltips : {
						enabled : true
					},
					hover : {
						mode : true
					},
					showAllTooltips : true,
					legend : {
						display : false
					}
				}
			});
		}
	
});
