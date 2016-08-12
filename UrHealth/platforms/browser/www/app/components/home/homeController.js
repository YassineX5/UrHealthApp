'use strict'

define(function() {
    
    return function($scope,viewManager)
    {
        $scope.go = function(arg){
        viewManager.showToolbar(false);
        viewManager.toPage('login');
      }
    }

});
