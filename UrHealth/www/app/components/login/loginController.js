'use strict'

define(function() {
    
    return function($scope,viewManager)
    {
      $scope.login = function(){
         viewManager.showToolbar(true);
         viewManager.toPage('home');
          
      }
    }

});
