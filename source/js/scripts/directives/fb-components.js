define(['app'], function (app) {

	app.service('serviceFb',function(){
		this
	});

	app.directive('fbButtonConnect', ['$facebook', function($facebook){
		return {
			restrict: 'E',
			scope: {
			},
			controller:function($scope,$rootScope,$facebook){

				$scope.user = {}

				var me=function(){
					$facebook.api("/me?fields=id,name,picture").then( 
				      function(response) {
				        $scope.user.image=response.picture.data.url;
				    	if(response.name.length>20){
				    	    $scope.user.name=response.name.substring(0, 20)+"..."; 	
				    	}else{
				    	   $scope.user.name=response.name;
				    	}
				      },
				      function(err) {
				        cnsole.log(err)
				     });
				}

				var isFbConnected=function(){
					$scope.user.name="Cargando...";
					$facebook.getLoginStatus().then(function(response) {
						if(response.status === 'connected') {
				        	$scope.connected=true;
				        	me();
				        } else {
				        	$scope.connected=false;
				        }
					});
				}
				
				$scope.fbConnect = function(){
					$scope.user.name="Cargando...";
					$facebook.login().then(function(response) {
				      if (response.status == 'connected') {
			            $scope.connected=true;
			            me();
			            $rootScope.$emit('connected');
			          }
				    });
				}

				isFbConnected();

			},
			link: function($scope, $element, $attribs){

			},
			template:'<div data-ng-show="!connected" data-ng-click="fbConnect()" class="fb-button">'+
					'	Conectarse con Facebook'+
					'</div>'+
					'<div data-ng-show="connected" class="fb-user-panel">'+
					'	<div class="pic">'+
					'		<img height="32" width="32" data-ng-src="{{user.image}}" />'+
					'	</div>'+
					'	<div class="name fb-background">{{user.name}}'+
					'	</div>'+
					'</div>'
		}

	}]);

	app.directive('fbButtonShare', ['$facebook', function($facebook){

		return {
			restrict: 'E',
			scope: {
				publish:'='
			},
			controller:function($scope,$rootScope,$facebook,fbShareModal){

				var isFbConnected=function(){
					$facebook.getLoginStatus().then(function(response) {
				        if(response.status === 'connected') {
				        	$scope.share=true;
				        } else {
				        	$scope.share=false;
				        }
				    });
				}

				$rootScope.$on('connected',function(){
					$scope.share=true;
				});

				$scope.buttonText="Compartir en Facebook";

				$scope.sharePost=function(){

					fbShareModal.activate($scope.publish);
					
				}

				isFbConnected();

			},
			link: function($scope, $element, $attribs){

			},
			template:'<div data-ng-hide="!share" data-ng-click="sharePost()" class="fb-shared text-centered fb-background">'+
			         '   {{buttonText}}'+
        			'</div>'
		}

	}]);

	app.directive('fbLikeButton', ['$facebook', function($facebook){

		return {
			restrict: 'E',
			scope: {
				post:'='
			},
			controller:function($scope,$rootScope,$facebook,$sce){
			
				$scope.post.iframe=$sce.trustAsResourceUrl("https://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fprodesign.pe%2F%23%2Farticulo%2F"+$scope.post.id+"%2F"+$scope.post.url+"&amp;width&amp;layout=button_count&amp;action=like&amp;show_faces=false&amp;share=false&amp;height=21");
				
			},
			template:'<div class="fb-like" data-href="http://prodesign.pe/#/articulo/0/principios_basicos_para_una_buena_experiencia_de_usuario" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div>'
				
		}


	}]);

});

