require.config({

  baseUrl: "js/scripts",

  paths: {
    'angular': '../lib/angular',
    'angular-route': '../lib/angular-route',
    'angular-resource': '../lib/angular-resource',
    'angularAMD': '../lib/angularAMD',
    'directives': 'directives',
    'factories': 'factories',
  },

  shim: {
    'angularAMD': ['angular'],
    'angular-route': ['angular'],
    'angular-resource': ['angular']
  },

  deps: ['app']
});