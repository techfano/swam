define(['app'], function (app) {
    app.register.controller('HomeCtrl',['$scope','promisesFactory', function ($scope,promisesFactory) {

    	var params={
    		appId : '12345'
    	}

		var lastPosts = promisesFactory.get('obtain/table/post',params);

		var autor = function(id,params){
			return promisesFactory.get('obtain/queryValue/autor/id/'+id,params);
		}

		lastPosts.then(function(data) {

			$scope.lastPosts=data;

			angular.forEach($scope.lastPosts,function(value,key){
				
				autor(value.autor_id,params).then(function(data) {
					value.autor_alias=data[0].alias;
				},function(reason){});

			})

		},function(reason){});


    }]);

});
