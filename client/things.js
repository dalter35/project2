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
  
  $scope.insert = function(){
    ThingsSvc.insertThing($scope.inserting).then(
      function(thing){
        $scope.success = "Insert successful for " + thing.name;
        $scope.error = null;
        activate();
      },
      function(error){
        $scope.error = error;
        $scope.success = null;
      }
    );
  };
  
  })
  .factory("ThingsSvc", function($q, $http, AuthSvc){
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
      },
      insertThing: function(thing){
      var dfd = $q.defer();  
      $http.post("/api/things/" + AuthSvc.getToken(), thing).then(
        function(result){
          console.log(result);
          dfd.resolve(result.data);
        },
        function(result){
          dfd.reject(result.data);
        }
      );
      return dfd.promise;
    }
    
    }
});
