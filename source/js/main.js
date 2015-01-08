require.config({

  baseUrl: "js/scripts",

  paths: {
    'angular': '../lib/angular/angular',
    'angular-route': '../lib/angular-route/angular-route',
    'angular-resource': '../lib/angular-resource/angular-resource',
    'angularAMD': '../lib/angularAMD/angularAMD',
    'directives': 'directives',
    'factories': 'factories',
  },

  shim: {
    'angularAMD': ['angular'],
    'angular-route': ['angular'],
    'angular-resource': ['angular']
  },

  deps: ['app',
         'directives/sticky',
         'factories/promisesFactory',
         'factories/resourceFactory'
        ]
});