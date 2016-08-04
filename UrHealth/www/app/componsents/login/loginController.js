'use strict'

app.controller('loginController',function($scope){

alert("ii");
   $scope.login = function()
   {
       alert($scope.username+"   "+$scope.password);
   }

});