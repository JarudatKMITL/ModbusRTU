`use strict`;

var mainAppModule = angular.module('Hello', []);
mainAppModule.controller('NameController', ['$scope', function ($scope) {
    $scope.yourName = 'No Name';
}]);

mainAppModule.filter('sayHello', function () {
    return function (name) {
        return 'Hello, ' + name;
    }
});