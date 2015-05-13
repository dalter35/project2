angular.module("myWorld")
  
  .controller("ThingsCtrl", function($scope, NavSvc, ThingsSvc){
  NavSvc.setTab("Things");
  $scope.message = "I am the things control";
  function activate(){
    ThingsSvc.getThings().then(function(things){
      $scope.things = things;
    });
  }
  activate();  
  })
  .factory("ThingsSvc", function($q, $http){
    return{
      getThings: function(){
        var dfd = $q.defer();
        $http.get("/api/things").then(function(result){
          dfd.resolve(result.data);
        });
        return dfd.promise;
      },
      getThing: function(id){
         var dfd = $q.defer();
         $http.get("/api/things/" + id).then(function(result){
         dfd.resolve(result.data);
         });
        return dfd.promise;
      }
    
    }
});
