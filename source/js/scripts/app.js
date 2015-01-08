define(['angularAMD', 'angular-route','angular-resource'], function (angularAMD) {
  
  var app = angular.module("webapp", ['ngRoute','ngResource']);

  app.config(function ($routeProvider) {

    $routeProvider
    .when("/home", angularAMD.route({
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerUrl: 'controller/home'
    }))
    
    .otherwise({redirectTo: "/home"});
    
  });


  angularAMD.bootstrap(app);

  return app;
});