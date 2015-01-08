'use strict';

define(['app'], function (app) {

    app.factory('resourceFactory',function($resource){
        return {	
            get:function(request,params){
                return $resource(config.restUrl+request, params,
                    {'get' : { method: 'GET', isArray : true }
                });
            }, 

            post:function(params){
                return $resource(config.restUrl+'obtain/table/post', params,{
                    'save': { method:'POST' }
                });
            } 
        }
    });

});
