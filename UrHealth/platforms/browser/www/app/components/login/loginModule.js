define(['login/loginController'],function(loginController){

   angular.module('login',[]).
   controller('loginController',loginController);
 
   return {name:'login',controller:'loginController',view:'login.view'};

});