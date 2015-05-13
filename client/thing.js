angular.module("myWorld").controller("ThingCtrl", function($scope, ThingsSvc, $routeParams){
      $scope.message = 'thing control here';
      $scope.thing = ThingsSvc.getThing($routeParams.id).then(function(thing){
          $scope.thing = thing;
      });
  });