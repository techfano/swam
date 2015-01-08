'use strict';

define(['app'], function (app) {

    app.factory('promisesFactory',['$q','$http','resourceFactory', function($q, $http,resourceFactory){
       
        var deferred  = $q.defer();

        var promises = {
                get: function(request,params){
                    var deferred  = $q.defer();
                    resourceFactory.get(request,params).get(
                    function(data){
                        deferred.resolve(data);
                    },function(error){
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },

        };

        return promises;

    }]);

});
