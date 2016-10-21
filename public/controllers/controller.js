var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
    
    
    var refresh = function () {
        $http.get('/ecommerce').success( function (response) {
            console.log("I received the data I request");
            $scope.products = response;
            $scope.product = "";
        });
    };

    refresh();

    $scope.addProduct = function () {
        console.log($scope.product);
        $http.post('/ecommerce', $scope.product).success(function (response) {
            console.log(response);
            refresh();
        });
    };

    $scope.remove = function (id) {
        console.log(id + " WAS REMOVED!");
        $http.delete('/ecommerce/' + id).success(function (response) {
            refresh();    
        });
    };

    $scope.edit = function (id) {
        console.log(id);
        $http.get('/ecommerce/' + id).success(function (response) {
            $scope.product = response;
        });
    };

    $scope.update = function () {
        console.log($scope.product._id);
        $http.put('/ecommerce/' + $scope.product._id, $scope.product).success(function (response) {
            refresh();    
        });
    };

    $scope.deselect = function () {
        $scope.product = "";
    };

}]);