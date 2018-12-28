app.controller('saveCsv', function ($scope, $http) {
    $scope.saveToLocalStorage = function () {
        var myText = $scope.myText;
        console.log("myText: " + myText);
        
    };

});
