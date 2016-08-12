define(['home/homeController'],function(homeController){

   angular.module('home',[]).
   controller('homeController',homeController);
 
   return {name:'home',controller:'homeController',view:'home.view'};

});